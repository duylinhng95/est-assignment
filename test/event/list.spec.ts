import supertest from 'supertest';
import app from "../../app";
import Event from "@Model/Event";
import mongoose from 'mongoose';
import getAuthTokenFromApi from "@Helper/helper-test";
import dayjs from "dayjs";

const request = supertest(app);
let authToken: string;

afterAll(async (done) => {
  await Event.deleteMany();
  await mongoose.connection.close();
  done();
});

beforeAll(async (done) => {
  const eventTestListing = [
    {
      eventName: 'test1',
      startDate: dayjs(),
      dueDate: dayjs().add(1, 'month'),
      description: 'test description 1',
    },
    {
      eventName: 'test2',
      startDate: dayjs(),
      dueDate: dayjs().add(1, 'month'),
      description: 'test description 2',
    },
    {
      eventName: 'test3',
      startDate: dayjs(),
      dueDate: dayjs().add(1, 'month'),
      description: 'test description 2',
    },
    {
      eventName: 'test4',
      startDate: dayjs(),
      dueDate: dayjs().add(1, 'month'),
      description: 'test description 2',
    },
    {
      eventName: 'test5',
      startDate: dayjs(),
      dueDate: dayjs().add(1, 'month'),
      description: 'test description 2',
    }
  ];
  await Event.create(eventTestListing);
  authToken = await getAuthTokenFromApi(request);
  done()
});

describe('Event Listing Test', () => {
  it('List without params', async done => {
    const res = await request.get('/event/list').auth(authToken, { type: 'bearer' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(5);
    done()
  });

  it('List with sort', async done => {
    const query = {
      sortBy: 'eventName',
      direction: 'desc'
    };

    const res = await request.get('/event/list').auth(authToken, { type: 'bearer' }).query(query);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data[0].eventName).toEqual('test5');
    done();
  })
})
