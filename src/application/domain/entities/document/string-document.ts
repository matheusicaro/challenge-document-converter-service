import { DocumentFile, DocumentFormat } from "./document";

export interface StringDocument extends DocumentFile {
  format: DocumentFormat.TEXT;

  content: string;

  separators: {
    bySegment: string;
    byElement: string;
  };
}
