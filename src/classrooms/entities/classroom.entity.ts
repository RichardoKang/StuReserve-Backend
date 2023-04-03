import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Classrooms {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @Column()
    isAvailable: boolean;


}