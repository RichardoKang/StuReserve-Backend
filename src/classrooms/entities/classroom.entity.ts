import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Classrooms {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @Column()
    isAvailable: boolean;


}