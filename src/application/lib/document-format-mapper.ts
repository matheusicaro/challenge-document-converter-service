import { CONTENT_TYPES_ACCEPTED } from "../../configuration/app.constants";
import { DocumentFormat } from "../domain/entities/document/document";

const headerToDocumentFormatMap: Record<string, DocumentFormat> = {
  [CONTENT_TYPES_ACCEPTED.TEXT_PLAIN]: DocumentFormat.TEXT,
  [CONTENT_TYPES_ACCEPTED.JSON]: DocumentFormat.JSON,
  [CONTENT_TYPES_ACCEPTED.XML]: DocumentFormat.XML,
};

const documentFormatToHeaderMap: Record<DocumentFormat, string> = {
  [DocumentFormat.TEXT]: CONTENT_TYPES_ACCEPTED.TEXT_PLAIN,
  [DocumentFormat.JSON]: CONTENT_TYPES_ACCEPTED.JSON,
  [DocumentFormat.XML]: CONTENT_TYPES_ACCEPTED.XML,
};

const mapContentTypeToDocumentFormat = (header: string): DocumentFormat | undefined => {
  return headerToDocumentFormatMap[header];
};

const mapDocumentFormatToHeaderMap = (documentFormat: DocumentFormat): string | undefined => {
  return documentFormatToHeaderMap[documentFormat];
};

const mapNewDocumentFormatToDocumentFormat = (
  header: string | string[],
): DocumentFormat | undefined => {
  return DocumentFormat[header.toString()];
};

export {
  mapContentTypeToDocumentFormat,
  mapDocumentFormatToHeaderMap,
  mapNewDocumentFormatToDocumentFormat,
};
