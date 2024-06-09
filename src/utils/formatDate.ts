import { format, isValid } from "date-fns";
import { id } from "date-fns/locale";

export function fDateSlash(date: any) {
  return format(date, "dd/MM/yyyy");
}

export function fDateInputValue(date: any) {
  if (date && isValid(date)) {
    return format(date, "yyyy-MM-dd");
  }
}

export function fDayDate(date: any) {
  return format(date, "eeee, dd MMMM yyyy", { locale: id });
}

export function fMonthYear(date: any) {
  return format(date, "MMMM yyyy");
}

export function fTime(date: any) {
  return format(date, "HH:mm");
}
