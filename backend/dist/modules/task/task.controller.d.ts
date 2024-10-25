import { Types } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { IUserPayload } from '../user/interface/user-payload.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto, user: IUserPayload): Promise<import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    findAll(query: PaginationQueryDto, user: IUserPayload): Promise<{
        data: (import("mongoose").Document<unknown, {}, Task> & Task & {
            _id: Types.ObjectId;
        } & {
            __v?: number;
        })[];
        paginationMeta: import("../../common/interface/pagination-meta.interface").IPaginationMeta;
    }>;
    findOne(id: string, user: IUserPayload): Promise<import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto, user: IUserPayload): Promise<import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    remove(id: string, user: IUserPayload): Promise<import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
}
