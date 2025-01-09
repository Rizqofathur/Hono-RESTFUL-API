import { Hono } from 'hono';
import { ApplicationVariables } from '../model/app-model';
import { authMiddleware } from '../middleware/auth-middleware';
import { User } from '@prisma/client';
import { CreateAdressRequest, GetAddressRequest } from '../model/address-model';
import { AddressService } from '../service/address-service';
export const addressController = new Hono<{ Variables: ApplicationVariables }>();

addressController.use(authMiddleware);

addressController.post('/api/contacts/:id/addresses', async (c) => {
  const user = c.get('user') as User;
  const contactId = Number(c.req.param('id'));

  const request = (await c.req.json()) as CreateAdressRequest;
  request.contact_id = contactId;

  const response = await AddressService.create(user, request);

  return c.json({
    data: response,
  });
});

addressController.get('/api/contacts/:contact_id/adresses/:id', async (c) => {
  const user = c.get('user') as User;
  const contactId = Number(c.req.param('contact_id'));
  const addressId = Number(c.req.param('id'));
  const request: GetAddressRequest = {
    contact_id: contactId,
    id: addressId,
  };
  const response = await AddressService.get(user, request);

  return c.json({
    data: response,
  });
});
