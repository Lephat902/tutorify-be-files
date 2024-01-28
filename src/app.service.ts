import { Injectable } from '@nestjs/common';
import { FirebaseService } from './services/firebase.service';

@Injectable()
export class AppService {
  constructor(private readonly firebaseService: FirebaseService) {}
  uploadFiles(files: Array<Express.Multer.File>) {
    return this.firebaseService.uploadFiles(files);
  }
}
