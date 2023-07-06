import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  google: {
    id: process.env.OAUTH_GOOGLE_ID,
    secret: process.env.OAUTH_GOOGLE_SECRET,
    callback: process.env.OAUTH_GOOGLE_CALLBACK,
  },
}));
