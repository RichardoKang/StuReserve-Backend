import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Order {
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
