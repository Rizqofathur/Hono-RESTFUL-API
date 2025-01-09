import { describe, it, expect, afterEach, beforeEach } from 'bun:test';
import { ContactTest, UserTest } from './test-util';

describe('POST /api/contacts/{id}/addresses', () => {
  beforeEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it('should rejected if request is not valid', async () => {});
  it('should rejected if request is not found', async () => {});
  it('should rejected if request is valid', async () => {});
});
