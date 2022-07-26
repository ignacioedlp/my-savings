import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function poduct(req, res) {
  const { savingId } = req.query
  let saving

  switch (req.method) {
    case 'GET':
      try {
        saving = await prisma.saving.findUnique({
          where: {
            id: savingId,
          },
        })
        res.status(200).json(saving)
      } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(error.message)
      }
      break
    case 'UPDATE':
      const { action, newAmount } = req.body
      try {
        if (action == 'add') {
          saving = await prisma.saving.findUnique({
            where: {
              id: savingId,
            },
            data: {
              amount: amount + newAmount,
            },
          })
        } else {
          saving = await prisma.saving.findUnique({
            where: {
              id: savingId,
            },
            data: {
              amount: amount - newAmount,
            },
          })
        }

        res.status(200).json(saving)
      } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(error.message)
      }
      break
    case 'DELETE':
      try {
        saving = await prisma.saving.delete({
          where: {
            id: savingId,
          },
        })
        res.status(200).json(saving)
      } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(error.message)
      }
      break
  }

  // use productId to retrieve the product from your database
  // then send this data back to the client
}
