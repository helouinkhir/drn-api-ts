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

export const mapNumbersWord =(words: WordModel[]): NumberMatchModel  => {
    const numberRegex = /^[\d\W]+$/;
    const phoneRegex = /^(\(\d{3}\)\s|\d{3}-)\d{3}-\d{4}$/;
    const mappedNumbers = [];
    const notNumbers = [];
    for(const word of words) {
       if(numberRegex.test(word.word) && phoneRegex.test(word.word)) {
          mappedNumbers.push({...word,category: Category.PHONE_NUMBER});
       } else {
          if(phoneRegex.test(word.word)) mappedNumbers.push({...word,category: Category.NA});
          else notNumbers.push(word);
       }
    }

    return {mapping: mappedNumbers, notNumbers}
}


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
 let  mappings= [];

for(const d of dataSet) {
    if(similarityPercentage(d, currentWord.word) >= FUZZY_CONIDENT ) {
        mappings.push({sequence: [ currentWord ], matchText: d})
       continue;
    }
              const dWords = d.split(' ');


              if(dWords.length > 1) {
                let i =0;
                let found=false;
                while(i< dWords.length && !found){

                    if(similarityPercentage(dWords[i], currentWord.word ) >= FUZZY_CONIDENT) {
                        let similarities = [ currentWord ]
                   
                    
                        let indexWords= 1;
                        i=i+1;
                       while(i < dWords.length && indexWords <words.length && !found) {
                        if(similarityPercentage(dWords[i],words[indexWords].word)>= FUZZY_CONIDENT) {
                            similarities.push(words[indexWords]);
                       
                            indexWords++;
                        }
                        i++;
                       }  
                       
                       if(similarities.length > 1 && similarities.length/dWords.length >=0.5) {
                        mappings.push({
                            sequence: similarities,
                            matchText: d,
                        })
                        found=true;
                       }
                    }
                    i++;
                }
              }
   }

   return mappings;

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

