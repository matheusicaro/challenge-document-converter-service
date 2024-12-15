import { XmlDocumentConverterProviderAdapter } from "../../../../../../src/application/domain/providers/document-converters/xml-document-converter.provider.adapter";
import { domainDocumentFactory } from "../../../../../factories/domain-document.factory";
import { entryDocumentFileFactory } from "../../../../../factories/entry-document-file.factory";

/**
 *
 * TODO: Complete the unit tests in this ticket: https://github.com/matheusicaro/challenge-document-converter-service/issues/11
 *
 * @matheusicaro
 **/
describe("XmlDocumentConverterProviderAdapter", () => {
  let converter: XmlDocumentConverterProviderAdapter;

  beforeEach(() => {
    converter = new XmlDocumentConverterProviderAdapter();
  });

  describe("validate", () => {
    describe("when not to throw an error", () => {
      it("should not throw error when valid entry file is passed", () => {
        expect("TODO").toEqual("TODO");
      });
    });
  });

  describe("consume", () => {
    it("should return a domain document correctly when consume a xml document", () => {
      const document = entryDocumentFileFactory.buildXmlDocument();

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

  describe("converter", () => {
    it("should return a xml document correctly when consume a domain document", () => {
      const domainDocument = domainDocumentFactory.build();

      const result = converter.convert(domainDocument);

      expect(result).toEqual({
        content:
          '<?xmlversion="1.0"encoding="UTF-8"?><root><ProductID><ProductID1>4</ProductID1><ProductID2>8</ProductID2><ProductID3>15</ProductID3><ProductID4>16</ProductID4><ProductID5>23</ProductID5></ProductID><ProductID><ProductID1>a</ProductID1><ProductID2>b</ProductID2><ProductID3>c</ProductID3><ProductID4>d</ProductID4><ProductID5>e</ProductID5></ProductID><AddressID><AddressID1>42</AddressID1><AddressID2>108</AddressID2><AddressID3>3</AddressID3><AddressID4>14</AddressID4></AddressID><ContactID><ContactID1>59</ContactID1><ContactID2>26</ContactID2></ContactID></root>',
        format: "XML",
      });
    });
  });
});
