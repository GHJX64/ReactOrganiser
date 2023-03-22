import { Grid } from "@mui/material";

/**
 * Checks if *obj* is an empty object.
 * @param obj The object to check
 */
export const isEmptyObject = (obj) => {
  return !Number.isInteger(obj) && Object.keys(obj).length === 0;
};

/**
 * Chcecks if *value* is an empty object or an empty array. It will also return _true_ if the *value* is '' (empty string), undefined, null or NaN.
 * @param value The value to check.
 */
export const isEmpty = (value) => {
  if (Array.isArray(value)) {
    if (value.length > 0) {
      return value.filter((x) => !isEmpty(x)).length === 0;
    }
    return value.length === 0;
  }
  if (value instanceof Date) return false;
  return typeof value === "boolean"
    ? false
    : value === undefined ||
        value === null ||
        value.isNan ||
        isEmptyObject(value) ||
        value.toString().replace(/' '/g, "") === "";
};

/**
 * Update the hook for the error popup message with a correct error title and body to display to user.
 * @param errorResponse The error response to display. *errorResponse* in this case will be *e.response*
 */

export const hasError = (errorResponse) => {
  return (
    errorResponse === undefined ||
    !isEmpty(errorResponse.status && errorResponse.status !== 200)
  );
};

/**
 * Update the hook for the error popup message with a correct error title and body to display to user.
 * @param errorResponse
 * @param popupMessageHook The hook to modify the title and content to the corresponding error code and message.
 */
export const renderErrorDialogHook = (errorResponse, popupMessageHook) => {
  if (hasError(errorResponse)) {
    popupMessageHook.modifyDialogTitle(
      `Server Error Code: ${errorResponse.status}`
    );
    popupMessageHook.modifyDialogContent(
      errorResponse.data.error || errorResponse.data
    );
    popupMessageHook.modifyShowErrorIcon(true);
    popupMessageHook.modifyIsDelete(false);
    popupMessageHook.modifyOpen(true);
    popupMessageHook.modifyOnClickActionButton(false);
  }
  return errorResponse;
};

/**
 * Filter *object* with *objectFilter* in the form of { key: []} - object of key-arrays
 * @param object E.g. {keyA: [1,2,3], keyB: [1,2,3], keyC: [1,2,3]}
 * @param objectFilter E.g. { keyA: [1,3], keyB: [2], keyC: []}
 * @return E.g. {keyA:[2], keyB: [1,3], keyC: [1,2,3]}
 */
export const filterObjectFromAnotherObject = (object, objectFilter) => {
  const newObject = { ...object };
  Object.keys(object).map((key) => {
    if (Object.keys(objectFilter).includes(key)) {
      newObject[key] = object[key].filter(
        (item) => !objectFilter[key].includes(item)
      );
    }
  });
};

/**
 * Add or Subtract number of years, months, or days from the current *date*
 * @param date The date to add or subtract the offset for year, month and day.
 * @param yearOffset The offset for year to add/subtract (e.g. -1 means deduct 1 year from the given *date*)
 * @param monthOffset The offset for month to add/subtract (e.g. -1 means deduct 1 month from the given *date* )
 * @param dayOffset The offset for day to add/subtract (e.g. -1 means deduct 1 day from the given *date* )
 * @param hourOffset The offset for hour to add/subtract (e.g. -1 means deduct 1 hour from the given *date* )
 * @param minuteOffset The offset for minute to add/subtract (e.g. -1 means deduct 1 minute from the given *date* )
 * @param secondOffset The offset for second to add/subtract (e.g. -1 means deduct 1 second from the given *date* )
 *
 */
export const dateOffset = (
  date,
  yearOffset = 0,
  monthOffset = 0,
  dayOffset = 0,
  hourOffset = 0,
  minuteOffset = 0,
  secondOffset = 0
) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return new Date(
    year + yearOffset,
    month + monthOffset,
    day + dayOffset,
    hour + hourOffset,
    minute + minuteOffset,
    second + secondOffset
  );
};

/**
 * Checks if *value* is included in an array of objects based on the *key*.
 * @param value The value to check.
 * @param array An array of objects.
 * @param key The key of the object in the *array*.
 */
export const isInArrayObjects = (value, array, key) => {
  if (Array.isArray(array) && !isEmpty(value)) {
    let isInArray = false;
    array.map((item) => {
      if (item[key] === value) {
        isInArray = true;
      }
    });
    return isInArray;
  }
  return false;
};

/**
 * Check if every items in the *array* is Equal. (Note: Does not work for objects)
 * @param array The Array that will be checked if everything is equal
 */

export const allEqual = (array) => {
  return array.every((val, i, arr) => val === arr[0]);
};

/**
 * Check *value* to determine whether a default value should be returned its place. The *defaultValue* is returned if value is NaN, null or undefined.
 * @param value The value to check,
 * @param defaultValue The default value.
 */
export const defaultTo = (value, defaultValue) => {
  if (typeofvalue == "boolean") return value;
  return value === undefined || value === null || value.isNan || isEmpty(value)
    ? defaultValue
    : value;
};

/**
 * Sort the array of objects with the *key* attribute
 * @param array Array of objects to sort with a specific key. For strings only
 * @param key (string) The name of the key for sorting.
 * @param descending (boolean) Sort the array in descending order. Default: false
 */

export const sortArrayOfObjectsByKey = (array, key, descending = false) => {
  return array.sort((a, b) => {
    const keyA = a[key];
    const keyB = b[key];
    if (keyA?.toLowerCase() < keyB?.toLowerCase()) return descending ? 1 : -1;
    if (keyA?.toLowerCase() > keyB?.toLowerCase()) return descending ? -1 : 1;
    return 0;
  });
};

/**
 * Trancate the given *string* to a certain number of characters (*limit*) and apprend "..." behind.
 * @param string The string to be truncated.
 * @param limit Number of characters to be limited / shown before "...".
 */
export const truncate = (string, limit) => {
  if (isEmpty(string)) return string;
  return string.length > limit
    ? string.substr(0, limit).trim() + "..."
    : string;
};

/**
 * Round the number to the specified number of decimal places
 * @param num The number to be rounded
 * @param decimal The number of decimal places
 */

export const roundToDecimal = (num, decimal) => {
  return +(Math.round(num + `e+${decimal}`) + `e-${decimal}`);
};

/**
 * Replaces a substring of an *originalString* with an *insertItem*
 * @param start The starting index in the *originalString* to be replaced by the *insertItem*.
 * @param end The ending index in the *originalString* to be replaced by the *insertItem*
 * @param originalString The original string.
 * @param insertItem The replacement item.
 */
export const replaceBetween = (start, end, originalString, insertItem) => {
  return (
    originalString?.substring(0, start) +
    insertItem +
    originalString?.substring(end)
  );
};

/**
 * Copy a string text *textToCopy* into the clipboard.
 * @param textToCopy The string text to be copied to clipboard
 */
export const copyToClipboard = (textToCopy)=>{
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext){
    // navigator clipboard api method
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // text area method 
  }
}