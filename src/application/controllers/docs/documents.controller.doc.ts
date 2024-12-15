import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { HEADERS, CONTENT_TYPES_ACCEPTED } from "../../../configuration/app.constants";
import { DocumentFormat } from "../../domain/entities/document/document";
import { ApiDocumentation } from "./api-documentation";
import { XML_EXAMPLE_FILE } from "./example-files/xml-example-file";
import { JSON_EXAMPLE_FILE } from "./example-files/json-example-file";
import { STRING_EXAMPLE_FILE } from "./example-files/string-example-file";

const SeparatorSchema: SchemaObject = {
  // TODO: Schema is not being shown to swagger, investigation required.
  type: "string",
  description: "Inform a separator characters when the body is a text/plan.",
  examples: {
    body: "ProductID*4*8*15*16*23~ProductID*a*b*c*d*e~AddressID*42*108*3*14~ContactID*59*26~",
    "segment-separator": "~",
    "element-separator": "*",
  },
};

export const DocumentsConverterDoc: ApiDocumentation = {
  operation: { summary: "Convert a document format to a different format" },

  consumes: [
    CONTENT_TYPES_ACCEPTED.TEXT_PLAIN,
    CONTENT_TYPES_ACCEPTED.XML,
    CONTENT_TYPES_ACCEPTED.JSON,
  ],

  header: [
    {
      name: HEADERS.NEW_DOCUMENT_FORMAT,
      required: true,
      enum: DocumentFormat,
    },
    {
      name: HEADERS.SEGMENT_SEPARATOR,
      required: false,
      description: "*This field is required only when the input and output document is STRING",
      // examples: {},
    },
    {
      name: HEADERS.ELEMENT_SEPARATOR,
      required: false,
      description: "*This field is required only when the input and output document is STRING",
      schema: SeparatorSchema,
    },
  ],

  body: {
    description: "Your File",
    examples: {
      XML_DOCUMENT: {
        summary: "XML document",
        description: "This is as a example of XML document valid as input file",
        value: XML_EXAMPLE_FILE,
      },
      STRING_DOCUMENT: {
        summary: "STRING document",
        description:
          'This is as a example of STRING document valid as input file. For the example above, the "SEGMENT" separator is (~) and the "ELEMENT" separator is (*)',
        value: STRING_EXAMPLE_FILE,
      },
      JSON_DOCUMENT: {
        summary: "STRING document",
        description: "This is as a example of JSON document valid as input file",
        value: JSON_EXAMPLE_FILE,
      },
    },
    schema: {
      items: {
        oneOf: [
          {
            type: "xml",
          },
          {
            type: "string",
          },
        ],
      },
    },
  },

  response: {
    status: 200,
    content: {
      [CONTENT_TYPES_ACCEPTED.TEXT_PLAIN]: {
        example: STRING_EXAMPLE_FILE,
      },
      [CONTENT_TYPES_ACCEPTED.XML]: {
        example: XML_EXAMPLE_FILE,
      },
      [CONTENT_TYPES_ACCEPTED.JSON]: {
        example: JSON_EXAMPLE_FILE,
      },
    },
  },
};

export const DocumentsRoute = {
  CONVERTER: DocumentsConverterDoc,
};
