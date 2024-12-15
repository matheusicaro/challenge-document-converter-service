import { Controller, Post, Inject, Request, Response } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiHeaders, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response as ServerResponse } from "express";

import { ProviderTokens } from "../../configuration/dependency-registries/tokens";
import { DocumentPipelineProviderPort } from "../domain/providers/document-pipeline/document-pipeline.provider.port";
import { DocumentsRoute } from "./docs/documents.controller.doc";
import {
  mapContentTypeToDocumentFormat,
  mapDocumentFormatToHeaderMap,
  mapNewDocumentFormatToDocumentFormat,
} from "../lib/document-format-mapper";
import { CONTENT_TYPE, HEADERS } from "../../configuration/app.constants";
import { SeverRequest } from "../../configuration/middlewares/raw-body.middleware";
import { InvalidRequestError, RestControllerBase } from "matheusicaro-node-framework";

@Controller()
export class DocumentsController extends RestControllerBase {
  constructor(
    @Inject(ProviderTokens.DocumentConverterProvider)
    private documentConverterProvider: DocumentPipelineProviderPort,
  ) {
    super();
  }

  @Post("documents/converter")
  @ApiOperation(DocumentsRoute.CONVERTER.operation)
  @ApiConsumes(...DocumentsRoute.CONVERTER.consumes)
  @ApiHeaders(DocumentsRoute.CONVERTER.header)
  @ApiBody(DocumentsRoute.CONVERTER.body)
  @ApiResponse(DocumentsRoute.CONVERTER.response)
  public async converter(@Request() request: SeverRequest, @Response() response: ServerResponse) {
    try {
      const documentFormat = mapContentTypeToDocumentFormat(request.headers[CONTENT_TYPE]);

      if (!documentFormat) {
        throw new InvalidRequestError(`${CONTENT_TYPE} should be informed in the request`);
      }

      const newDocumentFormat = mapNewDocumentFormatToDocumentFormat(
        request.headers[HEADERS.NEW_DOCUMENT_FORMAT],
      );

      if (!newDocumentFormat) {
        throw new InvalidRequestError(
          `${HEADERS.NEW_DOCUMENT_FORMAT} should be informed in the request`,
        );
      }

      const { document } = await this.documentConverterProvider.convert({
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

      const contentTypeHeaderValue = mapDocumentFormatToHeaderMap(document.format);

      return response.type(contentTypeHeaderValue).status(200).json(document.content);
    } catch (error) {
      /**
       * This handle is a method available from RestControllerBase from my lib
       * ref: https://github.com/matheusicaro/matheusicaro-node-framework/tree/master?tab=readme-ov-file#controller-base
       *
       * @matheusicaro
       */
      this.handleErrorThenRespondFailedOnRequest({
        error,
        response,
        setStatusCodeByErrorType: true,
      });
    }
  }
}
