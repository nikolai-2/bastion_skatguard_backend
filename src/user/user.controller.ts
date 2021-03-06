import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { smallUser } from 'src/auth/smallUser.dto';
import { UserCreateDto } from './user-create.dto';

/*@UseGuards(JwtAuthGuard)*/
@Controller('user')
@ApiTags('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get('test')
  async test() {}

  @Post('create')
  async create(@Body() createDto: UserCreateDto) {
    return this.userService.createUser({
      ...createDto,
      password_hash: '5555',
    });
  }

  /*@Post('update')
  async update(@Body() createDto: UserCreateDto) {
    return this.userService.updateUser({
      ...createDto,
      password_hash: '5555',
    });
  }*/

  @ApiOperation({ summary: 'Получить всех пользователей одной роли' })
  @ApiOkResponse({ type: [smallUser] })
  @Get('getByRole/:role')
  async getByRole(@Param('role') role: string) {
    this.logger.log(role, 'getByRole');
    const users = await this.userService.users({
      role: role,
    });

    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        avatar_src: user.avatar_src,
        role: user.role,
      };
    });
  }

  @Get('getAll')
  async getAll() {
    const users = await this.userService.users({});
    return users.map((value) => {
      return {
        id: value.id,
        name: value.name,
        login: value.login,
        avatar_src: value.avatar_src,
        role: value.role,
      };
    });
  }
}
