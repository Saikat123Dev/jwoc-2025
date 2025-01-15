const mentorPassport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

mentorPassport.serializeUser((user, done) => done(null, user.id));
mentorPassport.deserializeUser(async (id, done) => {
    const user = await prisma.mentor.findUnique({ where: { id } });
    done(null, user);
});


mentorPassport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await prisma.mentor.findUnique({
                    where: { email: profile.emails[0].value },
                });

                if (!user) {
                    user = await prisma.mentee.create({
                        data: {
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            googleId: profile.id,
                        },
                    });
                }
                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);


mentorPassport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await prisma.mentor.findUnique({
                    where: { githubId: profile.username },
                });

                if (!user) {
                    user = await prisma.mentee.create({
                        data: {
                            name: profile.displayName || profile.username,
                            email: `${profile.username}@github.com`, // GitHub may not provide an email
                            githubId: profile.username,
                        },
                    });
                }
                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);

module.exports = mentorPassport;
