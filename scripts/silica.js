import formatValue from "./formatValue.js"

const buttonPorcentagem = document.getElementById("buttonPorcentagem")
const buttonLimite = document.getElementById("buttonLimite")
const viewResult = document.getElementById("hidden")
const closeSwitch = document.getElementById("close-popup")
//Primeiro popup de result
const typePoeira = document.getElementById("typePoeira")
const titleSilica = document.getElementById("titleSilica")
const titleQuartzo = document.getElementById("titleQuartzo")
const titleLimite = document.getElementById("titleLimite")
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
        return presetResultsForm(true, exposition, porcentagem, lt, poeira, silica)
    } else if (!exposition) {
        let [porcentagem, lt] = calcPoeiraTotal(poeira, silica)
        return presetResultsForm(true, exposition, porcentagem, lt, poeira, silica)
    } else {
    console.log(`Valor invalido`)
    }
})


buttonLimite.addEventListener("click", (e) => {
    e.preventDefault()

    let poeiraRespiravel = document.getElementById("respiravel").checked
    let porcentagemValue = document.getElementById("porcentagemSilica").value.replace(",", ".")
    let porcentagem = Number(porcentagemValue)
    let exposition = poeiraRespiravel ? true : false  
    let lt = calcLimite(exposition, porcentagem)
    return presetResultsForm(false, exposition, porcentagem, lt, undefined, undefined)
    
    

})



const presetResultsForm = (typeCalc, type, porcentagem, lt, poeira, silica) => {
    if (typeCalc) {
        typePoeira.textContent = `Poeira ${type ? "Respirável" : "Total"}:`
        titleSilica.textContent = `Sílica Livre Cristalina:`
        titleQuartzo.textContent = `% Quartzo Sílica:`
        titleLimite.textContent = `Limite de Tolerância:`
        resultPoeira.textContent = `${formatValue(poeira)} mg/m³`
        resultSilica.textContent = `${formatValue(silica)} mg/m³`
        resultPorcentagem.textContent = `${porcentagem} %`
        resultLimite.textContent = `${lt} mg/m³`
        viewResult.id = ""
        document.getElementById("poeira").value = ""
        document.getElementById("silica").value = ""
    } else if (!typeCalc) {
        typePoeira.textContent = ``
        titleSilica.textContent = ``    
        titleQuartzo.textContent = `% Quartzo Sílica:`
        titleLimite.textContent = `Limite de Tolerância:`
        resultPoeira.textContent = ``
        resultSilica.textContent = ``
        resultPorcentagem.textContent = `${porcentagem} %`
        resultLimite.textContent = `${formatValue(lt)} mg/m³`
        viewResult.id = ""
        document.getElementById("porcentagemSilica").value = ""
    }
    
}



const calcLimite = (type, porcentagem) => {
    if (type) {
        let lt = 8 / (porcentagem + 2) 
        return lt
    } else if (!type) {
        let lt = 24 / (porcentagem + 3) 
        return lt
    } else {
        console.log(`Valor invalido`)
    }
}


const calcPoeiraRespiravel = (poeira, silica) =>  {
    if (Number.isFinite(poeira) && Number.isFinite(silica)) {
        let porcentagem = (silica * 100) / poeira
        let lt = 8 / (porcentagem + 2) 
        porcentagem = formatValue(porcentagem)
        lt = formatValue(lt)
        return [porcentagem, lt]
    }
}

const calcPoeiraTotal = (poeira, silica) =>  {
    if (Number.isFinite(poeira) && Number.isFinite(silica)) {
        let porcentagem = (silica * 100) / poeira
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