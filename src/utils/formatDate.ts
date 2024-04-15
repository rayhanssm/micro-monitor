import { format, isValid } from "date-fns";

export function fDateSlash(date: any) {
  return format(date, "dd/MM/yyyy");
}

export function fDateInputValue(date: any) {
  if (date && isValid(date)) {
    return format(date, "yyyy-MM-dd");
  }
}

export function fDayDate(date: any) {
  return format(date, "eeee, dd MMMM yyyy");
}

export function fMonthYear(date: any) {
  return format(date, "MMMM yyyy");
}
