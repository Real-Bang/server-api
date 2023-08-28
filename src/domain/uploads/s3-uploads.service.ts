import { S3Service } from '@/S3/s3.service';
import authConfig from '@/config/auth.config';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { IUploadsService, UploadsResult } from './uploads.service';

@Injectable()
export class S3UploadsService implements IUploadsService {
  constructor(
    @Inject(authConfig.KEY)
    private configService: ConfigType<typeof authConfig>,
    private s3: S3Service,
  ) {}

  private generateParams(file: Express.Multer.File, category: string) {
    const ext = file.originalname.match(/[^\\]*\.(\w+)$/)[1];
    const uniqueFilename = `${uuidv4()}.${ext}`;
    return {
      Bucket: this.configService.aws.bucketName,
      Key: `/${category}/${uniqueFilename}`,
      Body: file.buffer,
      _filename: uniqueFilename,
    } satisfies PutObjectCommandInput & { _filename: string };
  }

  async uploadFile(
    file: Express.Multer.File,
    category: string,
  ): Promise<UploadsResult> {
    const params = this.generateParams(file, category);
    try {
      const results = await this.s3.send(new PutObjectCommand(params));
      console.log(
        'Successfully created ' +
          params.Key +
          ' and uploaded it to ' +
          params.Bucket +
          '/' +
          params.Key,
      );

      console.log(results);

      return {
        name: params['_filename'],
        url: params.Key,
      };
    } catch (err) {
      console.log('Error', err);
    }
  }

  async uploadFiles(
    files: Express.Multer.File[],
    category: string,
  ): Promise<UploadsResult[]> {
    return await Promise.all(
      files.map(async (file) => {
        const params = this.generateParams(file, category);
        const results = await this.s3.send(new PutObjectCommand(params));
        console.log(
          'Successfully created ' +
            params.Key +
            ' and uploaded it to ' +
            params.Bucket +
            '/' +
            params.Key,
        );

        console.log(results);

        return {
          name: params['_filename'],
          url: params.Key,
        };
      }),
    );
  }
}
