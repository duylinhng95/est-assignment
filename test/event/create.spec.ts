import supertest from 'supertest';
import app from "../../app";
import Event from "@Model/Event";
import mongoose from 'mongoose';
import getAuthTokenFromApi from "@Helper/helper-test";

const request = supertest(app);
let authToken: string;

afterAll(async (done) => {
  await Event.deleteMany();
  await mongoose.connection.close();
  done();
});

beforeAll(async (done) => {
  authToken = await getAuthTokenFromApi(request);
  done()
});

describe('Event Create Test', () => {
  it('Create without params', async done => {
    const res = await request.post('/event/create')
        .auth(authToken, { type: 'bearer' });

    expect(res.status).toBe(401);
    done()
  });

  it('Create with wrong format', async done => {
    const payload = {
      eventName: 'test-create',
      startDate: '2021-01-26',
      dueDate: '30-12-2020'
    };

    const res = await request.post('/event/create')
        .auth(authToken, { type: 'bearer' })
        .send(payload);

    expect(res.status).toBe(401);
    done()
  })
})
