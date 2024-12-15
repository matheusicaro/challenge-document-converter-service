import { DocumentFormat } from "../../src/application/domain/entities/document/document";
import { EntryFile } from "../../src/application/domain/entities/entry-file";

const Factory = (override?: Partial<EntryFile>): EntryFile => {
  return {
    newFormat: override?.newFormat || DocumentFormat.JSON,
    currentFormat: override?.currentFormat || DocumentFormat.TEXT,
    content:
      override?.content !== undefined
        ? override?.content
        : `ProductID*4*8*15*16*23~
        ProductID*a*b*c*d*e~
        AddressID*42*108*3*14~
        ContactID*59*26~
      `,
  };
};

const entryFileFactory = { build: Factory };

export { entryFileFactory };
