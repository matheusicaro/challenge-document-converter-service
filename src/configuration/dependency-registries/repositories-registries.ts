import { Provider } from "@nestjs/common";
import { DependencyRegistry } from "matheusicaro-node-framework";

import { ProviderTokens } from "./tokens";
import { DocumentPipelineProviderAdapter } from "../../application/domain/providers/document-pipeline/document-pipeline.provider.adapter";

/**
 * Starting default LoggerProvider DI in the container from @matheusicaro-node-framework
 *
 * ref: https://github.com/matheusicaro/matheusicaro-node-framework?tab=readme-ov-file#dependency-injection
 **/
const _dependencyRegistry = new DependencyRegistry([]);

const registerProviders = (): Provider[] => {
  return [
    {
      provide: ProviderTokens.DocumentConverterProvider,
      useValue: new DocumentPipelineProviderAdapter(),
    },
  ];
};

export { registerProviders };
