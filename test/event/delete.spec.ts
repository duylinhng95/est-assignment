import supertest from 'supertest';
import app from "../../app";
import mongoose from 'mongoose';
import getAuthTokenFromApi from "@Helper/helper-test";

const request = supertest(app);
let authToken: string;
let eventId: string;

afterAll(async (done) => {
  await mongoose.connection.close();
  done();
});

beforeAll(async (done) => {
  authToken = await getAuthTokenFromApi(request);
  const payload = {
    eventName: 'test-delete-data',
    startDate: '26-01-2021',
    dueDate: '26-02-2021',
    description: 'This event is for deleting'
  };

  const res = await request.post('/event/create')
      .auth(authToken, {type: 'bearer'})
      .send(payload);

  eventId = res.body.data._id;
  done()
});

describe('Event Delete Test', () => {
  it('Delete success', async done => {
    const res = await request.delete(`/event/delete/${eventId}`)
        .auth(authToken, {type: 'bearer'})

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', true);
    expect(res.body).toHaveProperty('data');
    done();
  })
})
