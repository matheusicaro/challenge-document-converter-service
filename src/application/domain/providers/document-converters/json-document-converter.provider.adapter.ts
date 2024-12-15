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
  protected documentFormat: DocumentFormat.JSON = DocumentFormat.JSON;

  constructor() {
    super();

    console.log(`instance of ${JsonDocumentConverterProviderAdapter.name}`);
  }

  protected internalValidation(entryFile: EntryFile): void {
    // no validation found yet to entry files
  }

  public consume(fileContentAsString: string): DomainFile {
    const fileAsJson = this.jsonParse(fileContentAsString);

    const domainDocument: DomainFile = {
      separators: {
        bySegment: "\n",
        byElement: "\n",
      },
      content: [],
    };

    for (const segment of Object.entries(fileAsJson.content)) {
      const segmentName = segment[0];
      const subSegmentsList = segment[1];
      /**
       * subSegmentsList consists of segments+number as key with a list of string as the elements
       * ex: subSegmentsList =
       *   [
       *     { "segmentName1": [ ...elements ], "segmentName2": [ ...elements ]  }
       *     ...n
       *   ]
       *
       * ref: https://github.com/matheusicaro/challenge-document-converter-service?tab=readme-ov-file#entry-document-structure
       */
      for (const subSegment of subSegmentsList) {
        const elements = Object.values(subSegment);

        domainDocument.content.push({
          name: segmentName,
          elements,
        });
      }
    }

    return domainDocument;
  }

  public convert(domainFile: DomainFile): JsonDocument {
    const jsonObject = {};

    for (const segment of domainFile.content) {
      const segmentName = segment.name;

      const elements = this.getSegmentAndElementPairs(segmentName, segment.elements);

      if (jsonObject[segmentName]) {
        jsonObject[segmentName].push(elements);
      } else {
        jsonObject[segmentName] = [elements];
      }
    }

    return {
      format: this.documentFormat,
      content: jsonObject,
    };
  }

  private jsonParse(fileContentAsString: string): Pick<JsonDocument, "content"> {
    try {
      return { content: JSON.parse(fileContentAsString) };
    } catch (error) {
      // TODO: add handler/logger here track failed parses
      return { content: {} };
    }
  }

  /**
   * This function returns a pair of segment and element.
   *
   * @param segmentName: the name of the segment
   * @param elements: a list of elements as string
   *
   * @returns {
   *    "segmentName1" elements[0]
   *    "segmentName2" elements[1]
   *    ...n equivalent of elements.length
   * }
   *
   **/
  private getSegmentAndElementPairs(
    segmentName: string,
    elements: string[],
  ): Record<string, unknown> {
    const object = {};

    elements.forEach((element, index) => {
      object[`${segmentName}${index + 1}`] = element;
    });

    return object;
  }
}

export { JsonDocumentConverterProviderAdapter };
