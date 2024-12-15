import { InvalidArgumentError } from "matheusicaro-node-framework";
import { entryFileFactory } from "../../../factories/entry-file.factory";
import { DocumentFormat } from "../../../../src/application/domain/entities/document/document";
import { XmlDocument } from "../../../../src/application/domain/entities/document/xml-document";
import { Converter } from "../../../../src/application/lib/converter";
import { DomainFile } from "../../../../src/application/domain/entities/domain-file";
import { EntryFile } from "../../../../src/application/domain/entities/entry-file";

const mockedFunction = { runner: jest.fn() };

class ExampleClass extends Converter<XmlDocument> {
  protected documentFormat: DocumentFormat = DocumentFormat.XML;

  protected internalValidation(entryFile: EntryFile): void {
    mockedFunction.runner(entryFile);
  }

  public consume(_fileContentAsString: string): DomainFile {
    throw new Error("Method not implemented.");
  }
  public convert(_input: DomainFile): XmlDocument {
    throw new Error("Method not implemented.");
  }
}

describe("Converter", () => {
  const implementationClass = new ExampleClass();

  const defaultValidEntryFile = entryFileFactory.build({
    currentFormat: DocumentFormat.XML,
  });

  describe("validate", () => {
    /**
     * This unit tests will guarantee that the internal validation method will run for who extends from Converter
     *
     * @matheusicaro
     */
    it("should call the abstract internalValidation when the first validation pass", () => {
      implementationClass.validate(defaultValidEntryFile);

      expect(mockedFunction.runner).toHaveBeenCalledTimes(1);
      expect(mockedFunction.runner).toHaveBeenCalledWith(defaultValidEntryFile);
    });

    it("should throw error when a invalid entry file content is passed", () => {
      const invalidDocument = {
        ...defaultValidEntryFile,
        content: "",
      };

      expect(() => implementationClass.validate(invalidDocument)).toThrow(
        new InvalidArgumentError("The entry file content is empty or invalid as a text"),
      );
    });

    describe("invalid new format", () => {
      const invalidFormats = Object.values(DocumentFormat).filter(
        (format) => format !== defaultValidEntryFile.currentFormat,
      );

      it.each(invalidFormats)("should throw error when %s new format is passed", (format) => {
        const invalidDocument = entryFileFactory.build({ newFormat: format });

        expect(() => implementationClass.validate(invalidDocument)).toThrow(
          new InvalidArgumentError(
            "Invalid format received. This converter can only convert documents to XML.",
          ),
        );
      });
    });
  });
});
