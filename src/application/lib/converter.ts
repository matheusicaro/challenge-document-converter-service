import { DomainFile } from "../domain/entities/domain-file";
import { DocumentFile } from "../domain/entities/document/document";
import { EntryFile } from "../domain/entities/entry-file";

export abstract class Converter<DocumentConverted extends DocumentFile> {
  public abstract validate(entryFile: EntryFile): void;

  public abstract consume(fileContentAsString: string): DomainFile;

  public abstract convert(input: DomainFile): DocumentConverted;
}
