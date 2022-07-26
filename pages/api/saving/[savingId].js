/* eslint-disable no-case-declarations */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function poduct(req, res) {
  const { savingId } = req.query;
  let saving;

  switch (req.method) {
    case 'GET':
      try {
        saving = await prisma.saving.findUnique({
          where: {
            id: savingId,
          },
        });
        res.status(200).json(saving);
      } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message);
      }
      break;
    case 'PUT':
      const { newAmount } = req.body;
      try {
        saving = await prisma.saving.update({
          where: {
            id: savingId,
          },
          data: {
            amount: newAmount,
          },
        });
        res.status(200).json(saving);
      } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message);
      }
      break;
    case 'DELETE':
      try {
        saving = await prisma.saving.delete({
          where: {
            id: savingId,
          },
        });
        res.status(200).json(saving);
      } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message);
      }
      break;
  }

  // use productId to retrieve the product from your database
  // then send this data back to the client
}
