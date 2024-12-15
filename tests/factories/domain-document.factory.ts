import { DomainFile } from "../../src/application/domain/entities/domain-file";

const Factory = (override?: Partial<DomainFile>): DomainFile => {
  return {
    separators: {
      bySegment: override?.separators?.bySegment ?? "~",
      byElement: override?.separators?.bySegment ?? "*",
    },
    content: override?.content || [
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
  };
};

const domainDocumentFactory = { build: Factory };

export { domainDocumentFactory };
