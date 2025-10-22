import formatValue from "./formatValue.js"

const corpoTabela = document.getElementById('bodyTable');
const addLineBtn = document.getElementById('btn-secondary');
const calcBtn = document.getElementById('btn-primary');
const viewResult = document.getElementById("hidden")
const closeSwitch = document.getElementById("close-popup")
const resultIbutgMedium = document.getElementById("resultIbutgMedium")
const resultMediumMetabolismo = document.getElementById("resultMediumMetabolismo")
const resultLimite = document.getElementById("resultLimite")

const valuesMetabolismo = [
  {taxa: 100, lt: 30.2},
  {taxa: 102, lt: 33.6},
  {taxa: 104, lt: 33.5},
  {taxa: 106, lt: 33.4},
  {taxa: 108, lt: 33.3},
  {taxa: 110, lt: 33.2},
  {taxa: 112, lt: 33.1},
  {taxa: 115, lt: 33.0},
  {taxa: 117, lt: 32.9},
]

document.addEventListener("DOMContentLoaded", () => {
  createNewLine()
  addLineBtn.addEventListener("click", createNewLine)
})

calcBtn.addEventListener("click", (e) => {
  e.preventDefault()
  let noExpositionSolar = document.getElementById("no-exposition").checked
  let exposition = noExpositionSolar ? false : true
  calcIBUGMedium(exposition)
})

const createNewLine = () => {
  const novaLinha = corpoTabela.insertRow();
  novaLinha.innerHTML = `
    <td><input type="text" step="0.01" value="" class="input-tempo" required></td>
    <td><input type="text" step="0.01" value="" class="input-tbs" required></td>
    <td><input type="text" step="0.01" value="" class="input-tbn" required></td>
    <td><input type="text" step="0.01" value="" class="input-tg" required></td>
    <td><input type="text" step="0.01" value="" class="input-metabolismo" required></td>
    <td><input type="text" value="" class="input-vestimenta" required></td>
  `;
}

const calcIBUGMedium = (type) => {
  const linhas = corpoTabela.querySelectorAll('tr')
  let ibutgMedium = 0
  let metabolismoMedium = 0
  linhas.forEach((linha, index) => {
    const inputs = linha.querySelectorAll('input')
    const time = parseFloat(inputs[0].value)
    const tbs = parseFloat(inputs[1].value)
    const tbn = parseFloat(inputs[2].value)
    const tg = parseFloat(inputs[3].value)
    const metabolismo = parseFloat(inputs[4].value)
    const vestimenta = parseFloat(inputs[5].value)
    const ibutg = ibutgCalc(tbn, tbs, tg, type)
    const productLineIbutg = ibutg * time
    const productLineMetabolismo = metabolismo * time
    ibutgMedium += productLineIbutg
    metabolismoMedium +=productLineMetabolismo
  })
  ibutgMedium = ibutgMedium / 60
  metabolismoMedium = metabolismoMedium / 60



  return 
}


const ibutgCalc = (tbn, tbs, tg, exposition) => {
  let ibutg = 0
  if (exposition === true) {
    ibutg = (0.7 * tbn) + (0.1 * tbs) + (0.2 * tg)
        return ibutg
  } else if (!exposition) {
    console.log(tbs, tbn, tg, ibutg)
    ibutg = (0.7 * tbn) + (0.3 * tg)
    return ibutg
  } else {
    console.log(`Valor invalido`)
  }
  
}

const presetResult = (ibutgMedium, taxaMedium, limite) => {
  resultIbutgMedium.textContent = `${formatValue(ibutgMedium)} °C`
  resultMediumMetabolismo.textContent = `${formatValue(taxaMedium)}`
  resultLimite.textContent = `${formatValue(limite)} °C`
  viewResult.id = ""
}

closeSwitch.addEventListener("click", (e) => {
   e.preventDefault
  if(viewResult){
    viewResult.id = "hidden"
  }
})