import { DocumentFile, DocumentFormat } from "./document";

export interface XmlDocument extends DocumentFile {
  format: DocumentFormat.XML;

  content: string;
}
