import { DocumentPipelineProviderAdapter } from "../../../../../../src/application/domain/providers/document-pipeline/document-pipeline.provider.adapter";

/**
 *
 * TODO: Complete the unit tests in this ticket: https://github.com/matheusicaro/challenge-document-converter-service/issues/11
 *
 * @matheusicaro
 **/
describe("DocumentPipelineProviderAdapter", () => {
  let provider: DocumentPipelineProviderAdapter;

  beforeEach(() => {
    provider = new DocumentPipelineProviderAdapter();
  });

  describe("convert", () => {
    it("should call currentDocConverter.validate correctly", () => {
      expect("TODO").toEqual("TODO");
    });

    it("should call currentDocConverter.consume correctly", () => {
      expect("TODO").toEqual("TODO");
    });

    it("should call newDocConverter.convert correctly", () => {
      expect("TODO").toEqual("TODO");
    });

    it("should return the new document converted correctly", () => {
      expect("TODO").toEqual("TODO");
    });

    it("should throw error when the current document converter is not found", () => {
      expect("TODO").toEqual("TODO");
    });

    it("should throw error when the new document converter is not found", () => {
      expect("TODO").toEqual("TODO");
    });
  });
});
