import {
  IsString,
  IsInt,
  Min,
  MaxLength,
  IsOptional,
  IsEmail,
  Matches,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MaxLength(50, {
    message: 'no te pases con los nombres.',
  })
  readonly name: string;

  @IsInt({ message: 'Entero la tengo .' })
  @Min(0, { message: 'numero positivo.' })
  readonly age: number;

  @IsOptional()
  @IsEmail({}, { message: 'no es un correo .' })
  readonly email?: string;

  @IsOptional()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'no es un numero .' })
  readonly phone?: string;
}
