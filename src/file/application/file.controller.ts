import {
  Controller,UseInterceptors
} from '@nestjs/common';
import { FileService } from './file.service';
import { MessagePattern } from '@nestjs/microservices';
import { FileDto, FilesDto } from './dtos';
import { FileUpload } from '../infrastructure/schemas';
import MongooseClassSerializerInterceptor from './interceptors/mongoose-class-serializer.interceptor';

@Controller()
@UseInterceptors(MongooseClassSerializerInterceptor(FileUpload))
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @MessagePattern({ cmd: 'uploadMultipleFiles' })
  uploadFiles(
    filesDto: FilesDto,
  ) {
    return this.fileService.uploadFiles(filesDto.files);
  }

  @MessagePattern({ cmd: 'uploadSingleFile' })
  uploadFile(
     fileDto: FileDto,
  ) {
    return this.fileService.uploadFile(fileDto.file);
  }

  @MessagePattern({ cmd: 'deleteSingleFile' })
  deleteFile(
    id: string
  ) {
    return this.fileService.deleteFile(id);
  }

  @MessagePattern({ cmd: 'deleteMultipleFiles' })
  deleteFiles(
    ids: string[]
  ) {
    console.log('deleteMultipleFiles: ', ids)
    return this.fileService.deleteFiles(ids);
  }
}
