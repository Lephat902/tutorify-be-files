import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { FileUpload } from 'src/file/infrastructure/schemas';
import * as FirebaseJSON from 'src/tutorify-b63bf-firebase-adminsdk-yvkwv-a4ec247bb0.json'

@Injectable()
export class FirebaseService {
  private readonly storage: Bucket;
  constructor(private readonly configService: ConfigService, @InjectModel(FileUpload.name) private readonly fileUploadModel: Model<FileUpload>) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          FirebaseJSON as admin.ServiceAccount
        ),
        storageBucket: this.configService.get('STORAGE_BUCKET'),

      });
      this.storage = admin.storage().bucket();
    };

  }

  async uploadFile(file: Express.Multer.File) {
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
        const newFile = new this.fileUploadModel({ url: publicUrl, title: file.originalname, size: file.size, });

        const savedFile = await newFile.save();

        resolve(savedFile);
      } catch (error) {
        reject(error);
      }
    });
  }

  async uploadFiles(files: Array<Express.Multer.File>) {
    const fileUrlPromises = files.map((file: Express.Multer.File) =>
      this.uploadFile(file),
    );
    return Promise.all(fileUrlPromises);
  }

  deleteFile(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const file = await this.fileUploadModel.findById(id);
        if (file) {
          const url = file.url;
          const urlComponents = url.split('/')
          const fileName = urlComponents[urlComponents.length - 1];
          const fileRef = this.storage.file(fileName)
          await fileRef.delete()

          await this.fileUploadModel.deleteOne({ _id: id })
        }
        resolve({})
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteFiles(ids: string[]) {
    const deleteFilePromises = ids.map((id: string) =>
      this.deleteFile(id),
    );
    return Promise.all(deleteFilePromises);
  }
}
