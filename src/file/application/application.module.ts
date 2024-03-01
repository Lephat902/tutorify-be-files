import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { InfrastructureModule } from '../infrastructure/infrastruture.module';
import { FirebaseService } from './services/firebase.service';

@Module({
  imports: [InfrastructureModule,],
  controllers: [FileController],
  providers: [FirebaseService, FileService],
})
export class ApplicationModule { }
