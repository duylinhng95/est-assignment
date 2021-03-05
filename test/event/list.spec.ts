import supertest from 'supertest';
import app from "../../app";
import Event from "@Model/Event";
import mongoose from 'mongoose';
import moment from "moment";
import User from "@Model/User";

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
      startDate: moment(),
      dueDate: moment().add(1, 'month'),
      description: 'test description 1',
    },
    {
      eventName: 'test2',
      startDate: moment(),
      dueDate: moment().add(1, 'month'),
      description: 'test description 2',
    },
    {
      eventName: 'test3',
      startDate: moment(),
      dueDate: moment().add(1, 'month'),
      description: 'test description 2',
    },
    {
      eventName: 'test4',
      startDate: moment(),
      dueDate: moment().add(1, 'month'),
      description: 'test description 2',
    },
    {
      eventName: 'test5',
      startDate: moment(),
      dueDate: moment().add(1, 'month'),
      description: 'test description 2',
    }
  ];
  await Event.create(eventTestListing);
  authToken = await getAuthTokenFromApi();
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

async function getAuthTokenFromApi() {
  const testUser = await User.findOne({username: 'testAuth'});
  if (testUser) {
    const response = await request.post('/auth/login')
        .send({username: 'testAuth', password: 'testAuth'}).expect(200);

    return response.body.data.token;
  }

  const response = await request.post('/auth/register')
      .send({username: 'testAuth', password: 'testAuth'}).expect(200);

  return response.body.data.token;
}
