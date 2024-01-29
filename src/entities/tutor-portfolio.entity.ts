import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class TutorPortfolioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tutorId: string;

  @Column()
  url: string;

  @Column({ type: 'float' })
  size: number;

  @Column({ default: '' })
  title: string;

  @CreateDateColumn()
  createdAt: Date;
}
