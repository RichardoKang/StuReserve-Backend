import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('order')
export class Order {
    @ApiProperty({ description: '预约订单id' })
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    classroomId: number;

    @Column()
    userId: number;

    @Column()
    date: Date;

    @Column({
        name: 'startTime',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    startTime: Date;

    @Column({
        name: 'endTime',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'+1,
    })
    endTime: Date;

    @Column()
    isApproved: boolean;

    @Column()
    isCanceled: boolean;

    @Column()
    isFinished: boolean;

}
