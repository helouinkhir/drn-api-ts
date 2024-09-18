import request from 'supertest';
import app from '../../../app';
import { mockData, token } from './mock-data';
import { ImageDetectionDatacategorized } from '../vision/vision.model';



describe('GET categorized image text', () => {
    for (const mock of mockData) {
      test(mock.label, async () => {
        const response = await request(app).post("/ai/image")
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({"data": {"image":  mock.image}});
    
        expect(response.status).toBe(200);

        const result = response.body.data as ImageDetectionDatacategorized
    

        for(const expected of mock.expectedResults) {
          if(!(expected.word instanceof RegExp)){
            let word = result.text.words.find(w => w.word == expected.word);
            expect(word).toBeDefined();
            expect(word.category).toEqual(expected.category);
          } else {
            result.text.words.filter(w => !mock.expectedResults.map(e => e.word).includes(w.word)).forEach(word => {
              if((expected.word as RegExp).test(word.word))
                 expect(word.category).not.toEqual(expected.category);
            })
          }
           
        }
      });
    }
   
  });
