import { Injectable } from '@nestjs/common';
import { FirebaseService } from './services/firebase.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TutorPortfolioEntity } from './entities/tutor-portfolio.entity';
import { Repository } from 'typeorm';
import { SessionMaterialEntity } from './entities/session-material.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TutorPortfolioEntity)
    private readonly tutorPortfolioRepository: Repository<TutorPortfolioEntity>,
    @InjectRepository(SessionMaterialEntity)
    private readonly sessionMaterialRepository: Repository<SessionMaterialEntity>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async createPortfolios(tutorId: string, files: Array<Express.Multer.File>) {
    const fileUrls = await Promise.all(this.firebaseService.uploadFiles(files));
    const tutorPortfolios = fileUrls.map((uploadedFile) => ({
      ...uploadedFile,
      tutorId,
    }));
    return this.tutorPortfolioRepository.save(tutorPortfolios);
  }

  uploadFile(file: Express.Multer.File) {
    return this.firebaseService.uploadFile(file);
  }

  getAllPortfolios() {
    return this.tutorPortfolioRepository.find();
  }

  getAllPortfoliosByTutorId(tutorId: string) {
    return this.tutorPortfolioRepository.findBy({
      tutorId,
    });
  }

  async createSessionMaterials(
    sessionId: string,
    files: Array<Express.Multer.File>,
  ) {
    const fileUrls = await Promise.all(this.firebaseService.uploadFiles(files));
    const sessionMaterials = fileUrls.map((uploadedFile) => ({
      ...uploadedFile,
      sessionId,
    }));
    return this.sessionMaterialRepository.save(sessionMaterials);
  }

  getAllSessionMaterialBySessionId(sessionId: string) {
    return this.sessionMaterialRepository.findBy({
      sessionId,
    });
  }
}
