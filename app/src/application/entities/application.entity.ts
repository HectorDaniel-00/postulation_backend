import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { VacancyEntity } from '../../vacancy/entities/vacancy.entity';

@Entity('applications')
@Unique(['user', 'vacancy'])
export class ApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => VacancyEntity, (vacancy) => vacancy.id)
  @JoinColumn({ name: 'vacancy_id' })
  vacancy: VacancyEntity;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
