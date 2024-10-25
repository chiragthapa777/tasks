"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSetup = swaggerSetup;
const swagger_1 = require("@nestjs/swagger");
function swaggerSetup(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Task Api')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'accessToken')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, documentFactory, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
}
//# sourceMappingURL=setup.js.map