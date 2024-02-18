import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';
import { firebaseConfig } from '../configs';
import { v4 as uuidv4 } from 'uuid';
import { IUploadedFile } from '../interfaces';
import * as FirebaseJSON from '../tutorify-b63bf-firebase-adminsdk-yvkwv-a4ec247bb0.json';

@Injectable()
export class FirebaseService {
  private readonly storage: Bucket;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(
        FirebaseJSON as admin.ServiceAccount
      ),
      storageBucket: firebaseConfig.storageBucket,
    });

    this.storage = admin.storage().bucket();
  }

  async uploadFile(file: Express.Multer.File): Promise<IUploadedFile> {
    return new Promise(async (resolve, reject) => {
      try {
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

        resolve({ url: publicUrl, title: fileName, size: file.size });
      } catch (error) {
        reject(error);
      }
    });
  }

  uploadFiles(files: Array<Express.Multer.File>): Promise<IUploadedFile>[] {
    const fileUrlPromises = files.map((file: Express.Multer.File) =>
      this.uploadFile(file),
    );
    return fileUrlPromises;
  }
}
