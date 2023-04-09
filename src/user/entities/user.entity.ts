import { Exclude } from 'class-transformer';
import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';
import { Classrooms } from 'src/classrooms/entities/classroom.entity';

@Entity('user')
export class User {
    @ApiProperty({ description: '用户id' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100, nullable: true })
    username: string;

    @Column({ length: 100, nullable: true })
    nickname: string;

    @Exclude()
    @Column({ select: false, nullable: true })
    password: string;

    @Column({ default: null })
    avatar: string; // avatar: 储存头像的url

    @Column({ default: null })
    openid: string;

    @Column('enum', { enum: ['root', 'common', 'visitor'], default: 'visitor' })
    role: string;

    // @OneToMany(() => Classrooms,)
    // posts: Classrooms[];

    @Column({
        name: 'create_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createTime: Date;


    @BeforeInsert()
    async encryptPwd() {
        if (!this.password) return;
        this.password = bcrypt.hashSync(this.password, 10);
    }
}
