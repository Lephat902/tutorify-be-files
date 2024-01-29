import { FileTypeValidator } from '@nestjs/common';

export class AvatarTypeValidator extends FileTypeValidator {
  constructor() {
    super({ fileType: /.(jpg|png|jpeg)/ });
  }
  buildErrorMessage(): string {
    return 'The valid file format are jpg, and png.';
  }
}
