import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/usuario.entity';
import { APP_FILTER } from '@nestjs/core';
import { UsuarioNotFoundExceptionFilter } from './usuario/usuario-not-found.exception-filter';
import { ProductoModule } from './productos/productos.module';
import { Producto } from './productos/producto.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'base_datos',
      entities: [Usuario, Producto],
      synchronize: true,
    }),
    UsuarioModule,
    ProductoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: UsuarioNotFoundExceptionFilter,
    },
  ],
})
export class AppModule {}
