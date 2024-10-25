"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const environment_1 = require("./common/constants/environment");
const setup_1 = require("./swagger/setup");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    if (configService.get('APP_ENV') !== environment_1.APP_ENV_ENUM.PRODUCTION) {
        (0, setup_1.swaggerSetup)(app);
    }
    const PORT = configService.get('APP_PORT') || 3000;
    await app.listen(PORT);
    console.log('App started on port', PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map