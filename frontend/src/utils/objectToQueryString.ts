export const objectToQueryString = (
  obj: Record<string, string | number | boolean>
): string => {
  let str = "";
  for (const key in obj) {
    const value = obj[key]?.toString();
    if (value !== "") {
      if (str) str += "&";
      str += `${key}=${obj[key].toString()}`;
    }
  }
  if (str) {
    str = "?" + str;
  }
  return str;
};
