import { notFoundError } from '@/errors';
import { paymentRequiredError } from '@/errors/payment-required-error';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotel-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status === 'RESERVED') throw paymentRequiredError();
  const hotels = await hotelRepository.findAllHotels();

  return hotels;
}

const hotelsService = {
  getHotels,
};

export { hotelsService };
