import { describe, it, expect, afterEach, beforeEach } from 'bun:test';
import { AddressTest, ContactTest, UserTest } from './test-util';
import app from '../src';
import { add } from 'winston';

describe('POST /api/contacts/{contactId}/addresses', () => {
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
        street: 'Jalan',
        city: 'Kota',
        province: 'Provinsi',
        country: 'Indonesia',
        postal_code: '17189',
      }),
    });

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.id).toBeDefined();
    expect(body.data.street).toBe('Jalan');
    expect(body.data.city).toBe('Kota');
    expect(body.data.province).toBe('Provinsi');
    expect(body.data.country).toBe('Indonesia');
    expect(body.data.postal_code).toBe('17189');
  });
});

describe('GET /api/contacts/{contactId}/addresses/{addressesId}', () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it('should rejected if address is not found', async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + (address.id + 1), {
      method: 'get',
      headers: {
        Authorization: 'test',
      },
    });

    expect(response.status).toBe(404);

    const body = await response.json();
    expect(body.errors).toBeDefined();
  });

  it('should rejected if address is exists', async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + address.id, {
      method: 'get',
      headers: {
        Authorization: 'test',
      },
    });

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.id).toBeDefined();
    expect(body.data.street).toBe(address.street);
    expect(body.data.city).toBe(address.city);
    expect(body.data.province).toBe(address.province);
    expect(body.data.country).toBe(address.country);
    expect(body.data.postal_code).toBe(address.postal_code);
  });
});

describe('PUT /api/contacts/{contactId}/addresses/{addressesId}', () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it('should rejected if request is invalid', async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + address.id, {
      method: 'put',
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

  it('should rejected if address is not found', async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + (address.id + 1), {
      method: 'put',
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

  it('should success if request is valid', async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + address.id, {
      method: 'put',
      headers: {
        Authorization: 'test',
      },
      body: JSON.stringify({
        street: 'A',
        city: 'B',
        province: 'C',
        country: 'Malaysia',
        postal_code: '99999',
      }),
    });

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.id).toBe(address.id);
    expect(body.data.street).toBe('A');
    expect(body.data.city).toBe('B');
    expect(body.data.province).toBe('C');
    expect(body.data.country).toBe('Malaysia');
    expect(body.data.postal_code).toBe('99999');
  });
});

describe('DELETE /api/contacts/{contactId}/addresses/{addressesId}', () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it('should be rejected if contact is not found', async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + (address.id + 1), {
      method: 'delete',
      headers: {
        Authorization: 'test',
      },
    });

    expect(response.status).toBe(404);

    const body = await response.json();
    expect(body.errors).toBeDefined();
  });

  it('should success if contact is exist', async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + address.id, {
      method: 'delete',
      headers: {
        Authorization: 'test',
      },
    });

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data).toBe(true);
  });
});

describe('GET /api/contacts/{contactId}/addresses/{addressesId}', () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it('should rejected if contact is not found', async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request('/api/contacts/' + (contact.id + 1) + '/addresses', {
      method: 'get',
      headers: {
        Authorization: 'test',
      },
    });

    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.errors).toBeDefined();
  });
  it('should rejected if contact is exists', async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request('/api/contacts/' + contact.id + '/addresses', {
      method: 'get',
      headers: {
        Authorization: 'test',
      },
    });

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.length).toBe(1);
    expect(body.data[0].id).toBe(address.id);
    expect(body.data[0].street).toBe(address.street);
    expect(body.data[0].city).toBe(address.city);
    expect(body.data[0].province).toBe(address.province);
    expect(body.data[0].country).toBe(address.country);
    expect(body.data[0].postal_code).toBe(address.postal_code);
  });
});
