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

  async create(createClassroomDto: CreateClassroomDto) {
    const { name, capacity } = createClassroomDto;
    const classroom = await this.classroomsRepository.findOne({
      where: { name },
    });
    if (classroom) {
      throw new HttpException('教室已存在', HttpStatus.BAD_REQUEST);
    }
    const newClassroom = await this.classroomsRepository.create({
      name,
      capacity,
    });
    return await this.classroomsRepository.save(newClassroom);
  }

  async findAll() {
    const qb = await this.classroomsRepository
      .createQueryBuilder('classroom')
      .select(['classroom.id', 'classroom.name', 'classroom.capacity','classroom.isAvailable'])
      .getMany();
    return qb;
  }

  findOne(id: number) {
    return `This action returns a #${id} classroom`;
  }

  async updateRoom(id: number, updateClassroomDto: UpdateClassroomDto) {
    return await this.classroomsRepository.update(id, updateClassroomDto);
  }

  remove(id: number) {
    return `This action removes a #${id} classroom`;
  }
}