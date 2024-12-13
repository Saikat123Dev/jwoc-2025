const mentorPassport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Serialize and Deserialize User
mentorPassport.serializeUser((user, done) => done(null, user.id));

mentorPassport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.mentor.findUnique({
      where: { id },
      include: { oauthAccounts: true },
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Helper function to handle OAuth login
async function handleOAuthLogin(profile, provider, accessToken, refreshToken) {
  const email = profile.emails?.[0]?.value;

  if (!email) {
    throw new Error("No email found in OAuth profile.");
  }

  // Find existing mentor
  let mentor = await prisma.mentor.findUnique({
    where: { email },
    include: { oauthAccounts: true },
  });

  if (!mentor) {
    // Create a new mentor and associate OAuth account
    mentor = await prisma.mentor.create({
      data: {
        email,
        name: profile.displayName || profile.username || "Anonymous",
        oauthAccounts: {
          create: {
            provider,
            providerId: profile.id,
            accessToken,
            refreshToken,
          },
        },
      },
    });
  } else {
    // Check for existing OAuth account
    let oauthAccount = mentor.oauthAccounts.find(
      (account) => account.provider === provider && account.providerId === profile.id
    );

    if (!oauthAccount) {
      // Add OAuth account if not present
      await prisma.mentorOAuthAccount.create({
        data: {
          mentorId: mentor.id,
          provider,
          providerId: profile.id,
          accessToken,
          refreshToken,
        },
      });
    } else {
      // Update tokens for existing OAuth account
      await prisma.mentorOAuthAccount.update({
        where: { id: oauthAccount.id },
        data: { accessToken, refreshToken },
      });
    }
  }

  return mentor;
}

// Google Strategy
mentorPassport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Profile:", profile);
        const mentor = await handleOAuthLogin(profile, "google", accessToken, refreshToken);
        done(null, mentor);
      } catch (err) {
        console.error("Google OAuth Error:", err);
        done(err, null);
      }
    }
  )
);

// GitHub Strategy
mentorPassport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log("GitHub Profile:", profile);

        // Fetch additional emails if not provided
        if (!profile.emails || profile.emails.length === 0) {
          try {
            const emailResponse = await fetch("https://api.github.com/user/emails", {
              headers: {
                Authorization: `token ${accessToken}`,
                Accept: "application/vnd.github.v3+json",
              },
            });
            const emails = await emailResponse.json();
            const primaryEmail = emails.find((email) => email.primary && email.verified);

            if (primaryEmail) {
              profile.emails = [{ value: primaryEmail.email }];
            }
          } catch (emailError) {
            console.warn("Could not fetch GitHub emails", emailError);
          }
        }

        const mentor = await handleOAuthLogin(profile, "github", accessToken, refreshToken);
        done(null, mentor);
      } catch (err) {
        console.error("GitHub OAuth Error:", err);
        done(err, null);
      }
    }
  )
);

module.exports = mentorPassport;
