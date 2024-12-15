import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../../../src/configuration/app.module";

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

    /**
     *
     * TODO: Finish the implementation for these unit in this ticket: https://github.com/matheusicaro/challenge-document-converter-service/issues/11#issue-2740212262
     *
     * @matheusicaro
     **/
    it.skip("should convert text document to json document", async () => {
      return request(app.getHttpServer())
        .post(PATH)
        .set("Content-Type", "text/plain")
        .set("new-format", "JSON")
        .set("segment-separator", "~")
        .set("element-separator", "*")
        .send(
          `
            ProductID*4*8*15*16*23~
            ProductID*a*b*c*d*e~
            AddressID*42*108*3*14~
            ContactID*59*26~
        `,
        )
        .expect(200)
        .expect({
          body: `
              <root>
                <ProductID>
                    <ProductID1>4</ProductID1>
                    <ProductID2>8</ProductID2>
                    <ProductID3>15</ProductID3>
                    <ProductID4>16</ProductID4>
                    <ProductID5>23</ProductID5>
                </ProductID>
                <ProductID>
                    <ProductID1>a</ProductID1>
                    <ProductID2>b</ProductID2>
                    <ProductID3>c</ProductID3>
                    <ProductID4>d</ProductID4>
                    <ProductID5>e</ProductID5>
                </ProductID>
                <AddressID>
                    <AddressID1>42</AddressID1>
                    <AddressID2>108</AddressID2>
                    <AddressID3>3</AddressID3>
                    <AddressID4>14</AddressID4>
                </AddressID>
                <ContactID>
                    <ContactID1>59</ContactID1>
                    <ContactID2>26</ContactID2>
                </ContactID>
              </root>
            `,
        });
    });

    it("should  when separators are not informed on processing string document", async () => {
      expect("TODO").toEqual("TODO");
    });

    it("should return bad gateway and response correctly separators are not informed on processing string document", async () => {
      expect("TODO").toEqual("TODO");
    });
  });
});
