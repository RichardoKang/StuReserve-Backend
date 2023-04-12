import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateClassroomDto {
    @ApiProperty({ description: '教室名称' })
    @IsNotEmpty({ message: '请输入教室名称' })
    name: string;

    @ApiProperty({ description: '教室容量' })
    @IsNotEmpty({ message: '请输入教室容量' })
    @IsNotEmpty()
    capacity: number;

    @ApiProperty({ description: '教室可用情况' })
    isAvailable: boolean;
}
