import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateUserDto from './dto/create-user-dto';
import UserModel from 'src/models/user.model';
import UpdateUserDto from './dto/update-user-dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor (private DbService: DbService) {}

  async createUser(userDto: CreateUserDto):Promise<UserModel> {
    const candidate = await this.getUserById(userDto.email)
    if (candidate) {
      throw new HttpException('Such user already exist', HttpStatus.BAD_REQUEST)
    }

    return await this.DbService.user.create({
      data: {...userDto}
    })
  }

  async getUserById(id: string):Promise<UserModel | null> {
    return await this.DbService.user.findFirst({
      where: {OR: [{userId: id},{email: id}]},
    }) || null
  }

  async updateUser(userDto: UpdateUserDto):Promise<UserModel> {
    const candidate = await this.getUserById(userDto.userId)
    if (!candidate) {
      throw new HttpException('The user was not found', HttpStatus.BAD_REQUEST)
    }

    return await this.DbService.user.update({
      where: { userId: candidate.userId },
      data: {...userDto}
    })
  }
}