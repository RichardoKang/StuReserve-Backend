import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { isNotEmpty, IsNotEmpty, IsNumber } from 'class-validator';
import { Timestamp } from "typeorm";

export class CreateOrderDto {
  @ApiProperty({ description: '教室ID' })
  @IsNotEmpty({ message: '教室ID必填' })
  studyroomId: number;

  @ApiProperty({description:'起始时间'})
  @IsNotEmpty({message: '请选择起始时间'})
  startTime: Date;

  @ApiProperty({description:'结束时间'})
  @IsNotEmpty({message:'请选择结束时间'})
  endTime: Date;
}

export class OrderInfoDto {
  public orderId: number;
  public studyroomId: number;
  //public date: Date;
  public subscriber: string;
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