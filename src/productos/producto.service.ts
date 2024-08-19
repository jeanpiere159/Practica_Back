import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CreateUpdateProductoDto } from './dto/create-update-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async crearProducto(dto: CreateUpdateProductoDto): Promise<Producto> {
    const nuevoProducto = this.productoRepository.create(dto);
    return this.productoRepository.save(nuevoProducto);
  }

  async obtenerProductos(
    page: number = 1,
    pageSize: number = 10,
    search: string = '',
  ): Promise<Producto[]> {
    const skip = (page - 1) * pageSize;
    return this.productoRepository.find({
      where: {
        nombre: ILike(`%${search}%`),
      },
      skip,
      take: pageSize,
    });
  }

  async obtenerProductoPorId(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
    return producto;
  }

  async actualizarProducto(
    id: number,
    dto: CreateUpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.productoRepository.preload({
      id,
      ...dto,
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
    return this.productoRepository.save(producto);
  }

  async eliminarProducto(id: number): Promise<void> {
    const resultado = await this.productoRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
  }
}
