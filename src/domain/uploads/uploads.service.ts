export interface UploadsResult {
  name: string;
  url: string;
}

export interface IUploadsService {
  uploadFile(
    file: Express.Multer.File,
    category: string,
  ): Promise<UploadsResult>;

  uploadFiles(
    files: Express.Multer.File[],
    category: string,
  ): Promise<UploadsResult[]>;
}
