import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseService } from './services/firebase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorPortfolioEntity } from './entities/tutor-portfolio.entity';
import { ConfigModule } from '@nestjs/config';
import { SessionMaterialEntity } from './entities/session-material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TutorPortfolioEntity, SessionMaterialEntity]),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Don't use in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
