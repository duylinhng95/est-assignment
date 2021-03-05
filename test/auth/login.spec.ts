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
  const testUser = await User.findOne({username: 'test'});

  if (testUser) return;

  const password = bcrypt.hashSync('test', environment.BCRYPT_HASH);
  await User.create({username: 'test', password});
  done()
});

describe('Login Test', () => {
  it('Login correct user', async done => {
    const payload = {
      username: 'test',
      password: 'test'
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
      username: 'test2',
      password: 'test'
    };

    const res = await request.post('/auth/login').send(testWrongUserNamePayload);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('status', false);
    expect(res.body).toHaveProperty('data', null);
    done();
  })

  it('Login wrong password', async done => {
    const testWrongPasswordPayload = {
      username: 'test',
      password: 'test2'
    };

    const res = await request.post('/auth/login').send(testWrongPasswordPayload);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('status', false);
    expect(res.body).toHaveProperty('data', null);
    done()
  })
})
