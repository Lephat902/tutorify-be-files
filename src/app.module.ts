import { Module } from '@nestjs/common';
import { FileController } from './file/application/file.controller';
import { FileService } from './file/application/file.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './file/application/services/firebase.service';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    FileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.example', '.env'],
    }),
  ],
  controllers: [FileController],
  providers: [FileService, FirebaseService],
})
export class AppModule { }
