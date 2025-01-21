const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getMenteeCount() {
  try {
    const numberMentee = await prisma.mentee.count();
    console.log(`Number of mentees: ${numberMentee}`);
    return numberMentee;
  } catch (error) {
    console.error("Error fetching mentee count:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { getMenteeCount };
