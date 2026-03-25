import { RoleEnum } from '@common/enum/index';
import { VacancyEntity } from 'src/vacancy/entities/vacancy.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 150 })
  name: string;

  @Column({ unique: true, nullable: false, length: 150 })
  email: string;

  @Column({ nullable: false, type: 'text' })
  password: string;

  @OneToMany(() => VacancyEntity, (vacancy) => vacancy.user)
  vacancies: VacancyEntity[];

  @Column({
    type: 'enum',
    enum: RoleEnum,
    nullable: false,
  })
  role: RoleEnum;
}

/**
 * ! Mejorar implementar tabla de roles
 * @ManyToOne(() => RoleEntity, (role) => role.users)
 * @JoinColumn({ name: 'role_id' })
 * role: RoleEntity;
 *
 */
