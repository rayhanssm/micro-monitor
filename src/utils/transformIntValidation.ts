export function validateStringToInt(_: any, value: any) {
  if (typeof value === "string") {
    return parseInt(value.replace(/[^\d.]/g, ""));
  }
}
