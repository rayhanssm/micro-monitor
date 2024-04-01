import { format, isValid } from "date-fns";

export function fDateSlash(date: any) {
  return format(date, "dd/MM/yyyy");
}

export function fDateInputValue(date: any) {
  if (date && isValid(date)) {
    return format(date, "yyyy-MM-dd");
  }
}
