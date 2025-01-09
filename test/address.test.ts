import { describe, it, expect, afterEach, beforeEach } from 'bun:test';
import { AddressTest, ContactTest, UserTest } from './test-util';
import app from '../src';

describe('POST /api/contacts/{id}/addresses', () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it('should rejected if request is not valid', async () => {
    const contact = await ContactTest.get();
    const response = await app.request('/api/contacts/' + contact.id + '/addresses', {
      method: 'post',
      headers: {
        Authorization: 'test',
      },
      body: JSON.stringify({
        country: '',
        postal_code: '',
      }),
    });

    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body.errors).toBeDefined();
  });

  it('should rejected if request is not found', async () => {
    const contact = await ContactTest.get();
    const response = await app.request('/api/contacts/' + (contact.id + 1) + '/addresses', {
      method: 'post',
      headers: {
        Authorization: 'test',
      },
      body: JSON.stringify({
        country: 'Indonesia',
        postal_code: '17189',
      }),
    });

    expect(response.status).toBe(404);

    const body = await response.json();
    expect(body.errors).toBeDefined();
  });

  it('should rejected if request is valid', async () => {
    const contact = await ContactTest.get();
    const response = await app.request('/api/contacts/' + contact.id + '/addresses', {
      method: 'post',
      headers: {
        Authorization: 'test',
      },
      body: JSON.stringify({
        street: 'jalan',
        city: 'kota',
        province: 'provinsi',
        country: 'Indonesia',
        postal_code: '17189',
      }),
    });

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.id).toBeDefined();
    expect(body.data.street).toBe('jalan');
    expect(body.data.city).toBe('kota');
    expect(body.data.province).toBe('provinsi');
    expect(body.data.country).toBe('Indonesia');
    expect(body.data.postal_code).toBe('17189');
  });
});
