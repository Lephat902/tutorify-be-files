import { FileTypeValidator } from '@nestjs/common';

export class CustomFileTypeValidator extends FileTypeValidator {
  constructor() {
    super({ fileType: /.(jpg|jpeg|png|pdf)/ });
  }
  buildErrorMessage(): string {
    return 'The valid file format are jpg, png, and pdf.';
  }
}
