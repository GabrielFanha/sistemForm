const corpoTabela = document.getElementById('bodyTable');
const addLineBtn = document.getElementById('btn-secondary');
const calcBtn = document.getElementById('btn-primary');


document.addEventListener("DOMContentLoaded", () => {

  createNewLine()

  addLineBtn.addEventListener("click", createNewLine)
})

calcBtn.addEventListener("click", (e) => {
  e.preventDefault()

  coletarDados()
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

const coletarDados = () => {
  const linhas = corpoTabela.querySelectorAll('tr')
  const dadosCalculo = []

  linhas.forEach((linha, index) => {
    const inputs = linha.querySelectorAll('input')
    const dadosLinha = {
      tempo: parseFloat(inputs[0].value) || 0,
      tbs: parseFloat(inputs[1].value) || 0,
      tbn: parseFloat(inputs[2].value) || 0,
      tg: parseFloat(inputs[3].value) || 0,
      metabolismo: parseFloat(inputs[4].value) || 0,
      vestimenta: parseFloat(inputs[5].value) || 0
    }
    dadosCalculo.push(dadosLinha)
  })
  console.log(dadosCalculo)
  return dadosCalculo
}