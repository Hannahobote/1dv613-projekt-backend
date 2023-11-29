import request from 'supertest';
import { app } from "./server";
import { describe, expect, test, it } from '@jest/globals';
import dotenv from 'dotenv'
dotenv.config()

let bearerToken = ''

describe('Auth API', () => {
  test(' POST /api/auth/login -> Login a user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'chef', password: process.env.PASSWORD });
    expect(response.status).toBe(200);
    bearerToken = response.body.accessToken
    expect(response.body).toHaveProperty('msg')
    expect(response.body).toHaveProperty('accessToken')
    expect(response.body).toHaveProperty('user')

  })

  test('POST api/auth -> Should give 404 if user doesnt exist', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'lördagsGodis', password: '1234567' });
    expect(response.status).toBe(404);
  })

  test('POST /api/auth -> Should give 401 if credentials are incorrect ', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'chef', password: '1234567' });
    expect(response.status).toBe(401);
  })
})


describe('Employee API', () => {
  test('GET /api/employee -> should return a list of all employees', async () => {
    const response = await request(app)
      .get('/api/employee')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(200);
  })

  test('GET /api/employee/:id -> should return one employee (this should fail if user is not signed in)', async () => {
    const response = await request(app)
      .get('api/employee/6446cb61dc92030c315b5744')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(200);

    expect(response.body).toEqual(expect.objectContaining({
      _id: expect.any(String),
      username: expect.any(String),
      password: expect.any(String),
      name: expect.any(String),
      surname: expect.any(String),
      personnr: expect.any(String),
      worknr: expect.any(Number),
      role: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    }))
  })


  test('GET /api/employee/:id -> should return 404 if employee does not exist', async () => {
    const response = await request(app)
      .get('api/employee/6446cb61dc92030c315b5748')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(404);
  })


  // mock database for this to work
  test('POST /api/employee -> should return 201 + new employee details when employee has been created', async () => {



  })

  // mock database for this to work
  test('GET /api/employee -> should return 409 if we try to create employee with the same work number, personr, username', async () => {

  })

  // mock database for this to work
  test('PUT /api/employee/:id -> should return 200 + updated employee when member has been updated', async () => {

  })

  // mock database for this to work
  test('PUT /api/employee/:id -> should return 404 of we try to update a member that does not exist', async () => {

  })

  // mock database for this to work
  test('DELETE /api/employee/:id -> should return 204 when employee has been deleted', async () => {

  })

  // mock database for this to work
  test('DELETE /api/employee/:id -> should return 404 if employee does not exist', async () => {

  })

})
