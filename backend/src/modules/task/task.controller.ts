import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RootFilterQuery, Types } from 'mongoose';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { IFindOptions } from '../../common/interface/find-option.interface';
import { AuthGuard } from '../user/guards/auth/auth.guard';
import { IUserPayload } from '../user/interface/user-payload.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: IUserPayload) {
    createTaskDto.user = new Types.ObjectId(user._id?.toString());
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
    @GetUser() user: IUserPayload,
  ) {
    const options: IFindOptions = {
      ...query,
    };

    const find: RootFilterQuery<Task> = {
      user: new Types.ObjectId(user._id),
    };

    if (query.search) {
      find.title = {
        $regex: new RegExp(query.search),
        $options: 'i',
      };
    }

    options.find = find;

    if (query.sortBy) {
      options.order = {
        [query.sortBy]: query.sortDirection ?? 'desc',
      };
    }

    const data = await this.taskService.findAll(options);
    const paginationMeta = await this.taskService.getPaginationMeta({
      find,
      limit: query.limit,
    });
    return { data, paginationMeta };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: IUserPayload) {
    return await this.taskService.findOneOrFail({
      user: new Types.ObjectId(user._id),
      _id: id,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: IUserPayload,
  ) {
    const task = await this.taskService.findOneOrFail({
      user: new Types.ObjectId(user._id),
      _id: id,
    });
    return this.taskService.update(task, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() user: IUserPayload) {
    await this.taskService.findOneOrFail({
      user: new Types.ObjectId(user._id),
      _id: id,
    });
    return this.taskService.remove(id);
  }
}
