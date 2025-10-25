import formatValue from "./formatValue.js"

const corpoTabela = document.getElementById('bodyTable');
const addLineBtn = document.getElementById('btn-secondary');
const calcBtn = document.getElementById('btn-primary');
const viewResult = document.getElementById("hidden")
const closeSwitch = document.getElementById("close-popup")
const resultIbutgMedium = document.getElementById("resultIbutgMedium")
const resultMediumMetabolismo = document.getElementById("resultMediumMetabolismo")
const resultLimite = document.getElementById("resultLimite")
const contextMenu = document.getElementById('contextMenu');
const deletarLinhaBtn = document.getElementById('deletarLinhaBtn');
let linhaAtualParaDeletar = null;

const maxLines = 12

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
  {taxa: 119, lt: 32.8},
  {taxa: 122, lt: 32.7},
  {taxa: 124, lt: 32.6},
  {taxa: 127, lt: 32.5},
  {taxa: 129, lt: 32.4},
  {taxa: 132, lt: 32.3},
  {taxa: 135, lt: 32.2},
  {taxa: 137, lt: 32.1},
  {taxa: 140, lt: 32.0},
  {taxa: 143, lt: 31.9},
  {taxa: 146, lt: 31.8},
  {taxa: 149, lt: 31.7},
  {taxa: 152, lt: 31.6},
  {taxa: 155, lt: 31.5},
  {taxa: 158, lt: 31.4},
  {taxa: 161, lt: 31.3},
  {taxa: 165, lt: 31.2},
  {taxa: 168, lt: 31.1},
  {taxa: 171, lt: 31.0},
  {taxa: 175, lt: 30.9},
  {taxa: 178, lt: 30.8},
  {taxa: 182, lt: 30.7},
  {taxa: 186, lt: 30.6},
  {taxa: 189, lt: 30.5},
  {taxa: 193, lt: 30.4},
  {taxa: 197, lt: 30.3},
  {taxa: 201, lt: 30.2},
  {taxa: 205, lt: 30.1},
  {taxa: 209, lt: 30.0},
  {taxa: 214, lt: 29.9},
  {taxa: 218, lt: 29.8},
  {taxa: 222, lt: 29.7},
  {taxa: 227, lt: 29.6},
  {taxa: 231, lt: 29.5},
  {taxa: 236, lt: 29.4},
  {taxa: 241, lt: 29.3},
  {taxa: 246, lt: 29.2},
  {taxa: 251, lt: 29.1},
  {taxa: 256, lt: 29.0},
  {taxa: 261, lt: 28.9},
  {taxa: 266, lt: 28.8},
  {taxa: 272, lt: 28.7},
  {taxa: 277, lt: 28.6},
  {taxa: 283, lt: 28.5},
  {taxa: 289, lt: 28.4},
  {taxa: 294, lt: 28.3},
  {taxa: 300, lt: 28.2},
  {taxa: 306, lt: 28.1},
  {taxa: 313, lt: 28.0},
  {taxa: 319, lt: 27.9},
  {taxa: 325, lt: 27.8},
  {taxa: 332, lt: 27.7},
  {taxa: 339, lt: 27.6},
  {taxa: 346, lt: 27.7},
  {taxa: 353, lt: 27.4},
  {taxa: 360, lt: 27.3},
  {taxa: 367, lt: 27.2},
  {taxa: 374, lt: 27.1},
  {taxa: 382, lt: 27.0},
  {taxa: 390, lt: 26.9},
  {taxa: 398, lt: 26.8},
  {taxa: 406, lt: 26.7},
  {taxa: 414, lt: 26.6},
  {taxa: 422, lt: 26.5},
  {taxa: 431, lt: 26.4},
  {taxa: 440, lt: 26.3},
  {taxa: 448, lt: 26.2},
  {taxa: 458, lt: 26.1},
  {taxa: 467, lt: 26.0},
  {taxa: 476, lt: 25.9},
  {taxa: 486, lt: 25.8},
  {taxa: 496, lt: 25.7},
  {taxa: 506, lt: 25.6},
  {taxa: 516, lt: 25.5},
  {taxa: 526, lt: 25.4},
  {taxa: 537, lt: 25.3},
  {taxa: 548, lt: 25.2},
  {taxa: 559, lt: 25.1},
  {taxa: 570, lt: 25.0},
  {taxa: 582, lt: 24.9},
  {taxa: 594, lt: 24.8},
  {taxa: 606, lt: 24.7}
]

document.addEventListener("DOMContentLoaded", () => {
  createNewLine()
  addLineBtn.addEventListener("click", createNewLine)
})

calcBtn.addEventListener("click", (e) => {
  e.preventDefault()
  let noExpositionSolar = document.getElementById("no-exposition").checked
  let exposition = noExpositionSolar ? false : true
  const [ibutgMedium, metabolismoMedium] = calcIBUGMedium(exposition)
  const lt = resquestLimite(metabolismoMedium)
  presetResult(ibutgMedium, metabolismoMedium, lt)
})

const createNewLine = () => {
  const numeroLinhasAtual = corpoTabela.querySelectorAll('tr').length
  if (numeroLinhasAtual >= maxLines) {
    return
  }
  const novaLinha = corpoTabela.insertRow();
  novaLinha.classList.add('tabela-linha');
  novaLinha.dataset.rowIndex = Date.now();
  novaLinha.innerHTML = `
    <td><input type="text" step="0.01" value="" class="input-tempo" required></td>
    <td><input type="text" step="0.01" value="" class="input-tbs format-number" required></td>
    <td><input type="text" step="0.01" value="" class="input-tbn format-number" required></td>
    <td><input type="text" step="0.01" value="" class="input-tg format-number" required></td>
    <td><input type="text" step="0.01" value="" class="input-metabolismo format-number" required></td>
    <td><input type="text" value="" class="input-vestimenta" required></td>
  `;

  if (numeroLinhasAtual + 1 >= maxLines) {
    addLineBtn.disabled = true;
  }
}

const resquestLimite = (taxaMd) => {
  const value = valuesMetabolismo.find(item => {
    return item.taxa >= taxaMd
  })

  return value.lt
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



  return [ibutgMedium, metabolismoMedium]
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
  corpoTabela.innerHTML = ""
  createNewLine()
}

closeSwitch.addEventListener("click", (e) => {
   e.preventDefault
  if(viewResult){
    viewResult.id = "hidden"
  }
})

document.getElementById('dadosTabela').addEventListener('contextmenu', function(e) {
  const linhaClicada = e.target.closest('.tabela-linha'); 

  if (linhaClicada) {
    e.preventDefault(); 

    linhaAtualParaDeletar = linhaClicada;
    contextMenu.style.left = e.pageX + 'px';
    contextMenu.style.top = e.pageY + 'px';
    contextMenu.style.display = 'block';
  } else {
    contextMenu.style.display = 'none';
  }
});

deletarLinhaBtn.addEventListener('click', () => {
  if (linhaAtualParaDeletar) {
    linhaAtualParaDeletar.remove(); 
    linhaAtualParaDeletar = null;
    contextMenu.style.display = 'none';
    const numeroLinhasAtual = corpoTabela.querySelectorAll('tr').length;
    if (numeroLinhasAtual < maxLines) {
      addLineBtn.disabled = false;
    }
  }
});


document.addEventListener('click', () => {
  contextMenu.style.display = 'none';
});
    
