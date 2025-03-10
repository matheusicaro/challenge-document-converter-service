import { InvalidArgumentError } from "matheusicaro-node-framework";

import { StringDocumentConverterProviderAdapter } from "../../../../../../src/application/domain/providers/document-converters/string-document-converter.provider.adapter";
import { entryFileFactory } from "../../../../../factories/entry-file.factory";
import { DocumentFormat } from "../../../../../../src/application/domain/entities/document/document";

describe("StringDocumentConverterProviderAdapter", () => {
  const segmentSeparator = "~";
  const elementSeparator = "*";

  let converter: StringDocumentConverterProviderAdapter;

  beforeEach(() => {
    converter = new StringDocumentConverterProviderAdapter(segmentSeparator, elementSeparator);
  });

  describe("validate", () => {
    describe("when not to throw an error", () => {
      it("should not throw error when valid entry file is passed", () => {
        const invalidDocument = entryFileFactory.build({
          content: "any string content",
          currentFormat: DocumentFormat.TEXT,
        });

        expect(() => converter.validate(invalidDocument)).not.toThrow();
      });
    });

    describe("when do throw an error", () => {
      it("Invalid separators", () => {
        const invalidDocument = entryFileFactory.build({
          currentFormat: DocumentFormat.TEXT,
        });

        const invalidSegmentConverter = new StringDocumentConverterProviderAdapter(
          "",
          "element_separator",
        );

        expect(() => invalidSegmentConverter.validate(invalidDocument)).toThrow(
          new InvalidArgumentError("Invalid separators", {
            userMessage:
              "The separators for segment and element are required for string document and were not informed, please check your request and try again",
          }),
        );
      });

      it("should throw error when a invalid element separator was passed to the converter", () => {
        const invalidDocument = entryFileFactory.build({ currentFormat: DocumentFormat.TEXT });

        const invalidSegmentConverter = new StringDocumentConverterProviderAdapter(
          "segment_separator",
          "",
        );

        expect(() => invalidSegmentConverter.validate(invalidDocument)).toThrow(
          new InvalidArgumentError("Invalid separators", {
            userMessage:
              "The separators for segment and element are required for string document and were not informed, please check your request and try again",
          }),
        );
      });

      it("should throw error when segment and element separator are equals", () => {
        const invalidDocument = entryFileFactory.build({ currentFormat: DocumentFormat.TEXT });

        const invalidSegmentConverter = new StringDocumentConverterProviderAdapter(
          "separator",
          "separator",
        );

        expect(() => invalidSegmentConverter.validate(invalidDocument)).toThrow(
          new InvalidArgumentError("Segment and element separators can not be equals"),
        );
      });
    });
  });

  describe("consume", () => {
    it("should return a domain document correctly when consume string document", () => {
      const document = `
        ProductID*4*8*15*16*23~
        ProductID*a*b*c*d*e~
        AddressID*42*108*3*14~
        ContactID*59*26~
      `;

      const result = converter.consume(document);

      expect(result).toEqual({
        separators: { bySegment: "~", byElement: "*" },
        content: [
          { name: "ProductID", elements: ["4", "8", "15", "16", "23"] },
          { name: "ProductID", elements: ["a", "b", "c", "d", "e"] },
          { name: "AddressID", elements: ["42", "108", "3", "14"] },
          { name: "ContactID", elements: ["59", "26"] },
        ],
      });
    });

    it("should return the content correctly when the string has multiple separators in sequency", () => {
      const document = `
        ProductID*****4*8******15**16*23~
        ProductID***a*b*****c***d****e~
        AddressID*42****108*3*14~
        ContactID*************59**26~
      `;

      const result = converter.consume(document);

      expect(result).toEqual({
        separators: {
          bySegment: segmentSeparator,
          byElement: elementSeparator,
        },
        content: [
          {
            name: "ProductID",
            elements: ["4", "8", "15", "16", "23"],
          },
          {
            name: "ProductID",
            elements: ["a", "b", "c", "d", "e"],
          },
          {
            name: "AddressID",
            elements: ["42", "108", "3", "14"],
          },
          {
            name: "ContactID",
            elements: ["59", "26"],
          },
        ],
      });
    });
  });

  describe("convert", () => {
    const defaultDomainDocumentContent = [
      {
        name: "ProductID",
        elements: ["4", "8", "15", "16", "23"],
      },
      {
        name: "ProductID",
        elements: ["a", "b", "c", "d", "e"],
      },
      {
        name: "AddressID",
        elements: ["42", "108", "3", "14"],
      },
      {
        name: "ContactID",
        elements: ["59", "26"],
      },
    ];

    it("should return a string document correctly when consume a domain document", () => {
      const segmentSeparator = "-";
      const elementSeparator = "|";

      const stringDocument = new StringDocumentConverterProviderAdapter(
        segmentSeparator,
        elementSeparator,
      ).convert({
        separators: {
          bySegment: segmentSeparator,
          byElement: elementSeparator,
        },
        content: [...defaultDomainDocumentContent],
      });

      expect(stringDocument).toEqual({
        content:
          "ProductID|4|8|15|16|23-ProductID|a|b|c|d|e-AddressID|42|108|3|14-ContactID|59|26-",

        format: "TEXT",

        separators: {
          bySegment: segmentSeparator,
          byElement: elementSeparator,
        },
      });
    });

    it("should return the content correctly when separators are more than a single char", () => {
      const segmentSeparator = "<end>\n";
      const elementSeparator = ", value:";

      const stringDocument = new StringDocumentConverterProviderAdapter(
        segmentSeparator,
        elementSeparator,
      ).convert({
        separators: {
          bySegment: segmentSeparator,
          byElement: elementSeparator,
        },
        content: [...defaultDomainDocumentContent],
      });

      expect(stringDocument).toEqual({
        content: `ProductID, value:4, value:8, value:15, value:16, value:23<end>\nProductID, value:a, value:b, value:c, value:d, value:e<end>\nAddressID, value:42, value:108, value:3, value:14<end>\nContactID, value:59, value:26<end>\n`,

        format: "TEXT",

        separators: {
          bySegment: segmentSeparator,
          byElement: elementSeparator,
        },
      });
    });
  });
});
