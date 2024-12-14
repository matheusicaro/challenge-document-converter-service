import { Provider } from "@nestjs/common";
import { ProviderTokens } from "./tokens";
import { DocumentPipelineProviderAdapter } from "../../application/domain/providers/document-pipeline/document-pipeline.provider.adapter";

const registerProviders = (): Provider[] => {
  return [
    {
      provide: ProviderTokens.DocumentConverterProvider,
      useValue: new DocumentPipelineProviderAdapter(),
    },
  ];
};

export { registerProviders };
