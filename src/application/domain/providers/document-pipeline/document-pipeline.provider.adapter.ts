import { DocumentFile, DocumentFormat } from "../../entities/document/document";
import { Converter } from "../../../lib/converter";
import { JsonDocumentConverterProviderAdapter } from "../document-converters/json-document-converter.provider.adapter";
import { StringDocumentConverterProviderAdapter } from "../document-converters/string-document-converter.provider.adapter";
import { XmlDocumentConverterProviderAdapter } from "../document-converters/xml-document-converter.provider.adapter";
import {
  ConvertInput,
  ConvertResponse,
  ConvertSeparators,
  DocumentPipelineProviderPort,
} from "./document-pipeline.provider.port";
import { InvalidStateError } from "matheusicaro-node-framework";

class DocumentPipelineProviderAdapter implements DocumentPipelineProviderPort {
  constructor() {
    console.log(`instance of ${DocumentPipelineProviderAdapter.name}`);
  }

  public convert(input: ConvertInput): ConvertResponse {
    const { currentFormat, newFormat } = input.entryFile;

    const converters = this.getConverters(currentFormat, newFormat, input.separators);
    const currentDocConverter = converters.ofCurrentDocumentFormat;
    const newDocConverter = converters.ofNewDocumentFormat;

    currentDocConverter.validate(input.entryFile);

    const domainDocument = currentDocConverter.consume(input.entryFile.content);

    const newDocument = newDocConverter.convert(domainDocument);

    return {
      document: newDocument,
    };
  }

  private getConverters(
    currentDocumentFormat: DocumentFormat,
    newDocumentFormat: DocumentFormat,
    separators: ConvertSeparators,
  ): {
    ofCurrentDocumentFormat: Converter<DocumentFile>;
    ofNewDocumentFormat: Converter<DocumentFile>;
  } {
    return {
      ofCurrentDocumentFormat: this.buildConverter(currentDocumentFormat, separators),
      ofNewDocumentFormat: this.buildConverter(newDocumentFormat, separators),
    };
  }

  private buildConverter(
    documentFormat: DocumentFormat,
    separators: ConvertSeparators,
  ): Converter<DocumentFile> {
    switch (documentFormat) {
      case DocumentFormat.TEXT:
        return new StringDocumentConverterProviderAdapter(
          separators.bySegment,
          separators.byElement,
        );

      case DocumentFormat.XML:
        return new XmlDocumentConverterProviderAdapter();

      case DocumentFormat.JSON:
        return new JsonDocumentConverterProviderAdapter();

      default:
        throw new InvalidStateError(
          `Not found a converter for ${documentFormat} format. Investigation required`,
        );
    }
  }
}

export { DocumentPipelineProviderAdapter };
