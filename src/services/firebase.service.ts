import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';
import { firebaseConfig } from '../configs';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class FirebaseService {
  private readonly storage: Bucket;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(
        'tutorify-b63bf-firebase-adminsdk-yvkwv-a4ec247bb0.json',
      ),
      storageBucket: firebaseConfig.storageBucket,
    });

    this.storage = admin.storage().bucket();
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}${file.originalname}`;
    const fileRef = this.storage.file(fileName);

    await fileRef.save(file.buffer, {
      public: true,
      metadata: {
        contentType: file.mimetype,
      },
    });

    const bucketName = this.storage.name;
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

    return publicUrl;
  }

  async uploadFiles(files: Array<Express.Multer.File>) {
    const fileUrlPromises = files.map((file: Express.Multer.File) =>
      this.uploadFile(file),
    );
    return Promise.all(fileUrlPromises);
  }
}
