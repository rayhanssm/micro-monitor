import { format } from "date-fns";

export function fDateSlash(date: any) {
  return format(date, "dd/MM/yyyy");
}
