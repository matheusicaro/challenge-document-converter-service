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
  /**
   * This converter is the pipeline logic to convert a document as entry file to a new document defined to the new format input
   * The pipeline does:
   *  1. get the current document converter from the current format
   *  2. get the new document converter from the current format
   *  3. the current document converter validate if the entry file is valid to be consumed to a domain document
   *  4. the current document converter consume the entry file content => returns => domain document
   *  5. the new document converter converts the domain document to the new document requested
   *  6. the new document is returned
   *
   * @matheusicaro
   */
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

  /**
   * Returns the due converter from the document type
   *
   * @matheusicaro
   */
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
