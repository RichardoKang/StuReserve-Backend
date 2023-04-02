import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Classrooms } from './entities/classroom.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(Classrooms)
    private readonly classroomsRepository: Repository<Classrooms>,
  ) {}

  create(createClassroomDto: CreateClassroomDto) {
    return 'This action adds a new classroom';
  }

  async findAll() {
    const qb = await this.classroomsRepository
        .createQueryBuilder('classroom')
        .select(['classroom.id', 'classroom.name', 'classroom.capacity'])
        .getMany();
    return qb;
  }

  findOne(id: number) {
    return `This action returns a #${id} classroom`;
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return `This action updates a #${id} classroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} classroom`;
  }
}
