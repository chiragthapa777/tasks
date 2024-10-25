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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_helper_service_1 = require("../../common/helper/auth/auth-helper.service");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userModel, authHelperService) {
        this.userModel = userModel;
        this.authHelperService = authHelperService;
    }
    async checkEmailExist(email) {
        try {
            await this.findOneOrFail({ email });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async findOneOrFail(find) {
        const user = await this.userModel.findOne(find).exec();
        if (!user)
            throw new common_1.NotFoundException('user not found');
        return user;
    }
    async createUser(createUserDto) {
        const hashedPassword = await this.authHelperService.getHashedPassword(createUserDto.password);
        createUserDto.password = hashedPassword;
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }
    async getUserAccessToken(user) {
        const accessToken = await this.authHelperService.getAccessToken(user);
        const payload = this.authHelperService.getUserPayload(user);
        return {
            user: payload,
            accessToken,
        };
    }
    async register(createUserDto) {
        const emailExists = await this.checkEmailExist(createUserDto.email);
        if (emailExists)
            throw new common_1.BadRequestException('Email already exists');
        const user = await this.createUser(createUserDto);
        return await this.getUserAccessToken(user);
    }
    async login(loginDto) {
        const user = await this.findOneOrFail({ email: loginDto.email });
        const isPasswordMatch = await this.authHelperService.checkPassword(loginDto.password, user.password);
        if (!isPasswordMatch)
            throw new common_1.BadRequestException('Invalid credentials');
        return await this.getUserAccessToken(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_helper_service_1.AuthHelperService])
], UserService);
//# sourceMappingURL=user.service.js.map