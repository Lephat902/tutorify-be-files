import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|pdf)/))) {
    req.fileValidationError = 'Valid file format are jpg, png and pdf.';
    callback(null, false);
  }

  if (file.size > 1024 * 1024 * 20) {
    req.fileValidationError = 'The maximum file size is 20MB.';
    callback(null, false);
  }

  callback(null, true);
};

export const fileOptions: MulterOptions = {
  fileFilter: fileFilter,
};
