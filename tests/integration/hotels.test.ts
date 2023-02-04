import app, { init } from '@/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createEnrollmentWithAddress, createHotel, createTicket, createTicketType, createUser } from '../factories';
import * as jwt from 'jsonwebtoken';
import { cleanDb, generateValidToken } from '../helpers';
import { TicketStatus } from '@prisma/client';

beforeAll(async () => {
  await init();
  await cleanDb();
});



const server = supertest(app);

describe('GET / hotels', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/hotels');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();
    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it("should respond with status 404 when user has no enrollment", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 404 when user has no ticket", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createEnrollmentWithAddress(user);

      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
    
//it('should respond with status 402 when ticket is not paid yet')

    // it('should respond with status 200 & hotel data when user has enrollment & ticket', async () => {
    //   const user = await createUser()
    //   const token = await generateValidToken(user);
    //   const enrollment = await createEnrollmentWithAddress(user);
    //   const ticketType = await createTicketType();
    //   const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
      
    //   const hotel = await createHotel();

    //   const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    //   expect(response.status).toBe(httpStatus.OK);
    //   expect(response.body).toEqual([
    //     {
    //       id: hotel.id,
    //       name: hotel.name,
    //       image: hotel.image,
    //       createdAt: hotel.createdAt.toISOString(),
    //       updatedAt: hotel.updatedAt.toISOString(),
    //     },
    //   ]);
    // });
  });
});
