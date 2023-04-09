import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { isNotEmpty, IsNotEmpty, IsNumber } from 'class-validator';
import { Timestamp } from "typeorm";

export class CreateOrderDto {
  @ApiProperty({ description: '教室ID' })
  @IsNotEmpty({ message: '教室ID必填' })
  classroomID: number;

  @ApiProperty({description:'日期'})
  @IsNotEmpty({message: '请选择日期'})
  date: Date;

  @ApiProperty({description:'起始时间'})
  @IsNotEmpty({message: '请选择起始时间'})
  startTime: Date;

  @ApiProperty({description:'结束时间'})
  @IsNotEmpty({message:'请选择结束时间'})
  endTime: Date;
}

export class OrderInfoDto {
  public id: number;
  public studyroom: string;
  //public date: Date;
  public subscriber: String;
  public userID: string;
  public startTime: Date;
  public endTime: Date;
  public creatTime: Date;
  public isApproved:boolean;
  public isCanceled:boolean;
}

export interface OrderRo {
  list: OrderInfoDto[]; // 订单列表
  count: number;
}