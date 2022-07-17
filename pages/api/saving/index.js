import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Obtener las savings de la base de datos
const getSavings = async () => {
  const savings = await prisma.saving.findMany()
  return savings
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
  if (req.method === 'POST') {
    const { currency, concept, amount, category } = req.body
    console.log(req.body)
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
  } else {
    try {
      const data = await getSavings()
      res.status(200).json(data)
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message)
    }
  }
}
