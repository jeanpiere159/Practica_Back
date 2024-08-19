import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';
import { CreateUpdateProductoDto } from './dto/create-update-producto.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @UseGuards(AuthGuard)
  async crearProducto(
    @Body() createUpdateProductoDto: CreateUpdateProductoDto,
  ): Promise<Producto> {
    return this.productoService.crearProducto(createUpdateProductoDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async obtenerProductos(): Promise<Producto[]> {
    return this.productoService.obtenerProductos();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async obtenerProductoPorId(@Param('id') id: number): Promise<Producto> {
    return this.productoService.obtenerProductoPorId(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async actualizarProducto(
    @Param('id') id: number,
    @Body() createUpdateProductoDto: CreateUpdateProductoDto,
  ): Promise<Producto> {
    return this.productoService.actualizarProducto(id, createUpdateProductoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async eliminarProducto(@Param('id') id: number): Promise<void> {
    await this.productoService.eliminarProducto(id);
  }
}
