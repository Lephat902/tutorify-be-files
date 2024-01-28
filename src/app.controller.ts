import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { FilesUploadDto } from './dtos/files-upload.dto';
import { fileOptions } from './configs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(FilesInterceptor('files', 100, fileOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Files to upload',
    type: FilesUploadDto,
  })
  @ApiCreatedResponse({
    description: 'The files have been uploaded successfully.',
  })
  @ApiBadRequestResponse({
    description:
      'File formats are invalid or file sizes are too large or file is required.',
  })
  @Post('upload/files')
  uploadFiles(
    @Req()
    req: any,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    if (files.length === 0) {
      return new BadRequestException('Files are required!');
    }

    const error = req.fileValidationError;

    if (error) {
      return new BadRequestException(error);
    }

    return this.appService.uploadFiles(files);
  }
}
