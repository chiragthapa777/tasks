import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery, Types } from 'mongoose';
import { PaginationHelperService } from 'src/common/helper/pagination-helper/pagination-helper.service';
import { IFindOptions } from 'src/common/interface/find-option.interface';
import { IGetTotalOptions } from 'src/common/interface/get-total-option.interface';
import { IPaginationMeta } from 'src/common/interface/pagination-meta.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private readonly paginationHelperService: PaginationHelperService,
  ) {}

  async findOneOrFail(find: RootFilterQuery<Task>): Promise<TaskDocument> {
    const user = await this.taskModel.findOne(find).exec();
    if (!user) throw new NotFoundException('task not found');
    return user;
  }

  async findOneByIdOrFail(id: string | Types.ObjectId): Promise<TaskDocument> {
    return await this.findOneOrFail({ _id: id });
  }

  async create(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    const newUser = new Task();
    Object.assign(newUser, createTaskDto);
    return await this.taskModel.create(newUser);
  }

  async findAll(options?: IFindOptions<Task>): Promise<TaskDocument[]> {
    const taskBuilder = this.taskModel.find(options.find);

    if (options.limit) {
      taskBuilder.limit(options.limit);
      if (options.page) {
        const offset = this.paginationHelperService.getOffset(
          options.page,
          options.limit,
        );
        taskBuilder.skip(offset);
      }
    }

    if (options.order) {
      taskBuilder.sort(options.order);
    }

    return await taskBuilder.exec();
  }

  async getTotal(options: IGetTotalOptions<Task>): Promise<number> {
    return await this.taskModel.countDocuments(options.find);
  }

  async getPaginationMeta(
    options: IGetTotalOptions<Task>,
  ): Promise<IPaginationMeta> {
    const total = await this.getTotal(options);
    return this.paginationHelperService.getPaginationMeta(total, options.limit);
  }

  async update(taskDoc: TaskDocument, updateTaskDto: UpdateTaskDto) {
    if (updateTaskDto.body !== undefined) taskDoc.body = updateTaskDto.body;
    if (updateTaskDto.done !== undefined) taskDoc.done = updateTaskDto.done;
    if (updateTaskDto.title !== undefined) taskDoc.title = updateTaskDto.title;
    return await taskDoc.save();
  }

  async remove(id: string | Types.ObjectId) {
    return await this.taskModel.findByIdAndDelete({
      _id: id,
    });
  }
}
