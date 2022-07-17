// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()

// async function main() {
//   const tofi = await prisma.user.upsert({
//     where: { id: '62d30639b834f9ba151afdd7' },
//     update: {},
//     create: {
//       email: 'ignaciocafiero12@gmail.com',
//       savings: {
//         create: {
//           type: 'Sinaptia',
//           concept: 'Sinaptia abril',
//           amount: 300,
//           userId: '62d30639b834f9ba151afdd7',
//           createdAt: Date.now(),
//         },
//       },
//     },
//   })

//   console.log({ tofi })
// }

// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
