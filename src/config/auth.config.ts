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
  aws: {
    region: process.env.AWS_REGION,
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
  },
}));
