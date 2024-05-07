import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateUserDto from './dto/create-user-dto';
import { UsersService } from './users.service';
import UserModel from 'src/models/user.model';
import UpdateUserDto from './dto/update-user-dto';

@ApiTags('Users CRUD')
@Controller('users')
export class UsersController {
  constructor (private userService: UsersService) {}
  
  @ApiOperation({summary: 'Create a new user'})
  @ApiResponse({status: 201, type: UserModel})
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() userDto: CreateUserDto):Promise<UserModel> {
    return await this.userService.createUser(userDto)
  }

  @ApiOperation({summary: 'Get a user by userId'})
  @ApiResponse({status: 200, type: UserModel})
  @Get('/:id')
  async getUserById(@Param('id') id: string):Promise<UserModel> {
    return await this.userService.getUserById(id)
  }

  @ApiOperation({summary: 'Update a user'})
  @ApiResponse({status: 201, type: UserModel})
  @UsePipes(ValidationPipe)
  @Put()
  async updateUser(@Body() userDto: UpdateUserDto):Promise<UserModel> {
    return await this.userService.updateUser(userDto)
  }

  @ApiOperation({summary: 'Remove a user'})
  @ApiResponse({status: 201, type: UserModel})
  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.userService.removeUser(id)
  }
}