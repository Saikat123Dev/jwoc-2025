const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await prisma.mentee.findUnique({ where: { id } });
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL.replace('/auth/', '/mentee-auth/'),
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // First, try to find a mentee by email
        let user = await prisma.mentee.findUnique({
          where: { email: profile.emails[0].value },
          include: { oauthAccounts: true }
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
                  provider: 'google',
                  providerId: profile.id,
                  accessToken,
                  refreshToken
                }
              }
            },
            include: { oauthAccounts: true }
          });
        } else {
          // If user exists but doesn't have a Google OAuth account, create one
          const hasGoogleAccount = user.oauthAccounts.some(
            account => account.provider === 'google'
          );

          if (!hasGoogleAccount) {
            await prisma.menteeOAuthAccount.create({
              data: {
                menteeId: user.id,
                provider: 'google',
                providerId: profile.id,
                accessToken,
                refreshToken
              }
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

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL.replace('/auth/', '/mentee-auth/'),
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Try to find mentee by GitHub username
        let user = await prisma.mentee.findFirst({
          where: {
            oauthAccounts: {
              some: {
                provider: 'github',
                providerId: profile.username
              }
            }
          },
          include: { oauthAccounts: true }
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
                  provider: 'github',
                  providerId: profile.username,
                  accessToken,
                  refreshToken
                }
              }
            },
            include: { oauthAccounts: true }
          });
        } else {
          // If user exists but doesn't have a GitHub OAuth account, create one
          const hasGithubAccount = user.oauthAccounts.some(
            account => account.provider === 'github'
          );

          if (!hasGithubAccount) {
            await prisma.menteeOAuthAccount.create({
              data: {
                menteeId: user.id,
                provider: 'github',
                providerId: profile.username,
                accessToken,
                refreshToken
              }
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
