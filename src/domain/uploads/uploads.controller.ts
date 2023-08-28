import {
  Controller,
  Inject,
  ParseFilePipeBuilder,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IUploadsService } from './uploads.service';

@Controller('uploads')
@ApiTags('업로드')
export class UploadsController {
  constructor(
    @Inject('Uploads') private readonly uploadsService: IUploadsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '이미지 업로드',
    description: '이미지를 업르드한다.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({ description: '생성 완료' })
  @UseInterceptors(FilesInterceptor('images'))
  uploadImages(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jp[e]?g|png|webp)/,
        })
        .addMaxSizeValidator({
          maxSize: 50_000_000,
        })
        .build(),
    )
    images: Express.Multer.File[],
  ) {
    return this.uploadsService.uploadFiles(images, 'images');
  }
}
