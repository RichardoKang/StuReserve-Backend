import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderRo,OrderInfoDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}


  async create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll(query):Promise<OrderRo>{
    const qb = await this.ordersRepository
      .createQueryBuilder('order')
      .select(['order.id'])
      .orderBy('order.createTime', 'DESC')
    qb.where('1 = 1');
    qb.orderBy('order.createTime', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query; // 分页参数 pageNum 页码 pageSize 每页条数
    qb.limit(pageSize); // 每页条数
    qb.offset(pageSize * (pageNum - 1)); // 跳过条数

    const orders = await qb.getMany();
    const result: OrderInfoDto[] = orders.map((item) => item.toResponseObject());

    return { list: result, count: count };
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
