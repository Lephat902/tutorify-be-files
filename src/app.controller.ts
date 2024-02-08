import {
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CustomFileTypeValidator } from './validators/custom-file-type.validator';
import { AvatarRatioValidator } from './validators/avatar-ratio.validator';
import { AvatarTypeValidator } from './validators/avatar-type.validator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseInterceptors(FilesInterceptor('files'))
  @Post('tutors/:id/upload/portfolio')
  uploadTutorFiles(
    @Param('id') tutorId: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 20,
            message: 'Maximum file size is 20MB',
          }),
          new CustomFileTypeValidator(),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.appService.createPortfolios(tutorId, files);
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Post('upload/avatar')
  uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024,
            message: 'Maximum image size is 1MB.',
          }),
          new AvatarTypeValidator(),
          new AvatarRatioValidator(),
        ],
      }),
    )
    avatar: Express.Multer.File,
  ) {
    return this.appService.uploadFile(avatar);
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Post('sessions/:id/upload/materials')
  uploadSesssionFiles(
    @Param('id') sessionId: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 20,
            message: 'Maximum file size is 20MB',
          }),
          new CustomFileTypeValidator(),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.appService.createSessionMaterials(sessionId, files);
  }

  @Get('tutors/:id/portfolios')
  getAllPortfoliosByUserId(@Param('id') tutorId: string) {
    return this.appService.getAllPortfoliosByTutorId(tutorId);
  }

  @Get('sessions/:id/materials')
  getAllSessionMaterialBySessionId(@Param('id') sessionId: string) {
    return this.appService.getAllSessionMaterialBySessionId(sessionId);
  }
}
