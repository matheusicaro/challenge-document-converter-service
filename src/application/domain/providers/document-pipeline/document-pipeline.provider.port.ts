import { DocumentFile } from "../../entities/document/document";
import { EntryFile } from "../../entities/entry-file";

export type ConvertSeparators = {
  bySegment: string;
  byElement: string;
};

export interface ConvertInput {
  entryFile: EntryFile;
  separators: ConvertSeparators;
}

export interface ConvertResponse {
  document: DocumentFile;
}

export interface DocumentPipelineProviderPort {
  convert(input: ConvertInput): ConvertResponse;
}
