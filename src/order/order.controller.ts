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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto,OrderRo,OrderInfoDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/role.guard';

@ApiTags('预约订单')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: '创建预约订单' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('common', 'root')
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: '获取所有预约订单' })
  @Get('/list')
  async findAll(
    @Query() query,
    @Query('pageSize') pageSize: number,
    @Query('pageNum') pageNum: number,
  ): Promise<OrderRo> {
    return await this.orderService.findAll(query);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
