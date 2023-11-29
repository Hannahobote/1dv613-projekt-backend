import request from 'supertest';
import { app } from "./server";
import {describe, expect, test, it } from '@jest/globals';

describe('Auth API', () => { 
  test(' POST /api/auth/login -> Login a user', async () => {
    const response = await request(app)
    .post('/api/auth/login')
    .send({ username: 'chef', password: 'password' });
    expect(response.status).toBe(200);
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

  test('POST /api/auth -> Should give 401 if credentials are incorrect ',async () => {
    const response = await request(app)
    .post('/api/auth/login')
    .send({ username: 'chef', password: '1234567' });
    expect(response.status).toBe(401);
  })
})


describe('Employee API', () => {
  test('GET /api/employee -> should return a list of all employees', async() => {
    request(app)
      .get('api/employee')
      .expect(200)
  })

  test('GET /api/employee/:id -> should return one employee', async () => {

  })

  
  test('GET /api/employee/:id -> should return 404 if employee does not exist', async () => {
 
  })

  
  
  test('POST /api/employee -> should return create an emoloyee', async () => {
 
  })

  
  
  test('GET /api/employee/:id -> should return 409 if we try to create employee with the same work number', async () => {
 
  })

})