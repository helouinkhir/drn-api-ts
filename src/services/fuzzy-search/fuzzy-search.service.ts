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

export const isCloseWord = (word: string, dataSet: string[]): boolean => {
    for(const d of dataSet) {
        if(similarityPercentage(word.toLocaleLowerCase(),d.toLocaleLowerCase()) >= FUZZY_CONIDENT) return true;
    }
    return false;
}