# challenge-document-converter-service

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

## Entry document structure

git fetch origin
git checkout 17-updated-api-docus
