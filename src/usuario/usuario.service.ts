import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async crearUsuario(
    name: string,
    age: number,
    email?: string,
    phone?: string,
  ): Promise<Usuario> {
    if (!name || age == null) {
      throw new BadRequestException('Nombre y edad son requeridos.');
    }
    const nuevoUsuario = this.usuarioRepository.create({
      name,
      age,
      email,
      phone,
    });
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async obtenerUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async obtenerUsuarioPorId(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no existe.`);
    }
    return usuario;
  }

  async actualizarUsuario(
    id: number,
    name: string,
    age: number,
    email?: string,
    phone?: string,
  ): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no hay nada.`);
    }
    if (name) usuario.name = name;
    if (age != null) usuario.age = age;
    if (email) usuario.email = email;
    if (phone) usuario.phone = phone;
    return this.usuarioRepository.save(usuario);
  }

  async eliminarUsuario(id: number): Promise<void> {
    const resultado = await this.usuarioRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no mucho menos xd .`);
    }
  }
}
