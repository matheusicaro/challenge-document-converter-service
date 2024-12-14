import {
  ApiBodyOptions,
  ApiHeaderOptions,
  ApiOperationOptions,
  ApiResponseOptions,
} from "@nestjs/swagger";

export interface ApiDocumentation {
  operation: ApiOperationOptions;
  consumes: string[];
  header: ApiHeaderOptions[];
  body: ApiBodyOptions;
  response: ApiResponseOptions;
}
