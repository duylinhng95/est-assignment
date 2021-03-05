import supertest from "supertest";
import User from "@Model/User";

export default async function getAuthTokenFromApi(request: supertest.SuperTest<supertest.Test>) {
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
