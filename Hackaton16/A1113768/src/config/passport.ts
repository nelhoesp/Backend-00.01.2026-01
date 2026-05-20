import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.ts";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            nombre: profile.displayName,
            email: profile.emails?.[0]?.value || "",
            password: "oauth_no_password",
            avatar: profile.photos?.[0]?.value || null,
            role: "client",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    },
  ),
);

export default passport;
