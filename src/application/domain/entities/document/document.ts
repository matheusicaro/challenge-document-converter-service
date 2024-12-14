export enum DocumentFormat {
  XML = "XML",
  JSON = "JSON",
  TEXT = "TEXT",
}

export abstract class DocumentFile {
  format: DocumentFormat;

  content: unknown;
}
