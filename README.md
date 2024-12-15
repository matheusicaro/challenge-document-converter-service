# challenge-document-converter-service

=> Project board: https://github.com/users/matheusicaro/projects/6
<br>

- [Intro](#intro)
- [Challenge](#challenge)
- [API Running Screen Shot](#api-running-screen-shot)
- [Installation and Setup Instructions](#installation-and-setup-instructions)
- [How it was developed](#how-it-was-developed)
    - [API design and logic](#api-design-and-logic)
    - [API Business logic Definitions](#api-business-logic-definitions)
    - [API Stack - Technologies used](#api-stack---technologies-used)
- [FUTURE WORK](#future-work)

## Intro

This API which converts documents in 3 formats between them:

- XML to JSON, **_or vice-versa_**
- JSON to STRING, **_or vice-versa_**
- STRING to XML, **_or vice-versa_**

This project was build to reach the following challenge: `Write an API to convert documents between three different formats`

## Challenge

Write an API to convert documents between three different formats:

</details>

<details>
<summary>Format #1: String</summary>
<br>

String data is composed of ‘segments’ (i.e. lines), each of which is composed of multiple ‘elements’ (i.e. data values).
Segments/lines are delineated by a line separator character, and elements within a segment are delineated by element separator
characters. In the example below, the separator characters are ~ and \*.

Example:

```
ProductID*4*8*15*16*23~
2 ProductID*a*b*c*d*e~
3 AddressID*42*108*3*14~
4 ContactID*59*26~
```

The example above is composed of 4 segments. Each segment is composed of a segment name followed by a number of elements. The
first two segments have five elements, the third has four, and the fourth has two.

</details>

<details>
<summary>Format #2: JSON</summary>
<br>

Constraints:
Segments (lines) are nested in arrays and objects where the keys are the segment names followed by an incrementing integer from 1...n of elements.

Example:

```json
{
  "ProductID": [
    {
      "ProductID1": "4",
      "ProductID2": "8",
      "ProductID3": "15",
      "ProductID4": "16",
      "ProductID5": "23"
    },
    {
      "ProductID1": "a",
      "ProductID2": "b",
      "ProductID3": "c",
      "ProductID4": "d",
      "ProductID5": "e"
    }
  ],
  "AddressID": [
    {
      "AddressID1": "42",
      "AddressID2": "108",
      "AddressID3": "3",
      "AddressID4": "14"
    }
  ],
  "ContactID": [
    {
      "ContactID1": "59",
      "ContactID2": "26"
    }
  ]
}
```

</details>

<details>
<summary>Format #3: XML</summary>
<br>

Example:

```xml
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
```

</details>

## API Running Screen Shot

<details>
<summary>📸 1. Convert JSON document to XML</summary>

[json-to-xml](./docs/json-to-xml.mov)
</details>

<details>
<summary>📸 2. Convert JSON document to STRING</summary>

[json-to-string](./docs/json-to-string.mov)
</details>

<details>
<summary>📸 3. Convert XML document to JSON</summary>

[xml-to-json](./docs/xml-to-json.mov)
</details>

<details>
<summary>📸 4. Convert XML document to STRING</summary>

[xml-to-string](./docs/xml-to-string.mov)
</details>

<details>
<summary>📸 5. Convert STRING document to JSON</summary>

[string-to-json](./docs/string-to-json.mov)
</details>

<details>
<summary>📸 6. Convert STRING document to XML</summary>

[string-to-xml](./docs/string-to-xml.mov)
</details>

</details>

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

1. clone the repository: `git clone https://github.com/matheusicaro/challenge-document-converter-service.git`
2. Run: `Installation: npm install`
3. Run: `Installation: npm start`
4. Go to `http://[::1]:3000/docs`

<details>
<summary>📸 </summary>

![alt text](running-local.png)
</details>

## How it was developed

#### API design and logic

The process of convert a document from the type X to Y is designed to run in a pipelined, with a focus on making it scalable for new document conversions.

<details>
<summary>📸 Steps of converting the document:</summary>

![alt text](./docs/api-design-logic.png)

</details>

#### API Business logic Definitions

##### Entities

- [entry-file.ts](src/application/domain/entities/entry-file.ts): Entity that defines the info required from the document received to be converted.
- [domain-file.ts](src/application/domain/entities/domain-file.ts): Entity that defines a document known in business logic where is used to be converted to the new format
- [document.ts](src/application/domain/entities/document/document.ts): Entity abstract that defines the base of a document already converted. Each new document format should extends from this document, ex:
  - [json-document.ts](src/application/domain/entities/document/json-document.ts)
  - [string-document.ts](src/application/domain/entities/document/string-document.ts)
  - [xml-document.ts](src/application/domain/entities/document/xml-document.ts)

##### Providers

- [document-pipeline.provider.port.ts](src/application/domain/providers/document-pipeline/document-pipeline.provider.port.ts): The contract of the document pipeline convertor
  - [document-pipeline.provider.adapter.ts](src/application/domain/providers/document-pipeline/document-pipeline.provider.adapter.ts)
- [document-converter.provider.port.ts](src/application/domain/providers/document-converters/document-converter.provider.port.ts): The contract of the document convertor
- [document.ts](src/application/domain/entities/document/document.ts): Entity abstract that defines the base of a document already converted. Each new document format should extends from this document, ex:
  - [json-document-converter.provider.adapter.ts](src/application/domain/providers/document-converters/json-document-converter.provider.adapter.ts): json document converter
  - [xml-document-converter.provider.adapter.ts](src/application/domain/providers/document-converters/xml-document-converter.provider.adapter.ts): xml document converter
  - [string-document-converter.provider.adapter.ts](src/application/domain/providers/document-converters/string-document-converter.provider.adapter.ts): string document converter

#### API Stack - Technologies used

The service use a [hexagonal-architecture](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/hexagonal-architecture.html) with the definition of Ports and Adapters for the providers.

- Used **[Node.js](https://nodejs.org/en/)** with:
  - **[TypeScript](https://www.typescriptlang.org/)**
  - **[Nest.js framework](https://docs.nestjs.com/)**
  - **[express](https://expressjs.com/)**
- Used **[Jest](https://jestjs.io/)** for unit testing
- Used **[Husky](https://typicode.github.io/husky/#/)** for running defined steps/scripts before make a commit

## FUTURE WORK

Due to my short time available to work on this project, I left some debit techs to be done:

- Increase coverage for unit tets, right the coverage is about `80%`
  - issue created: https://github.com/matheusicaro/challenge-document-converter-service/issues/9

<img width="1507" alt="image" src="https://github.com/user-attachments/assets/86aee80a-ad78-47cc-91a4-25e412a44a63" />

- Add e2e tests
  - issue created: https://github.com/matheusicaro/challenge-document-converter-service/issues/11
