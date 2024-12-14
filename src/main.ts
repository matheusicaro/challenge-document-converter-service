import { NestFactory } from "@nestjs/core";
import { AppModule } from "./configuration/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { bodyParseToRawBody } from "./configuration/middlewares/raw-body.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParseToRawBody);

  const config = new DocumentBuilder()
    .setTitle("Example API")
    .setDescription("Example API description")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);

  console.log(`---------------`);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Application docs: ${await app.getUrl()}/docs`);
  console.log(`---------------`);
}

bootstrap();
