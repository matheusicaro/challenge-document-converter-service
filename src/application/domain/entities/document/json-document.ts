import { DocumentFile, DocumentFormat } from "./document";

export interface JsonDocument extends DocumentFile {
  format: DocumentFormat.JSON;

  content: number;
}
