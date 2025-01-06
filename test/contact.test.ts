import { describe, it, expect, afterEach, beforeEach } from 'bun:test';
import { ContactTest, UserTest } from './test-util';
import app from '../src';

describe('POST /api/contacts', () => {
  beforeEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it('should rejected if contact is invalid', async () => {
    const response = await app.request('/api/contacts', {
      method: 'post',
      headers: {
        Authorization: 'test',
      },
      body: JSON.stringify({
        first_name: '',
      }),
    });

    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body.errors).toBeDefined();
  });

  it('should rejected if token is invalid', async () => {
    const response = await app.request('/api/contacts', {
      method: 'post',
      headers: {
        Authorization: 'salah',
      },
      body: JSON.stringify({
        first_name: 'nama',
      }),
    });

    expect(response.status).toBe(401);

    const body = await response.json();
    expect(body.errors).toBeDefined();
  });

  it('should success contact is valid(only name)', async () => {
    const response = await app.request('/api/contacts', {
      method: 'post',
      headers: {
        Authorization: 'test',
      },
      body: JSON.stringify({
        first_name: 'fathur',
      }),
    });

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.first_name).toBe('fathur');
    expect(body.data.last_name).toBeNull();
    expect(body.data.email).toBeNull();
    expect(body.data.phone).toBeNull();
  });

  it('should success contact is valid (full data)', async () => {
    const response = await app.request('/api/contacts', {
      method: 'post',
      headers: {
        Authorization: 'test',
      },
      body: JSON.stringify({
        first_name: 'fathur',
        last_name: 'rizqo',
        email: 'riszqofathur@gmail.com',
        phone: '089618246679',
      }),
    });

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.first_name).toBe('fathur');
    expect(body.data.last_name).toBe('rizqo');
    expect(body.data.email).toBe('riszqofathur@gmail.com');
    expect(body.data.phone).toBe('089618246679');
  });
});
