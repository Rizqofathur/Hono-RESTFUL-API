import { describe, it, expect } from 'bun:test';
import app from '../src';
import { logger } from '../src/application/logging';

describe('POST /api/users', () => {
  it('should reject register new user if request is invalid', async () => {
    const response = await app.request('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username: '',
        password: '',
        name: '',
      }),
    });
    const body = await response.json();

    logger.debug(body);
    expect(response.status).toBe(400);
    expect(body.errors).toBeDefined();
  });

  it('should reject register new user if username already exist', async () => {});
  it('should reject register new user success', async () => {});
});
