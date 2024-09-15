import request from 'supertest';
import app from '../../../app';
import { mockData, token } from './mock-data';



describe('GET categorized image text', () => {
    for (const mock of mockData) {
      test(`test image result`, async () => {
        const response = await request(app).post("/ai/image")
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({"data": {"image":  mock.image}});
    
        expect(response.status).toBe(200);
     
        expect(response.body).toEqual(mock.expectedResponse);
      });
    }
   
  });
