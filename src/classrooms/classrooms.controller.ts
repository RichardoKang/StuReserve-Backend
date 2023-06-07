import { Controller, Get, Post,Put, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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

  @ApiOperation({ summary: '创建自习室' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Post('/create')
  create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomsService.create(createClassroomDto);
  }


  @ApiOperation({ summary: '获取所有自习室' })
  @Get('/list')
  async findAll(@Query() query) {
    return await this.classroomsService.findAll();
  }


  @ApiOperation({ summary: '更新自习室信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateClassroomDto: UpdateClassroomDto) {
    return this.classroomsService.updateRoom(+id, updateClassroomDto);
  }

  // @ApiOperation({ summary: '删除自习室' })
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.classroomsService.remove(+id);
  // }
}