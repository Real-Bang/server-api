import { Global, Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import authConfig from '@/config/auth.config';

@Global()
@Module({
  imports: [ConfigModule.forFeature(authConfig)],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
