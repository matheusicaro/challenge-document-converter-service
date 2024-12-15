import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../../../src/configuration/app.module";
import { entryDocumentFileFactory } from "../../factories/entry-document-file.factory";

describe("E2E FileTest", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(URL, () => {
    const PATH = "/documents/converter/";

    it("should convert text document to json document", async () => {
      return request(app.getHttpServer())
        .post(PATH)
        .set("Content-Type", "text/plain")
        .set("new-format", "JSON")
        .set("segment-separator", "~")
        .set("element-separator", "*")
        .send(entryDocumentFileFactory.buildStringDocument())
        .expect(200)
        .expect({
          body: entryDocumentFileFactory.buildJsonDocument(),
        });
    });

    it.skip("should response error when separators are not informed on processing string document", async () => {
      return request(app.getHttpServer())
        .post(PATH)
        .set("Content-Type", "text/plain")
        .set("new-format", "JSON")
        .set("segment-separator", "")
        .set("element-separator", "")
        .send(entryDocumentFileFactory.buildStringDocument())
        .expect(400);
    });
  });
});
