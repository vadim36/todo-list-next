import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/db.service';
import CreateUserDto from './dto/create-user-dto';
import UserModel from 'src/models/user.model';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  
  async createUser(userDto: CreateUserDto):Promise<UserModel> {
    const candidate = await this.prismaService.user.findFirst({
      where: { OR: [
        { email: userDto.email },
        { refreshToken: userDto.refreshToken }
      ]},
      include: {tasks: { include: { user: true }}}
    })

    if (candidate !== null) {
      throw new HttpException('Such user already exist', HttpStatus.BAD_REQUEST)
    }

    return await this.prismaService.user.create({
      data: {...userDto},
      include: {tasks: { include: { user: true }}}
    })
  }
}