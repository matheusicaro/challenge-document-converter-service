import {
  isValidString,
  isValidStringForRegex,
  removeBlankSpaces,
} from "../../../../src/application/lib/string-helpers.lib";

describe("string-helpers.lib", () => {
  describe("isValidStringForRegex", () => {
    describe("when invalid chars are passed", () => {
      const someInvalidChars = [`\\`, "$", "^", "*", "+", ".", "[", "(", ")", "?"];

      test.each(someInvalidChars)("should return false when the input %s is passed", (char) => {
        expect(isValidStringForRegex(char)).toEqual(false);
      });
    });

    describe("when valid chars are passed", () => {
      const validChars = [`~`, "@", "-", "%", "name", ":", "_tag_", "<tag>"];

      test.each(validChars)("should return true when the input %s is passed", (char) => {
        expect(isValidStringForRegex(char)).toEqual(true);
      });
    });
  });

  describe("isValidString", () => {
    const emptyStrings = ["", " ", "     "];

    test.each(emptyStrings)("should return false when input is an empty string", (str) => {
      expect(isValidString(str)).toEqual(false);
    });

    test("should return true when input is not a empty string", () => {
      expect(isValidString("string here")).toEqual(true);
    });
  });

  describe("removeBlankSpaces", () => {
    describe("should remove all blank spaces", () => {
      test("should remove the black spaces correctly", () => {
        const stringWithSpaces = `   there_     ar e_  some_  w
            hite_ spa ce s_over_
                  her
          e_ rem ove_         it
        `;

        const result = removeBlankSpaces(stringWithSpaces);

        expect(result).toEqual("there_are_some_white_spaces_over_here_remove_it");
      });

      test("should remove the black spaces with slash n correctly", () => {
        const stringWithSpaces = `\nwith_space\n\n\n\n\n\n\_
          here/n/n/n\n\n\n
        `;

        const result = removeBlankSpaces(stringWithSpaces);

        expect(result).toEqual("with_space_here/n/n/n");
      });

      test("should return the same input with not changes when no spaces were found", () => {
        const stringWithNoSpaces = "string-with_no_spaces";

        const result = removeBlankSpaces(stringWithNoSpaces);

        expect(result).toEqual(stringWithNoSpaces);
      });
    });
  });
});
