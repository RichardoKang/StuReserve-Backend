import { PartialType } from '@nestjs/mapped-types';
import { CreateClassroomDto } from './create-classroom.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateClassroomDto extends PartialType(CreateClassroomDto) {
  @ApiProperty({description: '教室名称'})
    name: string;

    @ApiProperty({description: '教室容量'})
    capacity: number;


}
