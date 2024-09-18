import { createMapping } from "./fuzzy-search.service";

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
                word: 'anp',
                confidence: 1,
            },
            {   
                rank: 3,
                word: 'gh',
                confidence: 1,
            },
            {   
                rank: 4,
                word: 'ghkl',
                confidence: 1,
            }
        ];
    const brands = ['gh ghnl', 'app', 'test'];
       const mappings =  createMapping(words.length,words,brands,[],/^(\(\d{3}\)\s|\d{3}-)\d{3}-\d{4}$/,[])
       console.log(mappings)
        
      });

   
  });
