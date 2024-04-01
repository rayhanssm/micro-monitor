import numeral from "numeral";

export function fCurrency(number: any) {
  return "IDR " + numeral(number).format("0,0");
}
