import { DomainFile } from "../domain/entities/domain-file";
import { DocumentFile, DocumentFormat } from "../domain/entities/document/document";
import { EntryFile } from "../domain/entities/entry-file";
import { InvalidArgumentError } from "matheusicaro-node-framework";
import { isValidString } from "./string-helpers.lib";

export abstract class Converter<DocumentConverted extends DocumentFile> {
  protected abstract documentFormat: DocumentFormat;

  public validate(entryFile: EntryFile): void {
    if (entryFile.currentFormat !== this.documentFormat) {
      throw new InvalidArgumentError(
        `Invalid format received. This converter can only convert documents to ${this.documentFormat}.`,
      );
    }

    if (!isValidString(entryFile.content)) {
      throw new InvalidArgumentError("The entry file content is empty or invalid as a text");
    }

    this.internalValidation(entryFile);
  }

  protected abstract internalValidation(entryFile: EntryFile): void;

  public abstract consume(fileContentAsString: string): DomainFile;

  public abstract convert(domainFile: DomainFile): DocumentConverted;
}
