/**
 * 
 * import { RoleEnum } from 'src/common/enum';
 * import { UserEntity } from 'src/user/entities/user.entity';
 * import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

 * @Entity('role')
 * export class RoleEntity {
 *   @PrimaryGeneratedColumn('uuid')
 *   id: string;
 *
 * @Column({
 * unique: true,
 *   type: 'enum',
 *   enum: RoleEnum,
 *   default: RoleEnum.CODER,
 *  })
 *  name: string;
 *
 *  @OneToMany(() => UserEntity, (user) => user.role)
 *  users: UserEntity[];
 * }
 * 
 * 
 */
