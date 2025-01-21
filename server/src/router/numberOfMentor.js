const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getMentorCount() {
  try {
    const numberMentor = await prisma.mentor.count();
    console.log(`Number of mentors: ${numberMentor}`);
    return numberMentor;
  } catch (error) {
    console.error("Error fetching mentor count:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { getMentorCount };
