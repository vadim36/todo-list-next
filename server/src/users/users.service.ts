import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import UserModel from 'src/models/user.model';
import CreateUserDto from './dto/create-user-dto';
import UpdateUserDto from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor (private DBService: DbService) {}

  async createUser(userDto: CreateUserDto):Promise<UserModel> {
    const candidate = await this.DBService.user.findUnique({
      where: { email: userDto.email }
    })

    if (candidate) {
      throw new HttpException('Such user already exist', HttpStatus.BAD_REQUEST)
    }

    return await this.DBService.user.create({
      data: {...userDto}
    })
  }

  async getUserById(id: string):Promise<UserModel> {
    const user = await this.DBService.user.findFirst({
      where: {OR: [{userId: id},{email: id}]},
    })

    if (!user) {
      throw new HttpException('The user was not found', HttpStatus.BAD_REQUEST)
    }

    return user
  }

  async updateUser(userDto: UpdateUserDto):Promise<UserModel> {
    const user = await this.getUserById(userDto.userId)
    return await this.DBService.user.update({
      where: { userId: user.userId },
      data: {...userDto}
    })
  }
}