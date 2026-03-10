import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRepository } from './entities/user.repository';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from 'src/common/enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  private readonly logger = new Logger(UserService.name);
  private readonly salRound = 10;

  async create(data: CreateUserDto) {
    const salt = await bcrypt.genSalt(this.salRound);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await this.userRepo.findOneByEmail(data.email);
    if (user) {
      this.logger.error(
        `Error: user with email address ${user.email} already exists.`,
      );
      throw new ConflictException(
        'There is already a user with that email address.',
      );
    }

    if (!hashedPassword) {
      this.logger.error('Error hashing password');
      throw new InternalServerErrorException('Internal server error');
    }

    const newUser = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: RoleEnum.CODER,
    };
    const createdUser = await this.userRepo.create(newUser);

    return createdUser;
  }

  async findAll() {
    const user = await this.userRepo.findAll();
    if (user.length <= 0) {
      throw new NotFoundException('Lista de usuarios vacia');
    }
    return user.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException(
        'El campo requerido esta incompleto o incorrecto',
      );
    }

    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(
        `Error el usuario con el id ${id} no existe, vuelva a intentarlo con otro id`,
      );
    }

    return user;
  }

  async findOneByEmail(email: string) {
    if (!email) {
      this.logger.error('EL Campo email esta vacio');
      throw new BadRequestException('El campo esta invalido');
    }

    const user = await this.userRepo.findOneByEmail(email);

    if (!user) {
      this.logger.error(`El usuario con el email ${email} no existe`);
      throw new NotFoundException('Error no existe ese usuario');
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException(
        'El campo requerido (id) esta incompleto, por favor verifique e intente nuevamente',
      );
    }
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(
        `El usuario con el id ${id} no existe, por favor cambie el dato ingresado y vuelta a intentarlo`,
      );
    }
    const updateUser = {
      name: data.name ?? user.name,
      email: data.email ?? user.email,
      role: user.role,
    };
    const modifyUser = await this.userRepo.update(id, updateUser);

    return modifyUser;
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('Campo requerido esta vacio');
    }
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(
        `El usuario con el id ${id} no existe, cambia el valor y vuelve a intentarlo`,
      );
    }

    return user;
  }
}
