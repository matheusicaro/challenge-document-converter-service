import { DocumentFormat } from "./document/document";

export interface EntryFile {
  content: string;
  currentFormat: DocumentFormat;
  newFormat: DocumentFormat;
}
