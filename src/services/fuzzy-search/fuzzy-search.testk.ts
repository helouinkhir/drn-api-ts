import { Category } from "../ai/ai.service.model";
import { matchedWords } from "./fuzzy-search.service";


describe('fuzzy search test', () => {
  
      test('test mapping composite words',  () => {

        const words = [
            {   
                rank: 1,
                word: 'test1',
                confidence: 1,
            },
            {   
                rank: 2,
                word: 'Disc',
                confidence: 1,
            },
            {   
                rank: 3,
                word: 'Sports',
                confidence: 1,
            },
            {   
                rank: 4,
                word: 'ghkl',
                confidence: 1,
            }
        ];
    const brands = ['kl gh ghnl', 'MVP Disc Sports', 'jgf Disc Sports','test'];
       const mappings =  matchedWords(words,brands,Category.BRAND);
       console.log(JSON.stringify(mappings))
        
      });

   
  });
