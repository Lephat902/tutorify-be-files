import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';
import { Schema as MongooseSchema } from 'mongoose';

// Define the additional properties for Feedback
@Schema({ timestamps: true })
export class FileUpload {
  @Expose({ name: 'id' })
  @Transform((params) => params.obj._id.toString())
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ default: '' })
  url: string;

  @Prop({ default: '' })
  size: number;

  @Prop({ default: '' })
  title: string
}

export const FileUploadSchema = SchemaFactory.createForClass(FileUpload);
