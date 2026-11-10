import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    const allowedOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
        : ['http://localhost:5173', 'http://localhost:4173', 'http://localhost:3000'];
    if (process.env.FRONTEND_URL) {
        allowedOrigins.push(process.env.FRONTEND_URL.trim());
    }
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin ||
                allowedOrigins.includes(origin) ||
                origin.endsWith('.vercel.app') ||
                process.env.NODE_ENV !== 'production') {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new DocumentBuilder()
        .setTitle("Blossom Women's Health Clinic API")
        .setDescription("RESTful API foundation for Blossom Women's Health Clinic Management System (Milestone 1). Supports public clinic website, doctors directory, services catalog, health articles, contact enquiries, and appointment requests.")
        .setVersion('1.0.0')
        .addTag('Appointments', 'Patient appointment requests')
        .addTag('Contact', 'Clinic contact submissions')
        .addTag('Doctors', 'Doctor directory and qualifications')
        .addTag('Services', 'Clinical services and specialties')
        .addTag('Articles', 'Educational women health resources')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT ?? 3001;
    await app.listen(port);
    console.log(`🚀 Blossom API running at http://localhost:${port}/api`);
    console.log(`🏥 Health check: http://localhost:${port}/api/health`);
    console.log(`📑 OpenAPI / Swagger UI: http://localhost:${port}/api/docs`);
}
await bootstrap();
//# sourceMappingURL=main.js.map