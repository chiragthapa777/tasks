"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const pagination_helper_service_1 = require("../../common/helper/pagination-helper/pagination-helper.service");
const task_entity_1 = require("./entities/task.entity");
let TaskService = class TaskService {
    constructor(taskModel, paginationHelperService) {
        this.taskModel = taskModel;
        this.paginationHelperService = paginationHelperService;
    }
    async findOneOrFail(find) {
        const user = await this.taskModel.findOne(find).exec();
        if (!user)
            throw new common_1.NotFoundException('task not found');
        return user;
    }
    async findOneByIdOrFail(id) {
        return await this.findOneOrFail({ _id: id });
    }
    async create(createTaskDto) {
        const newUser = new this.taskModel(createTaskDto);
        return await newUser.save();
    }
    async findAll(options) {
        const taskBuilder = this.taskModel.find(options.find);
        if (options.limit) {
            taskBuilder.limit(options.limit);
            if (options.page) {
                const offset = this.paginationHelperService.getOffset(options.page, options.limit);
                taskBuilder.skip(offset);
            }
        }
        if (options.order) {
            taskBuilder.sort(options.order);
        }
        return await taskBuilder.exec();
    }
    async getTotal(options) {
        return await this.taskModel.countDocuments(options.find);
    }
    async getPaginationMeta(options) {
        const total = await this.getTotal(options);
        return this.paginationHelperService.getPaginationMeta(total, options.limit);
    }
    async update(taskDoc, updateTaskDto) {
        if (updateTaskDto.body !== undefined)
            taskDoc.body = updateTaskDto.body;
        if (updateTaskDto.done !== undefined)
            taskDoc.done = updateTaskDto.done;
        if (updateTaskDto.title !== undefined)
            taskDoc.title = updateTaskDto.title;
        return await taskDoc.save();
    }
    async remove(id) {
        return await this.taskModel.findByIdAndDelete({
            _id: id,
        });
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_entity_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        pagination_helper_service_1.PaginationHelperService])
], TaskService);
//# sourceMappingURL=task.service.js.map