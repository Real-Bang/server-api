import authConfig from '@/config/auth.config';
import { S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class S3Service extends S3Client {
  constructor(
    @Inject(authConfig.KEY) configService: ConfigType<typeof authConfig>,
  ) {
    super({
      region: configService.aws.region,
      credentials: {
        accessKeyId: configService.aws.accessKey,
        secretAccessKey: configService.aws.secretKey,
      },
    });
  }
}
