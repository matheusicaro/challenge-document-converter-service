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

    this.specificDocumentValidation(entryFile);
  }

  /**
   * This method must be implemented for specific validations of the document subject to converts extending this clause.
   * This method will be called last in the validate method.
   *
   * @param entryFile
   */
  protected abstract specificDocumentValidation(entryFile: EntryFile): void;

  /**
   * This method will consume the document buffer as string to the domain logic
   *
   * @param fileContentAsString: document content which is the same format of this class but as string to be consumed to a domain file
   */
  public abstract consume(fileContentAsString: string): DomainFile;

  /**
   * This method will convert the domain file to the document converted which will be returned to the client
   *
   * @param domainFile: document known in the business logic
   */
  public abstract convert(domainFile: DomainFile): DocumentConverted;
}
