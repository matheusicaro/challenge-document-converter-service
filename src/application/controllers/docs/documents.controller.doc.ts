import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { HEADERS, CONTENT_TYPES_ACCEPTED } from "../../../configuration/app.constants";
import { DocumentFormat } from "../../domain/entities/document/document";
import { ApiDocumentation } from "./api-documentation";

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
      schema: SeparatorSchema,
    },
    {
      name: HEADERS.ELEMENT_SEPARATOR,
      required: false,
      schema: SeparatorSchema,
    },
  ],

  body: {
    description: "Your File",
    type: String,
  },

  response: {
    content: {
      [CONTENT_TYPES_ACCEPTED.TEXT_PLAIN]: {
        example: {
          id: 1,
          name: "Jessica Right",
          fullTime: true,
        },
      },
      [CONTENT_TYPES_ACCEPTED.XML]: {
        example: {
          id: 1,
          name: "Jessica Right",
          fullTime: true,
        },
      },
      [CONTENT_TYPES_ACCEPTED.JSON]: {
        example: {
          id: 1,
          name: "Jessica Right",
          fullTime: true,
        },
      },
    },
  },
};

export const DocumentsRoute = {
  CONVERTER: DocumentsConverterDoc,
};
