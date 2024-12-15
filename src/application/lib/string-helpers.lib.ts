/**
 * Function to validate if a char is a special chars in a regex.
 *
 * The validation define if the chars passed are able to run a regex in a simple replace.
 * If that is not possible, means the sequency of chars are invalid in a regex the chars.
 *
 * @str - char
 */
export const isValidStringForRegex = (str: string) => {
  try {
    const regex = new RegExp(str);

    const result = `replace${str}done`.replace(regex, "_");

    return result === "replace_done";
  } catch {
    /*
     * Invalid regular expression is thrown for specific chars.
     *  For example when "chars" is a question_mark(?), or comma(,), or star(*), etc.
     */
    return false;
  }
};

export const isValidString = (string: string): boolean => {
  const isEmptyOrInvalid = (str: string): boolean => !str || str.length === 0;

  if (isEmptyOrInvalid(string)) {
    return false;
  }

  const str = removeBlankSpaces(string);

  return !isEmptyOrInvalid(str);
};

export const removeBlankSpaces = (str): string => {
  return str.replace(/(\r\n|\n|\r|\s)/gm, "");
};

export const splitBySeparator = (str: string, separator: string): string[] => {
  return str.split(separator).filter((value) => !!value);
};
