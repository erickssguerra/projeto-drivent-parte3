import faker from '@faker-js/faker';
import { prisma } from '@/config';
import { TicketStatus } from '@prisma/client';

export async function createTicketType(isRemote?: boolean, includesHotel?: boolean) {
  return await prisma.ticketType.create({
    data: {
      name: faker.commerce.productName(),
      price: faker.datatype.number(),
      isRemote: isRemote !== undefined ? isRemote : faker.datatype.boolean(),
      includesHotel: includesHotel !== undefined ? includesHotel : faker.datatype.boolean(),
    },
  });
}

export async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return await prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}
