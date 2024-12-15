import {
  isValidString,
  isValidStringForRegex,
  removeBlankSpaces,
  splitBySeparator,
} from "../../../lib/string-helpers.lib";
import { Converter } from "../../../lib/converter";

import { DomainFile } from "../../entities/domain-file";
import { StringDocument } from "../../entities/document/string-document";
import { DocumentConverterProviderPort } from "./document-converter.provider.port";
import { DocumentFormat } from "../../entities/document/document";
import { EntryFile } from "../../entities/entry-file";
import { InvalidArgumentError } from "matheusicaro-node-framework";

class StringDocumentConverterProviderAdapter
  extends Converter<StringDocument>
  implements DocumentConverterProviderPort
{
  private SUBSTITUTE_SEGMENT_SEPARATOR = "#_segment_#";
  private SUBSTITUTE_ELEMENT_SEPARATOR = "#_element_#";

  protected documentFormat: DocumentFormat.TEXT = DocumentFormat.TEXT;

  constructor(
    private segmentSeparator: string,
    private elementSeparator: string,
  ) {
    super();
  }

  protected specificDocumentValidation(_entryFile?: EntryFile): void {
    if (!isValidString(this.segmentSeparator) || !isValidString(this.elementSeparator)) {
      throw new InvalidArgumentError("Invalid separators", {
        userMessage:
          "The separators for segment and element are required for string document and were not informed, please check your request and try again",
      });
    }

    if (this.segmentSeparator === this.elementSeparator) {
      throw new InvalidArgumentError("Segment and element separators can not be equals");
    }
  }

  public consume(documentAsString: string): DomainFile {
    let documentSnapShot = `${documentAsString}`;

    documentSnapShot = removeBlankSpaces(documentSnapShot);

    const segments = this.getSegments(documentSnapShot);

    const domainDocument: DomainFile = {
      separators: {
        bySegment: this.segmentSeparator,
        byElement: this.elementSeparator,
      },
      content: [],
    };

    for (const segment of segments) {
      const { segmentName, elements } = this.getElements(segment);

      domainDocument.content.push({
        name: segmentName,
        elements,
      });
    }

    return domainDocument;
  }

  public convert(domainDocument: DomainFile): StringDocument {
    this.specificDocumentValidation();

    const segments: string[] = [];

    for (const segment of domainDocument.content) {
      const elementsAsString = segment.elements.join(this.elementSeparator);

      segments.push(
        `${segment.name}${this.elementSeparator}${elementsAsString}${this.segmentSeparator}`,
      );
    }

    return {
      content: segments.join(""),
      format: this.documentFormat,
      separators: domainDocument.separators,
    };
  }

  private getSegments(document: string): string[] {
    return this.splitDocumentBySeparator({
      document,
      separator: this.segmentSeparator,
      substituteSeparator: this.SUBSTITUTE_SEGMENT_SEPARATOR,
    });
  }

  private getElements(document: string): { segmentName: string; elements: string[] } {
    const elements = this.splitDocumentBySeparator({
      document,
      separator: this.elementSeparator,
      substituteSeparator: this.SUBSTITUTE_ELEMENT_SEPARATOR,
    });

    const segmentName = elements[0];

    elements.shift();

    return {
      segmentName,
      elements,
    };
  }

  private splitDocumentBySeparator(input: {
    document: string;
    separator: string;
    substituteSeparator: string;
  }): string[] {
    const useSubstituteSeparator = isValidStringForRegex(input.separator);

    if (useSubstituteSeparator) {
      const temporaryDocument = input.document.replaceAll(
        input.separator,
        input.substituteSeparator,
      );

      return splitBySeparator(temporaryDocument, input.substituteSeparator);
    } else {
      return splitBySeparator(input.document, input.separator);
    }
  }
}

export { StringDocumentConverterProviderAdapter };
