const { default: axios } = require("axios");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
dotenv.config();
const ACCESS_TOKEN = process.env.GH_ACCESS_TOKEN;

const { allRepos } = require("./utils/allRepos");
const repos = allRepos;
const prisma = new PrismaClient();

const eventLabel = "jwoc";
const levelsData = { easy: "Easy", medium: "Medium", hard: "Hard" };

const fetchAllData = async () => {
  let finalData = [];
  const mentees = await prisma.mentee.findMany({ select: { github: true } });
  const validGitHubUsers = new Set(mentees.map((mentee) => mentee.github));

  for (const repoName of repos) {
    const data = await fetchRepoData(repoName);
    console.log(`Completed for: ${repoName}`);
    finalData = [...finalData, ...data];
  }

  let leaderboardData = generateRank(finalData, validGitHubUsers).sort((a, b) => b.total_points - a.total_points);
  
  for (let i = 0; i < leaderboardData.length; i++) {
    leaderboardData[i].rank = i + 1;
    await prisma.mentee.updateMany({
      where: { github: leaderboardData[i].user_name },
      data: {
        TotalPoints: leaderboardData[i].total_points,
        Ranking: leaderboardData[i].rank,
        pr_urls: leaderboardData[i].pr_urls,
      },
    });
  }
  console.log("Leaderboard updated successfully.");
};

const fetchRepoData = async (repoName) => {
  let pageCount = 1;
  let allData = [];
  while (true) {
    const reqUrl = `https://api.github.com/repos/${repoName}/pulls?state=closed&per_page=100&page=${pageCount}`;
    try {
      console.log(`Fetching data for: ${repoName}, Page: ${pageCount}`);
      const res = await axios.get(reqUrl, {
        headers: {
          authorization: `token ${ACCESS_TOKEN}`,
          "User-Agent": "request",
          Accept: "application/vnd.github.v3+json",
        },
      });
      if (res.data.length === 0) break;
      allData = [...allData, ...filterJwoc(res.data)];
      pageCount++;
    } catch (error) {
      console.log(error.message);
      break;
    }
  }
  return allData;
};

const filterJwoc = (allData) => {
  return allData.filter((prData) =>
    prData.merged_at && prData.labels.some((label) => label.name.toLowerCase().includes(eventLabel.toLowerCase()))
  ).map((prData) => ({
    user_name: prData.user.login,
    pr_url: prData.html_url,
    labels: prData.labels.map((label) => label.name),
    phase: getPhase(prData.created_at),
  }));
};

const getPhase = (created_at) => {
  return new Date(created_at) > new Date("2023-03-05T00:00:00.000Z") ? 2 : 1;
};

const generateRank = (fullData, validGitHubUsers) => {
  let leaderboard = [];
  fullData.forEach(({ user_name, pr_url, labels, phase }) => {
    if (!validGitHubUsers.has(user_name)) return;
    const { point, difficulty } = getPoints(labels, phase);
    let user = leaderboard.find((u) => u.user_name === user_name);
    if (!user) {
      user = { user_name, total_points: 0, pr_urls: [] };
      leaderboard.push(user);
    }
    user.total_points += point;
    user.pr_urls.push({ url: pr_url, difficulty, phase });
  });
  return leaderboard;
};

const getPoints = (labelsArray, phase) => {
  let point = 0, difficulty = "";
  labelsArray.forEach((label) => {
    if (label.toLowerCase().includes(levelsData.easy.toLowerCase())) {
      difficulty = levelsData.easy;
      point = phase === 1 ? 1 : 2;
    } else if (label.toLowerCase().includes(levelsData.medium.toLowerCase())) {
      difficulty = levelsData.medium;
      point = phase === 1 ? 3 : 4;
    } else if (label.toLowerCase().includes(levelsData.hard.toLowerCase())) {
      difficulty = levelsData.hard;
      point = phase === 1 ? 5 : 8;
    }
  });
  return { point, difficulty };
};

fetchAllData().finally(() => prisma.$disconnect());
