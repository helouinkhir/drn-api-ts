import { Category } from "../ai/ai.service.model";
import { mapNumbersWord, matchedWords } from "./fuzzy-search.service";


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
                word: '609-405',
                confidence: 1,
            },
            {   
                rank: 4,
                word: '-4561',
                confidence: 1,
            }
        ];
    const brands = ['kl gh ghnl', 'MVP Disc Sports', 'jgf Disc Sports','test'];
       const mappings =  mapNumbersWord(words)
       console.log(JSON.stringify(mappings))
        
      });

   
  });
