import { notFoundError } from '@/errors';
import hotelRepository from '@/repositories/hotel-repository';

async function getAllHotels() {
  const hotels = await hotelRepository.findAllHotels();
  if (!hotels) {
    throw notFoundError();
  }
  return hotels;
}

const hotelsService = {
  getAllHotels,
};

export default hotelsService;
