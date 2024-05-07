import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/db.service';
import CreateUserDto from './dto/create-user-dto';
import UserModel from 'src/models/user.model';
import { User } from '@prisma/client';
import UpdateUserDto from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  
  async createUser(userDto: CreateUserDto):Promise<UserModel> {
    const candidate = await this.prismaService.user.findUnique({
      where: { email: userDto.email },
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

  async getUserById(id: string):Promise<UserModel> {
    const user = await this.prismaService.user.findFirst({
      where: {OR: [{userId: id},{email: id}]},
      include: {tasks: { include: {user: true}}}
    })

    if (!user) {
      throw new HttpException('Such user was not founded', HttpStatus.BAD_REQUEST)
    }

    return user
  }

  async updateUser(userDto: UpdateUserDto):Promise<UserModel> {
    if (Object.values(userDto).length === 1) {
      throw new HttpException('No updating field', HttpStatus.BAD_REQUEST)
    }

    await this.getUserById(userDto.userId)

    return await this.prismaService.user.update({
      where: {userId: userDto.userId},
      data: {...userDto},
      include: {tasks: {include: {user: true}}}
    })
  }

  async removeUser(id: string) {
    await this.getUserById(id)
    return await this.prismaService.user.delete({
      where: {userId: id}
    })
  }
}