import supertest from 'supertest';
import app from "../../app";
import User from "@Model/User";
import mongoose from 'mongoose';

const request = supertest(app);

beforeAll(async done => {
  await User.deleteMany();
  done();
})

afterAll(async (done) => {
  await User.deleteMany();
  await mongoose.connection.close();
  done();
})

const testUserPayload = {
  username: 'testRegister',
  password: 'testRegister'
}

describe('Register Test', () => {
  it('Register with params', async (done) => {
    const res = await request.post('/auth/register').send(testUserPayload);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body).toHaveProperty('data.token');
    done();
  });

  it('Register without params', async done => {
    const res = await request.post('/auth/register').send();
    expect(res.status).toBe(401);
    expect(res.body.status).toBe(false);
    expect(res.body.error).toHaveProperty('message');
    done();
  });

  it('Register with existUser', async (done) => {
    const res = await request.post('/auth/register').send(testUserPayload);
    expect(res.status).toBe(401);
    expect(res.body.status).toBe(false);
    expect(res.body.error).toHaveProperty('message');
    done();
  });
});
