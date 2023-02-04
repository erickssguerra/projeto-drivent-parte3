import { notFoundError } from '@/errors';
import { paymentRequiredError } from '@/errors/payment-required-error';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotel-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function checkEnrollmentAndTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status !== 'PAID' || ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true) {
    throw paymentRequiredError();
  }
}

async function getHotels(userId: number) {
  await checkEnrollmentAndTicket(userId);
  const hotels = await hotelRepository.findAllHotels();
  return hotels;
}

async function getHotelInfos(hotelId: number, userId: number) {
  await checkEnrollmentAndTicket(userId);
  const hotelInfo = await hotelRepository.findHotelById(hotelId);
  if (!hotelInfo) throw notFoundError();
  return hotelInfo;
}

const hotelsService = {
  getHotels,
  getHotelInfos,
};

export { hotelsService };
