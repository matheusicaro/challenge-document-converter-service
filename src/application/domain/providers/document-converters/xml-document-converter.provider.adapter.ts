import { DomainFile } from "../../entities/domain-file";
import { XmlDocument } from "../../entities/document/xml-document";
import { Converter } from "../../../lib/converter";
import { EntryFile } from "../../entities/entry-file";
import { DocumentConverterProviderPort } from "./document-converter.provider.port";
import { DocumentFormat } from "../../entities/document/document";

class XmlDocumentConverterProviderAdapter
  extends Converter<XmlDocument>
  implements DocumentConverterProviderPort
{
  protected documentFormat: DocumentFormat;

  constructor() {
    super();

    console.log(`instance of ${XmlDocumentConverterProviderAdapter.name}`);
  }

  protected internalValidation(input: EntryFile): void {
    throw new Error("Method not implemented.");
  }

  public consume(fileContentAsString: string): DomainFile {
    throw new Error("Method not implemented.");
  }

  public convert(input: DomainFile): XmlDocument {
    throw new Error("it should be a Json file!!!!");
  }
}

export { XmlDocumentConverterProviderAdapter };
