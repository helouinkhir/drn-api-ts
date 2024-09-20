import { Category } from '../ai/ai.service.model';
import { WordModel } from '../ai/vision/vision.model';
import { FuzzyMatchModel, Mapping, NumberMatchModel, RankedWordModel } from './fuzzy-search.model';
import { FUZZY_CONIDENT } from './fuzzy.const';

// Calculate Levenshtein Distance
const  levenshteinDistance = (s1: string, s2: string):number => {
    const len1 = s1.length;
    const len2 = s2.length;
    const dp = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) dp[i][0] = i;
    for (let j = 0; j <= len2; j++) dp[0][j] = j;

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,  
                dp[i][j - 1] + 1, 
                dp[i - 1][j - 1] + cost
            );
        }
    }
    return dp[len1][len2];
}

// Calculate similarity percentage based on Levenshtein Distance
const  similarityPercentage = (s1: string, s2: string):number => {
    const distance = levenshteinDistance(s1.toLowerCase(), s2.toLowerCase());
    const maxLength = Math.max(s1.length, s2.length);
    const similarity = (maxLength - distance) / maxLength;
    return similarity;
}

// this is to find the category of number words
export const mapNumbersWord =(words: WordModel[]): NumberMatchModel  => {
    const numberRegex = /^[\d\W]+$/;
    const phoneRegex = /^(\(\d{3}\)\s|\d{3}-)\d{3}-\d{4}$/;
    const mappedNumbers = [];
    let numberWords = words.filter(w => numberRegex.test(w.word)).map((word,index) =>({...word, rank: index}) );
    const notNumbers = words.filter(w => !numberRegex.test(w.word))
    let length = 1;
    while(numberWords.length && length <= numberWords.length ) {
        let  currentSequence = generateNumberSequences(length, numberWords);

        for(const sequence of currentSequence) {
            const sequenceTxt = sequence.map(s => s.word).join('');
                if(phoneRegex.test(sequenceTxt)) {
                    mappedNumbers.push({word: sequenceTxt, confidence: Math.min(...sequence.map(s=>s.confidence)),category: Category.PHONE_NUMBER});
                    numberWords = numberWords.filter(n => !sequence.map(s=> s.rank).includes(n.rank))
                 }  
        }
        length++;
    }

    const notMappedNumbers = numberWords.map(nw => ({word: nw.word, confidence: nw.confidence, category: Category.NA}));
   
    return {mapping: [mappedNumbers, notMappedNumbers].flat(), notNumbers}
}

// match single or multiwords
export const matchedWords = (words: RankedWordModel[], dataSet: string[], category: Category): FuzzyMatchModel => {
     const matchedWords: WordModel[] = [];
     const notMatched: RankedWordModel[] = [];

     let currentWords = words;
     while(currentWords.length) {
        const matched = checkWordInTheList(currentWords[0],currentWords,dataSet);
        if(matched.length) {
            matched.forEach(m => matchedWords.push({
              word: m.matchText, 
              confidence: Math.min(...m.sequence.map(s =>s.confidence)),
              category})) 
      
            const ranks = wordsUniqueRanks(matched)
            currentWords=currentWords.filter(c => !ranks.includes(c.rank) );

        } else {
            notMatched.push(currentWords[0]);
            currentWords.shift();  
        } 
     }
     
      
     return  {mapped: matchedWords, notMapped: notMatched }
}
const checkWordInTheList = (currentWord: RankedWordModel, words: RankedWordModel[], dataSet: string[]): Mapping[] => {
  const mappings: Mapping[] = [];

  for (const data of dataSet) {
    const similarity = similarityPercentage(data, currentWord.word);

   
    if (similarity >= FUZZY_CONIDENT) {
      mappings.push({ sequence: [currentWord], matchText: data });
      continue;
    }

    const dataWords = data.split(" ");

    if (dataWords.length > 1) {
      let matchedSequence: RankedWordModel[] = [];
      let dataIndex = 0, wordIndex = 0;

    
      while (dataIndex < dataWords.length && wordIndex < words.length) {
        const wordSimilarity = similarityPercentage(dataWords[dataIndex], words[wordIndex].word);
        
        if (wordSimilarity >= FUZZY_CONIDENT) {
          matchedSequence.push(words[wordIndex]);
          wordIndex++;
        } else if (matchedSequence.length > 0) {
          break;
        }

        dataIndex++;
      }

      if (matchedSequence.length > 1 && matchedSequence.length / dataWords.length >= 0.5) {
        mappings.push({ sequence: matchedSequence, matchText: data });
      }
    }
  }

  return mappings;
};


const generateNumberSequences = (length: number, words: RankedWordModel[]): RankedWordModel[][] => {
    let i = 0;
    let sequences = [];
    while(i< words.length && words.length -i >= length) {
        let sequence = [];
        for(let j = i; j < i+length; j++) {
            sequence.push(words[j]);
        }
        sequences.push(sequence);
        i++;
    }

    return sequences;
}



export const wordsUniqueRanks= (mappings: Mapping[]) => {
    return  mappings.map(m => m.sequence).reduce((acc, subArray) => {
        subArray.forEach(obj => {
          if (!acc.some(item => item.rank === obj.rank)) {
            acc.push(obj);
          }
        });
        return acc;
      }, []).map(s => s.rank);
}

