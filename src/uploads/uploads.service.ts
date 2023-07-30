export interface UploadsResult {
  name: string;
  url: string;
}

export interface IUploadsService {
  uploadFile(file: Express.Multer.File): UploadsResult;
  uploadFiles(files: Express.Multer.File[]): UploadsResult[];
}
