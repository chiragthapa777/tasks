import { Model, RootFilterQuery, Types } from 'mongoose';
import { PaginationHelperService } from 'src/common/helper/pagination-helper/pagination-helper.service';
import { IFindOptions } from 'src/common/interface/find-option.interface';
import { IGetTotalOptions } from 'src/common/interface/get-total-option.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './entities/task.entity';
import { IPaginationMeta } from 'src/common/interface/pagination-meta.interface';
export declare class TaskService {
    private taskModel;
    private readonly paginationHelperService;
    constructor(taskModel: Model<Task>, paginationHelperService: PaginationHelperService);
    findOneOrFail(find: RootFilterQuery<Task>): Promise<TaskDocument>;
    findOneByIdOrFail(id: string | Types.ObjectId): Promise<TaskDocument>;
    create(createTaskDto: CreateTaskDto): Promise<TaskDocument>;
    findAll(options?: IFindOptions<Task>): Promise<TaskDocument[]>;
    getTotal(options: IGetTotalOptions<Task>): Promise<number>;
    getPaginationMeta(options: IGetTotalOptions<Task>): Promise<IPaginationMeta>;
    update(taskDoc: TaskDocument, updateTaskDto: UpdateTaskDto): Promise<import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    remove(id: string | Types.ObjectId): Promise<import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
}
