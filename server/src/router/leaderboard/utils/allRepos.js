const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getRepos() {
  try {
    const projects = await prisma.project.findMany({
      select: { GitHubLink: true },
    });

   
    const repos = projects
      .map((project) => project.GitHubLink)
      .filter((link) => link) 
      .map((link) => link.replace("https://github.com/", ""));

    // console.log("i am don repos:", repos);
    return repos;
  } catch (error) {
    console.error("Error fetching GitHub links:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { getRepos };
