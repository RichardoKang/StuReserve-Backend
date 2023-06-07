import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderInfoDto } from "../dto/create-order.dto";
import { User } from "../../user/entities/user.entity";
import { Classrooms } from "../../classrooms/entities/classroom.entity";


@Entity('order')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Classrooms,(classroom) => classroom.name)
    studyroom: Classrooms;

    // 预定人
    @ManyToOne((type) => User, (user) => user.openid)
    subscriber: User;

    @Column({
        name: 'startTime',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    startTime: Date;

    @Column({
        name: 'endTime',
        type: 'timestamp',
        default: () => 'TIMESTAMPADD(HOUR,1,CURRENT_TIMESTAMP)',
    })
    endTime: Date;

    @Column({
        type: 'timestamp',
        name: 'create_time',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createTime: Date;

    @Column({
        default: false,
    })
    isApproved: boolean;

    @Column({
        default: false,
    })
    isCanceled: boolean;

    @Column({
        default: false,
    })
    isVerified: boolean;

    toResponseObject(): OrderInfoDto {
        const responseObj: OrderInfoDto = {
            orderId: this.id,
            studyroom: this.studyroom.name,
            //date: this.date,
            subscriber: this.subscriber.nickname,
            userID:this.subscriber.openid,
            startTime: this.startTime,
            endTime: this.endTime,
            creatTime: this.createTime,
            isApproved: this.isApproved,
            isCanceled: this.isCanceled
        };
        if (this.subscriber && this.subscriber.id) {
            responseObj.userID = this.subscriber.id;
            responseObj.subscriber = this.subscriber.nickname || this.subscriber.username;
        }
        return responseObj;
    }
}