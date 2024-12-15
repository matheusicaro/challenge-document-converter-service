import { DomainFile } from "../../entities/domain-file";
import { JsonDocument } from "../../entities/document/json-document";
import { Converter } from "../../../lib/converter";
import { EntryFile } from "../../entities/entry-file";
import { DocumentConverterProviderPort } from "./document-converter.provider.port";
import { DocumentFormat } from "../../entities/document/document";

class JsonDocumentConverterProviderAdapter
  extends Converter<JsonDocument>
  implements DocumentConverterProviderPort
{
  protected documentFormat: DocumentFormat;

  constructor() {
    super();

    console.log(`instance of ${JsonDocumentConverterProviderAdapter.name}`);
  }

  protected internalValidation(input: EntryFile): void {
    throw new Error("Method not implemented.");
  }

  public consume(fileContentAsString: string): DomainFile {
    throw new Error("Method not implemented.");
  }

  public convert(input: DomainFile): JsonDocument {
    throw new Error("it should be a Json file!!!!");
  }
}

export { JsonDocumentConverterProviderAdapter };
