import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '请输入密码' })
  password: string;

  @ApiProperty({
    required: false,
    description: '[用户角色]: 0-admin | 1-common | 2-visitor',
  })
  role: string;
}
