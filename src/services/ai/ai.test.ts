import request from 'supertest';
import app from '../../app';
import { mockBase64 } from './vision/mock';


describe('GET catorized image text', () => {
  it('should mutch tests cases', async () => {
    const response = await request(app).post("/ai/image").send({"data": {"image":  mockBase64 }});
    
 
    expect(response.status).toBe(200);
    
   
    expect(response.body).toEqual('will be matched to an array');
  });
});