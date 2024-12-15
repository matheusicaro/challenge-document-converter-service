import { DocumentFile, DocumentFormat } from "./document";

export type JsonDocumentContent = Record<string, Array<Record<string, string>>>;

export interface JsonDocument extends DocumentFile {
  format: DocumentFormat.JSON;

  content: JsonDocumentContent;
}
