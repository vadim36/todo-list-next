import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/db.service';
import CreateUserDto from './dto/create-user-dto';
import UserModel from 'src/models/user.model';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  
  async createUser(userDto: CreateUserDto):Promise<UserModel> {
    return await this.prismaService.user.create({
      data: {...userDto},
      include: {tasks: { include: { user: true }}}
    })
  }
}