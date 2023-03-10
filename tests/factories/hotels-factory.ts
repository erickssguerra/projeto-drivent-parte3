import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.commerce.productName(),
      image: faker.image.imageUrl(),
    },
  });
}
