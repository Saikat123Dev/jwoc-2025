const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
dotenv.config();
const ACCESS_TOKEN = process.env.GH_ACCESS_TOKEN;

const allRepos = require("./utils/allRepos");

// Define repos as an async function that returns the repository list
const repos = async () => {
  return await allRepos.getRepos();
};

const prisma = new PrismaClient();

const eventLabel = "jwoc";
const levelsData = { easy: "easy", medium: "medium", hard: "hard" };

const fetchAllData = async () => {
  let finalData = [];

  // Get repository list
  const repoList = await repos();
  console.log("Repositories found:", repoList);

  // Get all mentees and extract GitHub usernames in lowercase
  const mentees = await prisma.mentee.findMany({ select: { github: true } });
  const validGitHubUsers = new Set(
    mentees.map((mentee) => {
      // Extract username from URL assuming format "https://github.com/username"
      const parts = mentee.github.split("https://github.com/");
      return parts.length === 2 ? parts[1].toLowerCase() : mentee.github.toLowerCase();
    })
  );
  console.log("Valid GitHub Users:", validGitHubUsers);

  // Iterate over each repository
  for (const repoName of repoList) {
    const data = await fetchRepoData(repoName);
    finalData = [...finalData, ...data];
  }

  // Generate leaderboard data based on PRs and sort descending by total_points
  let leaderboardData = generateRank(finalData, validGitHubUsers).sort(
    (a, b) => b.total_points - a.total_points
  );

  // Dense ranking: if scores tie, rank remains same, else increment by 1
  let currentRank = 1;
  let prevPoints = null;
  for (let i = 0; i < leaderboardData.length; i++) {
    // For the first element, assign rank 1 and record its points
    if (i === 0) {
      currentRank = 1;
      prevPoints = leaderboardData[i].total_points;
    } else {
      // If current score is different from previous score, increment the rank by 1
      if (leaderboardData[i].total_points !== prevPoints) {
        currentRank++;
        prevPoints = leaderboardData[i].total_points;
      }
    }
    leaderboardData[i].rank = currentRank;

    console.log(
      `Updating ${leaderboardData[i].user_name}: Points: ${leaderboardData[i].total_points}, Rank: ${leaderboardData[i].rank}`
    );

    await prisma.mentee.updateMany({
      where: {
        github: {
          equals: `https://github.com/${leaderboardData[i].user_name}`.toLowerCase(),
          mode: "insensitive",
        },
      },
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
      const res = await fetch(reqUrl, {
        headers: {
          Authorization: `token ${ACCESS_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      // Handle rate limit exceeded
      if (res.status === 403) {
        const resetTime = res.headers.get("x-ratelimit-reset");
        const currentTime = Math.floor(Date.now() / 1000);
        const waitTime = resetTime - currentTime + 1; // wait one extra second as buffer
        console.log(`Rate limit exceeded. Waiting for ${waitTime} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime * 1000));
        continue; // Retry the same page after waiting
      }

      const data = await res.json();
      console.log("I AM SUPERMAN", data);

      // If no data is returned, break out of the loop
      if (data == null || !Array.isArray(data) || data.length === 0) break;

      // Process the data using your filter function
      allData = [...allData, ...filterJwoc(data)];
      pageCount++;
    } catch (error) {
      console.log("I AM BATMAN : ", error.message);
      break;
    }
  }
  return allData;
};

const filterJwoc = (allData) => {
  return allData
    .filter(
      (prData) =>
        prData.merged_at &&
        new Date(prData.merged_at) > new Date("2025-02-10T00:00:00.000Z") &&
        prData.labels.some((label) =>
          label.name.toLowerCase().includes(eventLabel.toLowerCase())
        )
    )
    .map((prData) => ({
      user_name: prData.user.login.toLowerCase(), // convert username to lowercase
      pr_url: prData.html_url,
      labels: prData.labels.map((label) => label.name),
      phase: getPhase(prData.created_at),
    }));
};

const getPhase = (created_at) => {
  return new Date(created_at) > new Date("2025-03-01T00:00:00.000Z") ? 2 : 1;
};

const generateRank = (fullData, validGitHubUsers) => {
  let leaderboard = [];
  fullData.forEach(({ user_name, pr_url, labels, phase }) => {
    // Only consider PRs from valid GitHub users (case-insensitive)
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
  let point = 0,
    difficulty = "";
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

// Export the fetchAllData function so it can be used elsewhere.
module.exports = { fetchAllData };

// Optionally, if you need to run it immediately for testing, uncomment below:
// fetchAllData()
//   .catch((e) => console.error(e))
//   .finally(() => prisma.$disconnect());
