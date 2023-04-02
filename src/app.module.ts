import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { Classrooms } from './classrooms/entities/classroom.entity';
import envConfig from '../config/env';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envConfig.path] }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [Classrooms], // 数据表实体
        host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT', 6543), // 端口，默认为5432
        username: configService.get('DB_USER', 'mysql'), // 用户名，默认为postgres
        password: configService.get('DB_PASSWORD', '200277'), // 密码
        database: configService.get('DB_DATABASE', 'stu_reserve'), // 数据库名
        // charset: 'utf8mb4',
        timezone: '+08:00',
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),

    AuthModule,
    UserModule,
    ClassroomsModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
