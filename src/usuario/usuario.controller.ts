import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crearUsuario(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<Usuario> {
    try {
      return await this.usuarioService.crearUsuario(
        createUsuarioDto.name,
        createUsuarioDto.age,
        createUsuarioDto.email,
        createUsuarioDto.phone,
      );
    } catch (error) {
      throw new BadRequestException(`Error al crear : ${error.message}`);
    }
  }

  @Get()
  async obtenerUsuarios(): Promise<Usuario[]> {
    try {
      return await this.usuarioService.obtenerUsuarios();
    } catch (error) {
      throw new BadRequestException(`Error no hay nada: ${error.message}`);
    }
  }

  @Get(':id')
  async obtenerUsuarioPorId(@Param('id') id: number): Promise<Usuario> {
    const usuario = await this.usuarioService.obtenerUsuarioPorId(id);
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no existe :( .`);
    }
    return usuario;
  }

  @Put(':id')
  async actualizarUsuario(
    @Param('id') id: number,
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.usuarioService.actualizarUsuario(
      id,
      createUsuarioDto.name,
      createUsuarioDto.age,
      createUsuarioDto.email,
      createUsuarioDto.phone,
    );
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no existe ohhh omg.`);
    }
    return usuario;
  }

  @Delete(':id')
  async eliminarUsuario(@Param('id') id: number): Promise<void> {
    await this.usuarioService.eliminarUsuario(id);
  }
}
