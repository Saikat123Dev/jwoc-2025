const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Serialize user
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize user
passport.deserializeUser(async (id, done) => {
  const user = await prisma.mentee.findUnique({ where: { id } });
  done(null, user);
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // Use exact callback URL from env
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find mentee by email
        let user = await prisma.mentee.findUnique({
          where: { email: profile.emails[0].value },
          include: { oauthAccounts: true },
        });

        if (!user) {
          // Create new mentee with required fields
          user = await prisma.mentee.create({
            data: {
              name: profile.displayName,
              email: profile.emails[0].value,
              phone: "", // Required field
              whatsapp: "", // Required field
              college: "", // Required field
              year: "", // Required field
              github: "", // Required field
              linkedIn: "", // Required field
              answer1: "", // Required field
              oauthAccounts: {
                create: {
                  provider: "google",
                  providerId: profile.id, // Use Google profile ID
                  accessToken,
                  refreshToken,
                },
              },
            },
            include: { oauthAccounts: true },
          });
        } else {
          // Check if user has a Google OAuth account
          const hasGoogleAccount = user.oauthAccounts.some(
            (account) => account.provider === "google"
          );

          if (!hasGoogleAccount) {
            // Create Google OAuth account for existing user
            await prisma.menteeOAuthAccount.create({
              data: {
                menteeId: user.id,
                provider: "google",
                providerId: profile.id, // Use Google profile ID
                accessToken,
                refreshToken,
              },
            });
          }
        }

        done(null, user);
      } catch (err) {
        console.error("Error in Google Strategy:", err);
        done(err, null);
      }
    }
  )
);

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL, // Use exact callback URL from env
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find mentee by GitHub profile ID
        let user = await prisma.mentee.findFirst({
          where: {
            oauthAccounts: {
              some: {
                provider: "github",
                providerId: profile.id.toString(), // Use GitHub profile ID (convert to string)
              },
            },
          },
          include: { oauthAccounts: true },
        });

        if (!user) {
          // Create new mentee with required fields
          user = await prisma.mentee.create({
            data: {
              name: profile.displayName || profile.username,
              email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
              phone: "", // Required field
              whatsapp: "", // Required field
              college: "", // Required field
              year: "", // Required field
              github: profile.username, // Set GitHub username
              linkedIn: "", // Required field
              answer1: "", // Required field
              oauthAccounts: {
                create: {
                  provider: "github",
                  providerId: profile.id.toString(), // Use GitHub profile ID (convert to string)
                  accessToken,
                  refreshToken,
                },
              },
            },
            include: { oauthAccounts: true },
          });
        } else {
          // Check if user has a GitHub OAuth account
          const hasGithubAccount = user.oauthAccounts.some(
            (account) => account.provider === "github"
          );

          if (!hasGithubAccount) {
            // Create GitHub OAuth account for existing user
            await prisma.menteeOAuthAccount.create({
              data: {
                menteeId: user.id,
                provider: "github",
                providerId: profile.id.toString(), // Use GitHub profile ID (convert to string)
                accessToken,
                refreshToken,
              },
            });
          }
        }

        done(null, user);
      } catch (err) {
        console.error("Error in GitHub Strategy:", err);
        done(err, null);
      }
    }
  )
);

module.exports = passport;
