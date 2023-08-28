import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IUploadsService, UploadsResult } from './uploads.service';

function generateResult(file: Express.Multer.File, category: string) {
  const ext = file.originalname.match(/[^\\]*\.(\w+)$/)[1];
  const uniqueFilename = `${uuidv4()}.${ext}`;
  return {
    name: uniqueFilename,
    url: `/uploads/${category}/${uniqueFilename}`,
  };
}

@Injectable()
export class LocalUploadsService implements IUploadsService {
  async uploadFile(
    file: Express.Multer.File,
    category: string,
  ): Promise<UploadsResult> {
    const result = generateResult(file, category);
    writeFileSync(
      join(__dirname, '..', '..', '..', 'uploads', category, result.name),
      file.buffer,
    );
    return result;
  }

  async uploadFiles(
    files: Express.Multer.File[],
    category: string,
  ): Promise<UploadsResult[]> {
    return files.map((file) => {
      const result = generateResult(file, category);
      writeFileSync(
        join(__dirname, '..', '..', '..', 'uploads', category, result.name),
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
