import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Obtener las savings de la base de datos
const getSavings = async (
  categoria,
  id = '62d30639b834f9ba151afdd7',
  list = false,
) => {
  let savings
  if (categoria === undefined || categoria === null) {
    savings = await prisma.saving.findMany({
      where: {
        userId: id,
      },
    })
    return savings
  } else {
    savings = await prisma.saving.findMany({
      where: {
        userId: id,
        category: categoria,
      },
    })
    if (list) {
      return savings
    } else {
      let total = 0

      for (const element of savings) {
        total += parseFloat(element.amount)
      }

      return total
    }
  }
}

const createSavings = async (currency, concept, amount, category) => {
  const saving = await prisma.saving.create({
    data: {
      currency: currency,
      concept: concept,
      amount: amount,
      category: category,
      user: {
        connect: { id: '62d30639b834f9ba151afdd7' },
      },
      createdAt: new Date(),
    },
  })

  return saving
}

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const { currency, concept, amount, category } = req.body
      try {
        const data = await createSavings(
          currency,
          concept,
          parseFloat(amount),
          category,
        )
        res.status(200).json(data)
      } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(error.message)
      }
      break
    case 'GET':
      const { categoria, id, list } = req.query
      try {
        const data = await getSavings(categoria, id, list)
        res.status(200).json(data)
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message)
      }
      break
  }
}
