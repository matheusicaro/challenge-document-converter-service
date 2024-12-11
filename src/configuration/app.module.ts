import { Module } from "@nestjs/common";
import { AppController } from "../application/controllers/app.controller";
import { AppProvider } from "../application/domain/providers/app.provider";

@Module({
  controllers: [AppController],
  providers: [AppProvider],
})
export class AppModule {}
