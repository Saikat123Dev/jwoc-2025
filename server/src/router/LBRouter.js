const express = require("express");
const { PrismaClient } = require("@prisma/client");
const {fetchAllData} = require("./leaderboard/generate"); // Update with the correct path

const router = express.Router();
const prisma = new PrismaClient();

router.get("/getAll", async (req, res) => {
  try {

      // if (!req.isAuthenticated()) {
      //     return res.status(401).json({ message: "Unauthorized request" });
      // }
      const mentees = await prisma.mentee.findMany();
      res.status(200).json({
          message: "Successfully provided all mentees",
          mentees,
      });
  } catch (error) {
      console.error("Error fetching mentees:", error);
      res.status(500).json({
          message: "Something went wrong while retrieving mentee details",
      });
  }
});


// // Route to fetch and update leaderboard data
// router.get("/update-leaderboard", async (req, res) => {
//   try {
//     await fetchAllData();
//     res.json({ message: "Leaderboard updated successfully!" });
//   } catch (error) {
//     console.error("Error updating leaderboard:", error);
//     res.status(500).json({ error: "Failed to update leaderboard" });
//   }
// });

// // Route to get leaderboard data
// router.get("/leaderboard", async (req, res) => {
//   try {
//     const leaderboard = await prisma.mentee.findMany({
//       select: {
//         github: true,
//         TotalPoints: true,
//         Ranking: true,
//         pr_urls: true,
//       },
//       orderBy: { Ranking: "asc" },
//     });

//     console.log(leaderboard);

//     res.json(leaderboard);
//   } catch (error) {
//     console.error("Error fetching leaderboard:", error);
//     res.status(500).json({ error: "Failed to fetch leaderboard" });
//   }
// });

module.exports = router;
