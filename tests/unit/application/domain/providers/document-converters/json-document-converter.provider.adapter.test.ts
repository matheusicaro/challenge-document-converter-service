import { JsonDocumentConverterProviderAdapter } from "../../../../../../src/application/domain/providers/document-converters/json-document-converter.provider.adapter";
import { domainDocumentFactory } from "../../../../../factories/domain-document.factory";
import { entryDocumentFileFactory } from "../../../../../factories/entry-document-file.factory";

describe("JsonDocumentConverterProviderAdapter", () => {
  let converter: JsonDocumentConverterProviderAdapter;

  beforeEach(() => {
    converter = new JsonDocumentConverterProviderAdapter();
  });

  describe("consume", () => {
    it("should return a domain document correctly when consume a json document", () => {
      const document = entryDocumentFileFactory.buildJsonDocument();

      const result = converter.consume(document);

      expect(result).toEqual({
        separators: { bySegment: "\n", byElement: "\n" },
        content: [
          { name: "ProductID", elements: ["4", "8", "15", "16", "23"] },

          { name: "ProductID", elements: ["a", "b", "c", "d", "e"] },

          { name: "AddressID", elements: ["42", "108", "3", "14"] },

          { name: "ContactID", elements: ["59", "26"] },
        ],
      });
    });
  });

  describe("convert", () => {
    it("should return a json document correctly when consume a domain document", () => {
      const document = domainDocumentFactory.build({
        content: [
          { name: "ProductID", elements: ["4", "8", "15", "16", "23"] },

          { name: "ProductID", elements: ["a", "b", "c", "d", "e"] },

          { name: "AddressID", elements: ["42", "108", "3", "14"] },

          { name: "ContactID", elements: ["59", "26"] },
        ],
      });

      const result = converter.convert(document);

      expect(result).toEqual({
        format: "JSON",
        content: {
          ProductID: [
            {
              ProductID1: "4",
              ProductID2: "8",
              ProductID3: "15",
              ProductID4: "16",
              ProductID5: "23",
            },
            {
              ProductID1: "a",
              ProductID2: "b",
              ProductID3: "c",
              ProductID4: "d",
              ProductID5: "e",
            },
          ],
          AddressID: [
            {
              AddressID1: "42",
              AddressID2: "108",
              AddressID3: "3",
              AddressID4: "14",
            },
          ],
          ContactID: [
            {
              ContactID1: "59",
              ContactID2: "26",
            },
          ],
        },
      });
    });
  });
});
