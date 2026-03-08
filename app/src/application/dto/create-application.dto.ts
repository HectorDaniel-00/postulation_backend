import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ description: 'ID del usuario que aplica', example: 1 })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'ID de la vacante a la que se aplica',
    example: 10,
  })
  @IsString()
  vacancyId: string;
}
