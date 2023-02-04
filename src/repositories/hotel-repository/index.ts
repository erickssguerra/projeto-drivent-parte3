import { prisma } from '@/config';

async function findAllHotels() {
  return prisma.hotel.findMany({});
}

async function findHotelById(hotelId: number) {
  return await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  findAllHotels,
  findHotelById,
};

export default hotelRepository;
