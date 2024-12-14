import { DocumentFile } from "../../entities/document/document";
import { DomainFile } from "../../entities/domain-file";
import { EntryFile } from "../../entities/entry-file";

export interface DocumentConverterProviderPort {
  validate(entryFile: EntryFile): void;

  consume(fileContentAsString: string): DomainFile;

  convert(input: DomainFile): DocumentFile;
}
