import { DocumentFile } from "../../entities/document/document";
import { DomainFile } from "../../entities/domain-file";
import { EntryFile } from "../../entities/entry-file";

export interface DocumentConverterProviderPort {
  /**
   * This method will validate the entry document if its valid or invalid to be consumed
   *
   * @param entryFile
   */
  validate(entryFile: EntryFile): void;

  /**
   * This method will consume the document buffer as string to the domain logic
   *
   * @param fileContentAsString: document content which is the same format of this class but as string to be consumed to a domain file
   */
  consume(fileContentAsString: string): DomainFile;

  /**
   * This method will convert the domain file to the document converted which will be returned to the client
   *
   * @param domainFile: document known in the business logic
   */
  convert(domainFile: DomainFile): DocumentFile;
}
