import { CONTENT_TYPES_ACCEPTED } from "../../configuration/app.constants";
import { DocumentFormat } from "../domain/entities/document/document";

const documentFormatMap: Record<string, DocumentFormat> = {
  [CONTENT_TYPES_ACCEPTED.TEXT_PLAIN]: DocumentFormat.TEXT,
  [CONTENT_TYPES_ACCEPTED.JSON]: DocumentFormat.JSON,
  [CONTENT_TYPES_ACCEPTED.XML]: DocumentFormat.XML,
};

const mapContentTypeToDocumentFormat = (header: string): DocumentFormat | undefined => {
  return documentFormatMap[header];
};

const mapNewDocumentFormatToDocumentFormat = (
  header: string | string[],
): DocumentFormat | undefined => {
  return DocumentFormat[header.toString()];
};

export { mapContentTypeToDocumentFormat, mapNewDocumentFormatToDocumentFormat };
