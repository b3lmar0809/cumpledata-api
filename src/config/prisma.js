/**
 *prisma class
 *
 * @version 1.0.0 - 16 jul. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 16 jul. 2026
 *
 **/

const PrismaClient = require("../../generated/prisma/client");
const PrismaPg = require("@prisma/asapter-pg")
const env = require("../env")

const adapter = new PrismaPg({connectionString: env.DATABASE_URL});
const prisma = new PrismaClient(adapter);