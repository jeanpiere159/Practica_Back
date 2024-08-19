import { IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';
export class CreateProductoDto {
  @IsString()
  @MaxLength(50, { message: 'El nombre no debe alcanzar las 50 caracteristicas.' })
  readonly nombre: string;

  @IsNumber({}, { message: 'debe ser un numero.' })
  readonly precio: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly descripcion?: string;
}
