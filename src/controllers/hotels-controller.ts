import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const listOfHotels = await hotelsService.getAllHotels();
    return res.status(httpStatus.OK).send(listOfHotels);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
