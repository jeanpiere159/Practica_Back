import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([Producto]),
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
