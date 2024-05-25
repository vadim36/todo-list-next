import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import UserModel from 'src/models/user.model';
import CreateUserDto from './dto/create-user-dto';
import UpdateUserDto from './dto/update-user-dto';
import UserPayload from 'src/tokens/user-payload';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Create a new user'})
  @ApiResponse({status: 201, type: UserModel})
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() userDto: CreateUserDto):Promise<UserModel> {
    return await this.usersService.createUser(userDto)
  }

  @ApiOperation({summary: 'Get a user by userId'})
  @ApiResponse({status: 200, type: UserModel})
  @Get('/:id')
  async getUserById(@Param('id') id: string):Promise<UserModel> {
    return await this.usersService.getUserById(id)
  }

  @ApiOperation({summary: 'Update a user'})
  @ApiResponse({status: 201, type: UserModel})
  @UsePipes(ValidationPipe)
  @Put()
  async updateUser(@Body() userDto: UpdateUserDto):Promise<UserPayload> {
    return await this.usersService.updateUser(userDto)
  }
}