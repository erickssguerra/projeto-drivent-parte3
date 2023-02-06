import { AuthenticatedRequest } from "@/middlewares";
import { hotelsService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelsService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.name === "paymentRequiredError") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error.message);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getRoomsFromHotelId(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  const { userId } = req;
  try {
    const hotelInfos = await hotelsService.getHotelInfos(Number(hotelId), userId);
    return res.status(httpStatus.OK).send(hotelInfos);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.name === "paymentRequiredError") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error.message);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  res.send(hotelId);
}
