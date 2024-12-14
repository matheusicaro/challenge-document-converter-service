import { Converter } from "../../../lib/converter";

import { DomainFile } from "../../entities/domain-file";
import { StringDocument } from "../../entities/document/string-document";
import { DocumentConverterProviderPort } from "./document-converter.provider.port";
import { EntryFile } from "../../entities/entry-file";

class StringDocumentConverterProviderAdapter
  extends Converter<StringDocument>
  implements DocumentConverterProviderPort
{
  constructor() {
    super();

    console.log(`instance of ${StringDocumentConverterProviderAdapter.name}`);
  }

  public validate(entryFile: EntryFile): void {
    throw new Error("it should be a Json file!!!!");
  }

  public consume(documentAsString: string): DomainFile {
    throw new Error("it should be a Json file!!!!");
  }

  public convert(domainDocument: DomainFile): StringDocument {
    throw new Error("it should be a Json file!!!!");
  }
}

export { StringDocumentConverterProviderAdapter };
