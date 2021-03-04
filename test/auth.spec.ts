import supertest from 'supertest';
import app from "../app";
import User from "@Model/User";
const request = supertest(app);

afterAll(async () => {
  await User.deleteMany();
})

describe('Register Test', () => {
  it('Register with params', async (done) => {
    const params = {
      username: "test",
      password: "test"
    };

    const res = await request.post('/auth/register').send(params);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body).toHaveProperty('data.token');
    done();
  })
})
