import { PrismaClient } from '@prisma/client';
import {
  DefaultArgs,
  PrismaClientOptions,
} from '@prisma/client/runtime/library';

const studentSemesterPayment = async (
  prismaClient: Omit<
    PrismaClient<PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  payload: {
    studentId: string;
    academicSemesterId: string;
    totalPaymentAmount: number;
  }
) => {
  const isExist = await prismaClient.studentSemesterPayment.findFirst({
    where: {
      student: {
        id: payload.studentId,
      },
      academicSemester: {
        id: payload.academicSemesterId,
      },
    },
  });

  if (!isExist) {
    const insertToDb = {
      studentId: payload.studentId,
      academicSemesterId: payload.academicSemesterId,
      fullPaymentAmount: payload.totalPaymentAmount,
      partialPaymentAmount: payload.totalPaymentAmount * 0.5,
      totelDueAmount: payload.totalPaymentAmount,
      totalPaidAmount: 0,
    };

    await prismaClient.studentSemesterPayment.create({
      data: insertToDb,
    });
  }
};

export const studentSemesterPaymentService = {
  studentSemesterPayment,
};
