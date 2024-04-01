import numeral from "numeral";

export function fCurrency(number: any) {
  return "IDR " + numeral(number).format("0,0");
}

export function fNum(number: any) {
  return numeral(number).format();
}
