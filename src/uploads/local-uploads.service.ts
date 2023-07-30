import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IUploadsService, UploadsResult } from './uploads.service';

function generateResult(file: Express.Multer.File) {
  const ext = file.originalname.match(/[^\\]*\.(\w+)$/)[1];
  const uniqueFilename = `${uuidv4()}.${ext}`;
  return {
    name: uniqueFilename,
    url: `/uploads/images/${uniqueFilename}`,
  };
}

@Injectable()
export class LocalUploadsService implements IUploadsService {
  uploadFile(file: Express.Multer.File): UploadsResult {
    const result = generateResult(file);
    writeFileSync(
      join(__dirname, '..', '..', 'uploads', 'images', result.name),
      file.buffer,
    );
    return result;
    // try {
    // } catch (e) {
    //   throw new UnprocessableEntityException();
    // }
  }

  uploadFiles(files: Express.Multer.File[]): UploadsResult[] {
    return files.map((file) => {
      const result = generateResult(file);
      writeFileSync(
        join(__dirname, '..', '..', 'uploads', 'images', result.name),
        file.buffer,
      );
      return result;
    });
    // try {
    // } catch (e) {
    //   throw new UnprocessableEntityException();
    // }
  }
}
