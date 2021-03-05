import supertest from 'supertest';
import app from "../../app";
import Event from "@Model/Event";
import mongoose from 'mongoose';
import getAuthTokenFromApi from "@Helper/helper-test";

const request = supertest(app);
let authToken: string;
let eventId: string;

afterAll(async (done) => {
  await Event.deleteMany();
  await mongoose.connection.close();
  done();
});

beforeAll(async (done) => {
  authToken = await getAuthTokenFromApi(request);
  const payload = {
    eventName: 'test-edit-data',
    startDate: '26-01-2021',
    dueDate: '26-02-2021',
    description: 'This event is for editing'
  };

  const res = await request.post('/event/create')
      .auth(authToken, {type: 'bearer'})
      .send(payload);

  eventId = res.body.data._id;
  done()
});

describe('Event Edit Test', () => {
    it('Edit success', async done => {
    const payload = {
      _id: eventId,
      eventName: 'test-create-success',
      startDate: '26-01-2021',
      dueDate: '26-03-2021',
      description: 'This description will be changed'
    };

    const res = await request.put('/event/edit')
        .auth(authToken, {type: 'bearer'})
        .send(payload);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', true);
    expect(res.body).toHaveProperty('data');
    done();
  })
})
