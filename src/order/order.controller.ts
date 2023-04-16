import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation, ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  OrderRo,
  OrderInfoDto
} from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/role.guard';
import { query } from "express";

@ApiTags('预约订单')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @ApiOperation({ summary: '创建预约订单' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'root')
  @Post('/create')
  async create(
    @Req() req,
    @Body() createOrderDto: CreateOrderDto
  ):Promise<number> {
    return this.orderService.create(req.user,createOrderDto);
  }

  /*
   * 获取所有预约订单
   */
  @ApiOperation({ summary: '获取所有预约订单' })
  @Get('/list')
  async findAll(
    @Query() query,
    @Query('pageSize') pageSize: number,
    @Query('pageNum') pageNum: number,
  ): Promise<OrderRo> {
    return await this.orderService.findAll(query);
  }

  /*
   * 获取自己的所有预约
   */
  @ApiOperation({ summary: '获取自己的预约订单' })
  @ApiBearerAuth()
  @Get('/mine/create')
  @UseGuards(AuthGuard('jwt'))
  async getMine(
    @Query() queryMy,
    @Req() req,
    @Query('pageSize') pageSize: number,
    @Query('pageNum') pageNum: number,
  ): Promise<OrderRo> {
    return await this.orderService.getMine(req.user, queryMy);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderService.findOne(+id);
  // }

  /*
   * 获得特定教室在特定时间段内的预约人数
   */
  @ApiOperation({ summary: '获得特定教室在特定时间段内的预约人数' })
  @Get('/classroom/count')
  async getCountNumberInTimeSpanAtStudyroom(
    @Query('studyroomId') studyroomId: number,
    @Query('startTime') startTime: Date,
    @Query('endTime') endTime: Date,
  ): Promise<number> {
    return await this.orderService.getCountNumberInTimeSpanAtStudyroom(
      studyroomId,
      startTime,
      endTime,
    );
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(+id, updateOrderDto);
  // }
  @ApiOperation({ summary: '取消自己的预约订单' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/mine/cancel')
  async cancelMine(
    @Req() req,
    @Query('id') orderId: number,
  ):Promise<string> {
    return await this.orderService.cancelMine(
      req.user,
      orderId,
    );
  }

  @ApiOperation({ summary: '审核预约订单' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Put('/manage/verify')
  async verifyOrder(
    @Req() curentUser,
    @Query('id') orderId: number,
  ):Promise<string> {
    return await this.orderService.verifyOrder(
      curentUser,
      orderId,
    );
  }

  @ApiOperation({ summary: '查询未审核预约订单' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Get('/manage/list')
  async findUnverifiedOrders(
      @Query() query,
      @Query('pageSize') pageSize: number,
      @Query('pageNum') pageNum: number,
  ): Promise<OrderRo> {
      return await this.orderService.findUnverifiedOrders();
  }

}