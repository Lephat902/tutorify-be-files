import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SessionMaterialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sessionId: string;

  @Column()
  url: string;

  @Column({ type: 'float' })
  size: number;

  @Column({ default: '' })
  title: string;

  @Column()
  createdAt: Date;
}
