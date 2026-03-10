import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Message, Roles } from 'src/common/decorator';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RoleEnum } from 'src/common/enum';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Message('User successfully created')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 403, description: 'Access denied.' })
  @Post()
  @Roles(RoleEnum.ADMIN)
  create(@Body() dto: CreateUserDto) {
    const user = this.service.create(dto);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Users successfully found')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  @Get()
  @Roles(RoleEnum.GESTOR, RoleEnum.ADMIN, RoleEnum.CODER)
  findAll() {
    const user = this.service.findAll();
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('User successfully found')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User details.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.GESTOR)
  findOne(@Param('id') id: string) {
    const user = this.service.findOne(id);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('User successfully updated')
  @Patch(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.CODER, RoleEnum.GESTOR)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.service.update(id, updateUserDto);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Delete user')
  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
