import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FileUploadSchema,
  FileUpload
} from './schemas';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      // without useFactory and async, SECRET cannot be read by configService
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: FileUpload.name,
        schema: FileUploadSchema,
      },
    ]),
  ],
  providers: [MongooseModule, FileUpload],
  exports: [MongooseModule, FileUpload],
})
export class InfrastructureModule { }
