import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { Classrooms } from './classrooms/entities/classroom.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import envConfig from '../config/env';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envConfig.path] }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [], // 数据表实体
        host: configService.get('DB_HOST', '43.142.110.130'), // 主机
        port: configService.get<number>('DB_PORT', 3306), // 端口
        username: configService.get('DB_USER', 'mysql'), // 用户名
        password: configService.get('DB_PASSWORD', '200277'), // 密码
        database: configService.get('DB_DATABASE', 'tx_stu_reserve'), // 数据库名
        // charset: 'utf8mb4',
        timezone: '+08:00',
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),

    AuthModule,
    UserModule,
    ClassroomsModule,
    OrderModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
