import formatValue from "./formatValue.js"

const submitButton = document.getElementById("btn-primary")
const closeSwitch = document.getElementById("close-popup")
const viewResult = document.getElementById("hidden")
const tbsResult = document.getElementById("tbsResult")
const tbnResult = document.getElementById("tbnResult")
const tgResult = document.getElementById("tgResult")
const ibutgResult = document.getElementById("IBUTG")

console.log(submitButton)

submitButton.addEventListener("click", () => {
  let noExpositionSolar = document.getElementById("no-exposition").checked
  let tbsValue = document.getElementById("tbs").value.replace(",", ".")
  let tbnValue = document.getElementById("tbn").value.replace(",", ".")
  let tgValue = document.getElementById("tg").value.replace(",", ".")
  let tbs = Number(tbsValue)
  let tbn = Number(tbnValue)
  let tg = Number(tgValue)
  let exposition = noExpositionSolar ? false : true

  ibutgCalc(tbn, tbs, tg, exposition)
})


export const ibutgCalc = (tbn, tbs, tg, exposition) => {
  let ibutg = 0
  if (exposition === true) {
    ibutg = (0.7 * tbn) + (0.1 * tbs) + (0.2 * tg)
        return presetResults(tbs, tbn, tg, ibutg)
  } else if (!exposition) {
    console.log(tbs, tbn, tg, ibutg)
    ibutg = (0.7 * tbn) + (0.3 * tg)
    return presetResults(tbs, tbn, tg, ibutg)
  } else {
    console.log(`Valor invalido`)
  }
  
}

const presetResults = (tbs, tbn, tg, ibutg) => {
  tbsResult.textContent = `${formatValue(tbs)}ºC`
  tbnResult.textContent = `${formatValue(tbn)}ºC`
  tgResult.textContent = `${formatValue(tg)}ºC`
  ibutgResult.textContent = `${formatValue(ibutg)}ºC`
  viewResult.id = ""
}

closeSwitch.addEventListener("click", (e) => {
   e.preventDefault
  if(viewResult){
    viewResult.id = "hidden"
  }
})