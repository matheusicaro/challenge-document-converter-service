import { Controller, Post, Inject, Request, Response } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiHeaders, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response as ServerResponse } from "express";

import { ProviderTokens } from "../../configuration/dependency-registries/tokens";
import { DocumentPipelineProviderPort } from "../domain/providers/document-pipeline/document-pipeline.provider.port";
import { DocumentsRoute } from "./docs/documents.controller.doc";
import {
  mapContentTypeToDocumentFormat,
  mapNewDocumentFormatToDocumentFormat,
} from "../lib/document-format-mapper";
import { CONTENT_TYPE, HEADERS } from "../../configuration/app.constants";
import { SeverRequest } from "../../configuration/middlewares/raw-body.middleware";

@Controller()
export class DocumentsController {
  constructor(
    @Inject(ProviderTokens.DocumentConverterProvider)
    private documentConverterProvider: DocumentPipelineProviderPort,
  ) {}

  @Post("documents/converter")
  @ApiOperation(DocumentsRoute.CONVERTER.operation)
  @ApiConsumes(...DocumentsRoute.CONVERTER.consumes)
  @ApiHeaders(DocumentsRoute.CONVERTER.header)
  @ApiBody(DocumentsRoute.CONVERTER.body)
  @ApiResponse(DocumentsRoute.CONVERTER.response)
  public async converter(@Request() request: SeverRequest, @Response() response: ServerResponse) {
    try {
      const documentFormat = mapContentTypeToDocumentFormat(request.headers[CONTENT_TYPE]);
      const newDocumentFormat = mapNewDocumentFormatToDocumentFormat(
        request.headers[HEADERS.NEW_DOCUMENT_FORMAT],
      );

      if (!documentFormat || !newDocumentFormat) {
        // TODO refactoring here
        console.log(`invalid args: ${documentFormat} => ${newDocumentFormat}`, request.headers);
        throw new Error("invalid args");
      }

      const result = await this.documentConverterProvider.convert({
        entryFile: {
          content: request.body.toString(),
          currentFormat: documentFormat,
          newFormat: newDocumentFormat,
        },
        separators: {
          bySegment: request.headers[HEADERS.SEGMENT_SEPARATOR]?.toString(),
          byElement: request.headers[HEADERS.ELEMENT_SEPARATOR]?.toString(),
        },
      });

      return result;
    } catch (error) {
      console.log(response);
      console.log(`ERROR=====> ${error.message}`, error);

      return response.status(200).json({ message: "Something went wrong" });
    }
  }
}
