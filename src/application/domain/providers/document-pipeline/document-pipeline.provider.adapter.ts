import { DocumentFile, DocumentFormat } from "../../entities/document/document";
import { Converter } from "../../../lib/converter";
import { JsonDocumentConverterProviderAdapter } from "../document-converters/json-document-converter.provider.adapter";
import { StringDocumentConverterProviderAdapter } from "../document-converters/string-document-converter.provider.adapter";
import { XmlDocumentConverterProviderAdapter } from "../document-converters/xml-document-converter.provider.adapter";
import {
  ConvertInput,
  ConvertResponse,
  DocumentPipelineProviderPort,
} from "./document-pipeline.provider.port";

class DocumentPipelineProviderAdapter implements DocumentPipelineProviderPort {
  constructor() {
    console.log(`instance of ${DocumentPipelineProviderAdapter.name}`);
  }

  public convert(input: ConvertInput): ConvertResponse {
    const converter = this.getConverter(input.entryFile.newFormat);

    converter.validate(input.entryFile);

    const domainDocument = converter.consume(input.entryFile.content);

    const newDocument = converter.convert(domainDocument);

    return {
      document: newDocument,
    };
  }

  private getConverter(documentFormat: DocumentFormat): Converter<DocumentFile> {
    switch (documentFormat) {
      case DocumentFormat.TEXT:
        return new StringDocumentConverterProviderAdapter();

      case DocumentFormat.XML:
        return new XmlDocumentConverterProviderAdapter();

      case DocumentFormat.JSON:
        return new JsonDocumentConverterProviderAdapter();

      default:
        // TODO add a better error handler here
        throw new Error("INVALID ARGUMENT");
    }
  }
}

export { DocumentPipelineProviderAdapter };
