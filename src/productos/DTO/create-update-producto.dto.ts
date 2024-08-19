import {
  IsString,
  IsNumber,
  Min,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateUpdateProductoDto {
  @IsString()
  @MaxLength(100, {
    message: 'El nombre no debe exeder a 100 caracteristicas loco.',
  })
  readonly nombre: string;

  @IsNumber({}, { message: 'este no es un numero.' })
  @Min(0, { message: 'debe ser mayor o igual a 1 ' })
  readonly precio: number;

  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'La descripción no debe tener un max de 255 caracteristicas.',
  })
  readonly descripcion?: string;
}
