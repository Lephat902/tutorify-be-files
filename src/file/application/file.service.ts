import { Injectable } from '@nestjs/common';
import { FirebaseService } from './services/firebase.service';

@Injectable()
export class FileService {
  constructor(
    private readonly firebaseService: FirebaseService,

  ) { }

  async uploadFiles(files: Array<Express.Multer.File>) {
    for (let i = 0; i < files.length; ++i) {
      files[i].buffer = Buffer.from(files[i].buffer)
    }
    return this.firebaseService.uploadFiles(files);
  }

  uploadFile(file: Express.Multer.File) {
    file.buffer = Buffer.from(file.buffer)
    return this.firebaseService.uploadFile(file);
  }

  async deleteFile(id: string) {
    return this.firebaseService.deleteFile(id);
  }

  async deleteFiles(ids: string[]) {
    return this.firebaseService.deleteFiles(ids);
  }
}
