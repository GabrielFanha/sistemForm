import formatValue from "./formatValue.js"

const corpoTabela = document.getElementById('bodyTable');
const addLineBtn = document.getElementById('btn-secondary');
const calcBtn = document.getElementById('btn-primary');


document.addEventListener("DOMContentLoaded", () => {

  createNewLine()

  addLineBtn.addEventListener("click", createNewLine)
})

calcBtn.addEventListener("click", (e) => {
  e.preventDefault()
  let noExpositionSolar = document.getElementById("no-exposition").checked
  let exposition = noExpositionSolar ? false : true
  // Colocar função de cálculo
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
  const dadosCalculo = []
  let ibutgMedium = 0
  linhas.forEach((linha, index) => {
    const inputs = linha.querySelectorAll('input')
    const time = parseFloat(inputs[0].value)
    const tbs = parseFloat(inputs[1].value)
    const tbn = parseFloat(inputs[2].value)
    const tg = parseFloat(inputs[3].value)
    const metabolismo = parseFloat(inputs[4].value)
    const vestimenta = parseFloat(inputs[5].value)
    const ibutg = ibutgCalc(tbn, tbs, tg, type)
    const productLine = ibutg * time
    ibutgMedium += productLine
    const dadosLinha = {
      tempo: time,
      tbs: tbs,
      tbn: tbs,
      tg: tg,
      ibutg: ibutg,
      metabolismo: metabolismo,
      vestimenta: vestimenta,
    }
    dadosCalculo.push(dadosLinha)
  })
  ibutgMedium = ibutgMedium / 60
  console.log(dadosCalculo)
  console.log(ibutgMedium)

  


  return dadosCalculo
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