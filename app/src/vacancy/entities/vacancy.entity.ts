import { ApplicationEntity } from 'src/application/entities/application.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModalityOpcion } from '../dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('vacancies')
export class VacancyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: false })
  seniority: string;

  @Column({ name: 'soft_skills', nullable: false })
  softSkills: string;

  @Column({ nullable: false, type: 'text', array: true })
  tecnologies: string[];

  @Column({ nullable: false })
  location: string;

  @OneToMany(() => ApplicationEntity, (app) => app.vacancy)
  applications: ApplicationEntity[];

  @Column({ nullable: false, type: 'enum', enum: ModalityOpcion })
  modality: string;

  @ManyToOne(() => UserEntity, (user) => user.vacancies, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'salary_range', nullable: false })
  salaryRange: number;

  @Column({ nullable: false })
  company: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'max_applicants', nullable: false })
  maxApplicants: number;
}
