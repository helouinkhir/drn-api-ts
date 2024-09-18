import { Category } from '../ai/ai.service.model';
import { Mapping, RankedWordModel } from './fuzzy-search.model';
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

export const createMapping = (startLength: number,words: RankedWordModel[], brands: string[], discs: string[], phoneRegex: RegExp, mappings: Mapping[]): Mapping[] => {
    let length = startLength;
    let currentMappings: Mapping[]  = []
    
    while(!currentMappings.length && length >0) {
        currentMappings=  createMappingBySequenceLength(length,words,brands, discs, phoneRegex);
        length--;
    }

    if(currentMappings.length) {
      mappings = mappings.concat(currentMappings);
       let currentWords: number[] = wordsUniqueRanks(mappings);
 
   

       mappings = createMapping(length, words.filter(w => !currentWords.includes(w.rank)), brands, discs, phoneRegex,mappings);
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

const createMappingBySequenceLength = (length: number, words: RankedWordModel[], brands: string[], discs: string[], phoneRegex: RegExp): Mapping[] => {
        let sequences = generateWordSequences(length, words);
        let  mappings: Mapping[] = []
        let mapping = null;
        for(const s of sequences) {
           mapping =  mapSequenceToCategory(s,brands, discs, phoneRegex);
           if(mapping) {
            mappings.push(mapping)
           }
        }
        return mappings;
}

const mapSequenceToCategory = (sequence: RankedWordModel[], brands: string[], discs: string[], phoneRegex: RegExp): Mapping | null => {
    const sentence = sequence.map(s => s.word).join(' ');
    for(const b of brands) {
        if(similarityPercentage(sentence.toLocaleLowerCase(),b.toLocaleLowerCase()) >= FUZZY_CONIDENT) return  {
            sequence,
            category: Category.BRAND,
            matchText: b
        };
    }
    for(const d of discs) {
        if(similarityPercentage(sentence.toLocaleLowerCase(),d.toLocaleLowerCase()) >= FUZZY_CONIDENT) return  {
            sequence,
            category: Category.Disc,
            matchText: d
        };
    }

    if (phoneRegex.test(sentence))  return  {
        sequence,
        category: Category.PHONE_NUMBER,
        matchText: sentence
    };

    return null;
}


const generateWordSequences = (length: number, words: RankedWordModel[]): RankedWordModel[][] => {
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



