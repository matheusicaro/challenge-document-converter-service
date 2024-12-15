import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./configuration/app.module";
import { bodyParseToRawBody } from "./configuration/middlewares/raw-body.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: false,
  });

  app.use(bodyParseToRawBody);

  const config = new DocumentBuilder()
    .setTitle("challenge-document-converter-service API")
    .setDescription("API service to convert documents in different formats between them")
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
