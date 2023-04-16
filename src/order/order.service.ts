import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderRo,OrderInfoDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';



@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}


  async create(currentUser, Order: CreateOrderDto) :Promise<number> {
    const { studyroomId, startTime, endTime } = Order;
    const foreorder = await this.ordersRepository.findOne({
      join: {
        alias: 'order',
        leftJoinAndSelect: {
          studyroom: 'order.studyroom',
          subscriber: 'order.subscriber',
        }
      },
      where: { subscriber: currentUser, startTime: startTime }
    });
    if (foreorder) {
      throw new HttpException('存在重复预约', HttpStatus.BAD_REQUEST);
    }

    const classroomCapacity = await this.getCountNumberInTimeSpanAtStudyroom(studyroomId, startTime, endTime);
    if (classroomCapacity >= 30) {
      throw new HttpException('教室已满', HttpStatus.BAD_REQUEST);
    }

    const orderParams = {
      ...Order,
      subscriber: currentUser,
    };

    const newOrder: Order = await this.ordersRepository.create(orderParams);
    const result = await this.ordersRepository.save(newOrder);
    return result.id;
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

  async findOne(id: number) {
    return `This action returns a #${id} order`;
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

  async cancelMine(currentUser, orderId: number) : Promise<string>{
    const qb = await this.ordersRepository
        .createQueryBuilder('order')
        .update('order')
        .set({ isCanceled: true })
    qb.where('order.subscriberId=:userId', { userId: currentUser.id })
    qb.andWhere('order.id=:id', { id: orderId })
    qb.andWhere('order.isCanceled=:isCanceled', { isCanceled: false })

    const result = await qb.execute();
    if (result.affected == 0) {
        throw new HttpException('取消失败或存在重复取消行为', HttpStatus.BAD_REQUEST);
    }
    else {
        return '取消预约成功';
    }
  }

  async verifyOrder(currentUser, orderId: number) : Promise<string>{
    const qb = await this.ordersRepository
        .createQueryBuilder('order')
        .update('order')
        .set({ isApproved: true ,isVerified: true })
    qb.where('order.id=:id', { id: orderId })
    qb.andWhere('order.isApproved=:isApproved', { isApproved: false })

    const result = await qb.execute();
    if (result.affected == 0) {
        throw new HttpException('设定失败或存在重复审核行为', HttpStatus.BAD_REQUEST);
    }
    else {
        return '已允许此项预约';
    }
  }

  async findUnverifiedOrders() : Promise<OrderRo>{
    const qb = await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.studyroom','classroom')
      .leftJoinAndSelect('order.subscriber','user')
    qb.where('order.isVerified=:isVerified', { isVerified: false });
    qb.orderBy('order.id', 'DESC');

    const count = await qb.getCount();
    const orders = await qb.getMany();
    const result: OrderInfoDto[] = orders.map((item) => item.toResponseObject());

    return { list: result, count: count };
  }
}
