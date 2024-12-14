import { Module } from "@nestjs/common";
import { DocumentsController } from "../application/controllers/documents.controller";
import { registerProviders } from "./dependency-registries/repositories-registries";

@Module({
  controllers: [DocumentsController],
  providers: [...registerProviders()],
})
export class AppModule {}
