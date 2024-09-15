import request from 'supertest';
import app from '../../../app';
import { mockData } from './mock-data';



describe('GET catorized image text', () => {
  it('should mutch tests cases', async () => {
    mockData.forEach(async (mock) => {
      const response = await request(app).post("/ai/image").send({"data": {"image":  mock.image}});
    
 
      expect(response.status).toBe(200);
      
     
      expect(response.body).toEqual(mock.expectedResponse);

    })
   
  });
});