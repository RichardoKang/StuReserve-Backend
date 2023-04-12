import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiPropertyOptional
} from '@nestjs/swagger';
import { UserInfoDto } from './dto/user-info.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '注册用户' })
  @ApiResponse({ status: 201, type: UserInfoDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserInfo(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: '更新自己的用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateMine(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
