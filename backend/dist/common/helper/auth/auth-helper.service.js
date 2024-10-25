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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHelperService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthHelperService = class AuthHelperService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async getHashedPassword(password) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }
    async checkPassword(password, hash) {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
    getUserPayload(user) {
        const payload = {
            _id: user._id.toString(),
            email: user.email,
            name: user.name,
        };
        return payload;
    }
    async getAccessToken(user) {
        return await this.jwtService.signAsync(this.getUserPayload(user));
    }
    async verifyAccessToken(token) {
        const payload = await this.jwtService.verifyAsync(token);
        return payload;
    }
};
exports.AuthHelperService = AuthHelperService;
exports.AuthHelperService = AuthHelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthHelperService);
//# sourceMappingURL=auth-helper.service.js.map