export default function currencyFormater(num: number) {
  return new Intl.NumberFormat(undefined, { currency: "EUR", style: "currency" }).format(num);
}
