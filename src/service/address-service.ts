import { User } from '@prisma/client';
import { AddressResponse, CreateAdressRequest, toAddressResponse } from '../model/address-model';
import { AddressValidation } from '../validation/address-validation';
import { ContactService } from './contact-service';
import { prismaClient } from '../application/database';

export class AddressService {
  static async create(user: User, request: CreateAdressRequest): Promise<AddressResponse> {
    request = AddressValidation.CREATE.parse(request);
    await ContactService.contactMustExist(user, request.contact_id);
    const address = await prismaClient.address.create({
      data: request,
    });

    return toAddressResponse(address);
  }
}
