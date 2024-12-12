import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AppProvider } from "../domain/providers/app.provider";
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";
import { FileUploadDto } from "../domain/entities/file-upload.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppProvider) {}

  @UseInterceptors(FileInterceptor("file"))
  @Post("upload-your-file")
  @ApiOperation({ summary: "Post a file" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Your File",
    type: FileUploadDto,
  })
  public upload(@UploadedFile() file) {
    return {
      file: file.buffer.toString(),
    };
  }

  @Get()
  @ApiOperation({ summary: "Get example data" })
  public sayHello() {
    return this.appService.getHello();
  }
}
