import { prisma } from '@/config';
import faker from '@faker-js/faker';
import dayjs from 'dayjs';

export async function createRoomInHotel(hotelId: number) {
  await prisma.room.create({
    data: {
      name: faker.commerce.productName(),
      capacity: faker.datatype.number({ min: 1, max: 6 }),
      hotelId,
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().add(5, 'days').toDate(),
    },
  });
  return await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: {
      Rooms: true,
    },
  });
}
