import { FileValidator, InternalServerErrorException } from '@nestjs/common';
import sizeOf from 'image-size';

export class AvatarRatioValidator extends FileValidator {
  isValid(file?: any): boolean {
    try {
      const size = sizeOf(file.buffer);

      return size.height === size.width;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Error in validating avatar ratio.',
      );
    }
  }
  constructor() {
    super({});
  }
  buildErrorMessage(): string {
    return 'The image ratio must be 1:1.';
  }
}
