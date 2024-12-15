const TextFormatFactory = (): string => {
  return `ProductID*4*8*15*16*23~
        ProductID*a*b*c*d*e~
        AddressID*42*108*3*14~
        ContactID*59*26~
      `;
};

const jsonFormatFactory = (): string => {
  return JSON.stringify({
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
  });
};

/**
 * This factory is to return the entry file content for the follow formats:
 *  - text
 *  - json
 */
const entryFileStringFactory = {
  buildTextFormat: TextFormatFactory,
  buildJsonFormat: jsonFormatFactory,
};

export { entryFileStringFactory };
