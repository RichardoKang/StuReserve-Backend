import { Module } from '@nestjs/common';
import { Classrooms } from './entities/classroom.entity';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Classrooms])],
  controllers: [ClassroomsController],
  providers: [ClassroomsService]
})
export class ClassroomsModule {}
