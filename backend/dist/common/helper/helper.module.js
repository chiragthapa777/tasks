"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const auth_helper_service_1 = require("./auth/auth-helper.service");
const pagination_helper_service_1 = require("./pagination-helper/pagination-helper.service");
let HelperModule = class HelperModule {
};
exports.HelperModule = HelperModule;
exports.HelperModule = HelperModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [auth_helper_service_1.AuthHelperService, pagination_helper_service_1.PaginationHelperService],
        exports: [auth_helper_service_1.AuthHelperService, pagination_helper_service_1.PaginationHelperService],
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    global: true,
                    signOptions: {
                        expiresIn: '24h',
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], HelperModule);
//# sourceMappingURL=helper.module.js.map