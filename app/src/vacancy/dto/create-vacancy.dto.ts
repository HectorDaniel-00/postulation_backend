import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export enum ModalityOpcion {
  REMOTO = 'remoto',
  HIBRIDO = 'hibrido',
  PRESENCIAL = 'presencial',
}

export class CreateVacancyDto {
  @ApiProperty({
    description: 'Título de la vacante',
    example: 'Desarrollador Backend',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title debe ser de tipo texto' })
  title: string;

  @ApiProperty({
    description: 'Descripción de la vacante',
    example: 'Responsable de desarrollar APIs RESTful.',
  })
  @IsNotEmpty({ message: 'description is required' })
  @IsString({ message: 'Description debe ser de tipo texto' })
  description: string;

  @ApiProperty({
    description: 'Nivel de experiencia requerido',
    example: 'Senior',
  })
  @IsNotEmpty({ message: 'Seniority is required' })
  @IsString({ message: 'Seniority debe ser de tipo texto' })
  seniority: string;

  @ApiProperty({
    description: 'Habilidades blandas requeridas',
    example: 'Trabajo en equipo, comunicación',
  })
  @IsNotEmpty({ message: 'soft Skills is required' })
  @IsString({ message: 'Soft Skills debe ser de tipo texto' })
  softSkills: string;

  @ApiProperty({
    description: 'Tecnologías requeridas',
    example: 'Node.js, TypeScript',
    type: 'array',
  })
  @IsNotEmpty({ message: 'Tecnologies is required' })
  @IsArray()
  @IsString({
    each: true,
    message: 'Los nombres de las tecnologias debe ser tipo texto',
  })
  tecnologies: string[];

  @ApiProperty({
    description: 'Ubicación del trabajo',
    example: 'Barranquilla/Atlantico',
  })
  @IsNotEmpty({ message: 'Location is required' })
  @IsString({ message: 'localizacion debe ser de tipo texto' })
  location: string;

  @ApiProperty({
    description: 'Modalidad de trabajo',
    example: 'Remoto',
  })
  @IsNotEmpty({ message: 'Modality is required' })
  @IsEnum(ModalityOpcion)
  modality: ModalityOpcion;

  @ApiProperty({ description: 'Rango salarial', example: 50000 })
  @IsNotEmpty({ message: 'Salary Range is required' })
  @IsNumber()
  salaryRange: number;

  @ApiProperty({ description: 'Nombre de la empresa', example: 'TechCorp' })
  @IsNotEmpty({ message: 'Name company is required' })
  @IsString({ message: 'El nombre de la compañia debe ser de tipo texto' })
  company: string;

  @ApiProperty({ description: 'Número máximo de postulantes', example: 10 })
  @IsNotEmpty({ message: 'Max Applicants is required' })
  @IsNumber()
  maxApplicants: number;
}
