import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Post()
  create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomsService.create(createClassroomDto);
  }

  @Get()
  async findAll(@Query() query) {
    return await this.classroomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classroomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassroomDto: UpdateClassroomDto) {
    return this.classroomsService.update(+id, updateClassroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomsService.remove(+id);
  }
}
