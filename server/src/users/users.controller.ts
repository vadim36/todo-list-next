import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateUserDto from './dto/create-user-dto';
import { UsersService } from './users.service';
import UserModel from 'src/models/user.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor (private userService: UsersService) {}
  
  @ApiOperation({summary: 'Create a new user'})
  @ApiResponse({status: 201, type: UserModel})
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    return await this.userService.createUser(userDto)
  }
}