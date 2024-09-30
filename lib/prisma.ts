import { PrismaClient } from '@prisma/client'


// Ensure the Prisma client is instantiated only once
const prisma = new PrismaClient()



export default prisma