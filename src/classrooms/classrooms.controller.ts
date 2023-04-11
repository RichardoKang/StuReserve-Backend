import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/role.guard';

@ApiTags('自习室')
@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}


  @Post()
  create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomsService.create(createClassroomDto);
  }

  /*
   * 获取所有自习室
   */
  @ApiOperation({ summary: '获取所有自习室' })
  @Get('/list')
  async findAll(@Query() query) {
    return await this.classroomsService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassroomDto: UpdateClassroomDto) {
    return this.classroomsService.update(+id, updateClassroomDto);
  }

  /*
   * 删除某个自习室
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomsService.remove(+id);
  }
}
