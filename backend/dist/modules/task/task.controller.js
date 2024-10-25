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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const auth_guard_1 = require("../user/guards/auth/auth.guard");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const task_service_1 = require("./task.service");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    create(createTaskDto, user) {
        createTaskDto.user = new mongoose_1.Types.ObjectId(user._id);
        return this.taskService.create(createTaskDto);
    }
    async findAll(query, user) {
        const options = {
            ...query,
        };
        const find = {
            user: new mongoose_1.Types.ObjectId(user._id),
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
    async findOne(id, user) {
        return await this.taskService.findOneOrFail({
            user: new mongoose_1.Types.ObjectId(user._id),
            _id: id,
        });
    }
    async update(id, updateTaskDto, user) {
        const task = await this.taskService.findOneOrFail({
            user: new mongoose_1.Types.ObjectId(user._id),
            _id: id,
        });
        return this.taskService.update(task, updateTaskDto);
    }
    async remove(id, user) {
        await this.taskService.findOneOrFail({
            user: new mongoose_1.Types.ObjectId(user._id),
            _id: id,
        });
        return this.taskService.remove(id);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "remove", null);
exports.TaskController = TaskController = __decorate([
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)('Tasks'),
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map