import supertest from 'supertest';
import app from "../../app";
import User from "@Model/User";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import environment from "@Environment";

const request = supertest(app);

afterAll(async (done) => {
  await User.deleteMany();
  await mongoose.connection.close();
  done();
});

beforeAll(async (done) => {
  const testUser = await User.findOne({username: 'testLogin'});

  if (testUser) return;

  const password = bcrypt.hashSync('testLogin', environment.BCRYPT_HASH);
  await User.create({username: 'testLogin', password});
  done()
});

describe('Login Test', () => {
  it('Login correct user', async done => {
    const payload = {
      username: 'testLogin',
      password: 'testLogin'
    }
    const res = await request.post('/auth/login').send(payload);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('token');
    done()
  });

  it('Login wrong username', async done => {
    const testWrongUserNamePayload = {
      username: 'testLogin2',
      password: 'testLogin'
    };

    const res = await request.post('/auth/login').send(testWrongUserNamePayload);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('status', false);
    expect(res.body).toHaveProperty('data', null);
    done();
  })

  it('Login wrong password', async done => {
    const testWrongPasswordPayload = {
      username: 'testLogin',
      password: 'testLogin2'
    };

    const res = await request.post('/auth/login').send(testWrongPasswordPayload);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('status', false);
    expect(res.body).toHaveProperty('data', null);
    done()
  })
})
