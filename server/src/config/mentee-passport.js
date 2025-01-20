const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL.replace('/auth/', '/mentee-auth/'),
      // Use exact callback URL from env
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Store minimal user information in the session
        const user = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          provider: "google",
          providerId: profile.id,
        };

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
      callbackURL: process.env.GITHUB_CALLBACK_URL.replace('/auth/', '/mentee-auth/'), // Use exact callback URL from env
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Store minimal user information in the session
        const user = {
          id: profile.id,
          name: profile.displayName || profile.username,
          email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
          provider: "github",
          providerId: profile.id,
        };

        done(null, user);
      } catch (err) {
        console.error("Error in GitHub Strategy:", err);
        done(err, null);
      }
    }
  )
);

module.exports = passport;
