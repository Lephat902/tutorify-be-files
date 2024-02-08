import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseService } from './services/firebase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorPortfolioEntity } from './entities/tutor-portfolio.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionMaterialEntity } from './entities/session-material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TutorPortfolioEntity, SessionMaterialEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: configService.get('DATABASE_TYPE'),
        url: configService.get('DATABASE_URI'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Don't use in production
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule { }
