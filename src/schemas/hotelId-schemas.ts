import Joi from 'joi';

export const hotelIdSchema = Joi.object({
  hotelId: Joi.number().integer().min(1).required(),
});
