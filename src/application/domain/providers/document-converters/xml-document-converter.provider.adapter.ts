import { toJson } from "xml2json";
import { concat } from "lodash";

import { DomainFile, Segment } from "../../entities/domain-file";
import { XmlDocument } from "../../entities/document/xml-document";
import { Converter } from "../../../lib/converter";
import { EntryFile } from "../../entities/entry-file";
import { DocumentConverterProviderPort } from "./document-converter.provider.port";
import { DocumentFormat } from "../../entities/document/document";
import { removeBlankSpaces } from "../../../lib/string-helpers.lib";
import { InvalidArgumentError } from "matheusicaro-node-framework";

class XmlDocumentConverterProviderAdapter
  extends Converter<XmlDocument>
  implements DocumentConverterProviderPort
{
  protected documentFormat: DocumentFormat.XML = DocumentFormat.XML;

  constructor() {
    super();

    console.log(`instance of ${XmlDocumentConverterProviderAdapter.name}`);
  }

  protected internalValidation(xmlAsEntryFile: EntryFile): void {
    if (this.isValidXml(xmlAsEntryFile.content)) {
      throw new InvalidArgumentError(
        "The separators for segment and element are required to convert to a string document",
      );
    }
  }

  public consume(xmlAsString: string): DomainFile {
    const domainDocument: DomainFile = {
      separators: {
        bySegment: "\n",
        byElement: "\n",
      },
      content: [],
    };

    const json = toJson(xmlAsString, { sanitize: true, object: true });

    const jsonContent = json["root"] ? json["root"] : json;

    for (const entry of Object.entries(jsonContent)) {
      const segmentName = entry[0];
      const unknownContent = entry[1];

      const segments = this.getSegments(segmentName, unknownContent);

      domainDocument.content = concat(domainDocument.content, segments);
    }

    return domainDocument;
  }

  public convert(domainFile: DomainFile): XmlDocument {
    const segments: string[] = [];

    for (const segment of domainFile.content) {
      const segmentName = segment.name;

      const elements = this.getElementsInXmlTags(segmentName, segment.elements);

      segments.push(`
        <${segmentName}>
          ${elements.join("")}
        </${segmentName}>
      `);
    }

    const xml = removeBlankSpaces(`
      <?xml version="1.0" encoding="UTF-8" ?>
      <root>
        ${segments.join("")}
      </root>
    `);

    return {
      format: this.documentFormat,
      content: xml,
    };
  }

  /**
   * This function returns the XML segments
   * A segment content might be a list or a single object when
   * a XML is converted from xml2json.
   *
   * @param segmentName: segment name
   * @param segmentUnknownContent: object or a list of objects
   * @returns {[ name: segmentName, elements: [..values] ]}
   */
  private getSegments(
    segmentName: string,
    segmentUnknownContent: Record<string, string> | Array<Record<string, string>>,
  ): Segment[] {
    const contentAsList = Array.isArray(segmentUnknownContent)
      ? segmentUnknownContent
      : [segmentUnknownContent];

    const segments: Segment[] = [];

    for (const subSegment of contentAsList) {
      segments.push({
        name: segmentName,
        elements: Object.values(subSegment),
      });
    }

    return segments;
  }

  /**
   * This function convert elements of a segment in a XML structure
   *
   * @param segmentName: segment name, example - "seg"
   * @param elements: list of string, example - [ "value_A", "value_B", ...n]
   * @returns [
   *      "<seg1>value_A<seg1>",
   *      "<seg2>value_B<seg2>",
   *      ...n
   *    ]
   */
  private getElementsInXmlTags(segmentName: string, elements: string[]): string[] {
    const segments: string[] = [];

    elements.forEach((element, index) => {
      const segmentTag = `${segmentName}${index + 1}`;

      segments.push(`
        <${segmentTag}>
          ${element}
        </${segmentTag}>`);
    });

    return segments;
  }

  private isValidXml(xmlAsString: string): boolean {
    try {
      const xmlAsObject = toJson(xmlAsString);

      return Object.entries(xmlAsObject).length > 1;
      return;
    } catch {
      return false;
    }
  }
}

export { XmlDocumentConverterProviderAdapter };
