import { DocumentFormat } from "../../entities/document/document";
import {
  ConvertInput,
  ConvertResponse,
  DocumentPipelineProviderPort,
} from "./document-pipeline.provider.port";

class DocumentPipelineProviderAdapter implements DocumentPipelineProviderPort {
  constructor() {
    console.log(`instance of ${DocumentPipelineProviderAdapter.name}`);
  }

  public convert(_input: ConvertInput): ConvertResponse {
    return {
      document: {
        content: "",
        format: DocumentFormat.TEXT,
      },
    };
  }
}

export { DocumentPipelineProviderAdapter };
