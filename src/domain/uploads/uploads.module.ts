import { Module } from '@nestjs/common';
import { S3UploadsService } from './s3-uploads.service';
import { UploadsController } from './uploads.controller';
import { ConfigModule } from '@nestjs/config';
import authConfig from '@/config/auth.config';

@Module({
  imports: [ConfigModule.forFeature(authConfig)],
  controllers: [UploadsController],
  providers: [{ provide: 'Uploads', useClass: S3UploadsService }],
  exports: [],
})
export class UploadsModule {}
