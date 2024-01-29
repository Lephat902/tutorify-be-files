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
import {
  ApiConsumes,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { FilesUploadDto } from './dtos/files-upload.dto';
import { AvatarUploadDto } from './dtos/avatar-upload.dto';
import { CustomFileTypeValidator } from './validators/custom-file-type.validator';
import { AvatarRatioValidator } from './validators/avatar-ratio.validator';
import { AvatarTypeValidator } from './validators/avatar-type.validator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(FilesInterceptor('files'))
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Avatar to upload',
    type: AvatarUploadDto,
  })
  @ApiCreatedResponse({
    description: 'The avatar has been uploaded successfully.',
  })
  @ApiBadRequestResponse({
    description:
      'File format is invalid or file size is too large or file is required.',
  })
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

  @ApiOkResponse({
    description: 'Get all portfolios by tutorId  successfully.',
  })
  @Get('tutors/:id/portfolios')
  getAllPortfoliosByUserId(@Param('id') tutorId: string) {
    return this.appService.getAllPortfoliosByTutorId(tutorId);
  }

  @ApiOkResponse({
    description: 'Get all materials by sessionId successfully.',
  })
  @Get('sessions/:id/materials')
  getAllSessionMaterialBySessionId(@Param('id') sessionId: string) {
    return this.appService.getAllSessionMaterialBySessionId(sessionId);
  }
}
