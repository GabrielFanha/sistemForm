import formatValue from "./formatValue.js"

const buttonPorcentagem = document.getElementById("buttonPorcentagem")
const buttonLimite = document.getElementById("buttonLimite")
const viewResult = document.getElementById("hidden")
const closeSwitch = document.getElementById("close-popup")
//Primeiro popup de result
const typePoeira = document.getElementById("typePoeira")
const resultPoeira = document.getElementById("resultPoeira")
const resultSilica = document.getElementById("resultSilica")
const resultPorcentagem = document.getElementById("resultPorcentagem")
const resultLimite = document.getElementById("resultLimite")



buttonPorcentagem.addEventListener("click", (e) => {
    e.preventDefault()
    // Puxa os valores do input
    let poeiraRespiravel = document.getElementById("respiravel").checked
    let poeiraValue = document.getElementById("poeira").value.replace(",", ".")
    let silicaValue = document.getElementById("silica").value.replace(",", ".")
    let poeira = Number(poeiraValue)
    let silica = Number(silicaValue)
    let exposition = poeiraRespiravel ? true : false

    if (exposition) {
        let [porcentagem, lt] = calcPoeiraRespiravel(poeira, silica)
        return presetResultsFirstForm(exposition, poeira, silica, porcentagem, lt)
    } else if (!exposition) {
        let [porcentagem, lt] = calcPoeiraTotal(poeira, silica)
        return presetResultsFirstForm(exposition, poeira, silica, porcentagem, lt)
    } else {
    console.log(`Valor invalido`)
    }
})



const presetResultsFirstForm = (type ,poeira, silica, porcentagem, lt) => {
    typePoeira.textContent = `Poeira ${type ? "Respirável" : "Total"}:`
    resultPoeira.textContent = `${formatValue(poeira)} mg/m³`
    resultSilica.textContent = `${formatValue(silica)} mg/m³`
    resultPorcentagem.textContent = `${porcentagem} %`
    resultLimite.textContent = `${lt} mg/m³`
    viewResult.id = ""
}


const calcPoeiraRespiravel = (poeira, silica) =>  {
    if (Number.isFinite(pr) && Number.isFinite(silica)) {
        let porcentagem = (silica * 100) / pr
        let lt = 8 / (porcentagem + 2) 
        porcentagem = formatValue(porcentagem)
        lt = formatValue(lt)
        return [porcentagem, lt]
    }
}

const calcPoeiraTotal = (poeira, silica) =>  {
    if (Number.isFinite(pr) && Number.isFinite(silica)) {
        let porcentagem = (silica * 100) / pr
        let lt = 24 / (porcentagem + 3) 
        porcentagem = formatValue(porcentagem)
        lt = formatValue(lt)
        return [porcentagem, lt]
    }
}


closeSwitch.addEventListener("click", (e) => {
   e.preventDefault
  if(viewResult){
    viewResult.id = "hidden"
  }
  
})