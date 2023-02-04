import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotel-repository';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
  if (!enrollment) throw notFoundError()
  const hotels = await hotelRepository.findAllHotels();
  if (!hotels) {
    throw notFoundError();
  }
  return hotels;
}

const hotelsService = {
  getHotels,
};

export default hotelsService;
