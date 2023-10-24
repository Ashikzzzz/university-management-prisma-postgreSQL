import { PrismaClient, Room } from '@prisma/client';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

// create building
const createRoom = async (data: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data,
    include: {
      building: true,
    },
  });
  return result;
};

export const roomService = {
  createRoom,
};
