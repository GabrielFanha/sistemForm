export default function formatValue(value) {
  // formatação que arredonda o valor
  // let format = value.toFixed(2).toString().replace(".", ",")

  // formatação que mantem o valor original
  let format = Math.trunc(value * 100) / 100
  format = format.toString().replace(".", ",")
  return format
}