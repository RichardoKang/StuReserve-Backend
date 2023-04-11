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
      .leftJoinAndSelect('order.studyroom','classroom')
      .leftJoinAndSelect('order.subscriber','user')
    qb.where('1 = 1');
    qb.orderBy('order.id', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query; // 分页参数 pageNum 页码 pageSize 每页条数
    qb.limit(pageSize); // 每页条数
    qb.offset(pageSize * (pageNum - 1)); // 跳过条数

    const orders = await qb.getMany();
    const result: OrderInfoDto[] = orders.map((item) => item.toResponseObject());

    return { list: result, count: count };
  }

  async getMine(currentUser, queryMy): Promise<OrderRo> {
    const qb = await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.studyroom','classroom')
      .leftJoinAndSelect('order.subscriber','user')
    qb.where('user.id=:id', { id: currentUser.id });
    qb.orderBy('order.id', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = queryMy;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const orders = await qb.getMany();
    const result: OrderInfoDto[] = orders.map((item) => item.toResponseObject());

    return { list: result, count: count };
  }

  async getCountNumberInTimeSpanAtStudyroom(
    studyroomID: number, startTime: Date, endTime: Date):Promise<number> {
    const qb = await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.studyroom','classroom')
    qb.where('classroom.id=:id', { id: studyroomID });
    qb.andWhere('order.startTime >= :startTime', { startTime: startTime });
    qb.andWhere('order.endTime <= :endTime', { endTime: endTime });

    return await qb.getCount();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
