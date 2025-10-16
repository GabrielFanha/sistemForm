import formatValue from "./formatValue.js"

const button = document.getElementById("button")
const viewResult = document.getElementById("hidden")
const closeSwitch = document.getElementById("close-popup")
const resultNEN6 = document.getElementById("nen6")
const resultNEN8 = document.getElementById("nen8")
const resultNEN12 = document.getElementById("nen12")
const resultNEN = document.getElementById("nen")
const resultLAVG = document.getElementById("lavg")
const resultTWA = document.getElementById("twa")
const resultDOSE = document.getElementById("result-dose")
const resultEST = document.getElementById("est-dose")
const resultAmost = document.getElementById("amostragem-time")
const resultExposition = document.getElementById("exposition-time")


button.addEventListener("click", (e) => {
  e.preventDefault()

  // valor dos inputs
  let doseInput = document.getElementById("dose")
  let amostragemInput = document.getElementById("amostragem")
  let expositionInput = document.getElementById("exposition")
  
  
  if ( doseInput && amostragemInput && expositionInput ) {
    let dose = doseInput.value.replace(",",".")
    dose = Number(dose)
    let ta = Number(amostragemInput.value)
    let te = Number(expositionInput.value)

    // calculo dos valores
    let lavg = calculoLAVG(ta, dose)
    let twa = calculoTWA(dose)
    let nen = calculoNEN(te, lavg)
    let nen6 = calculoNEN(360, lavg)
    let nen8 = calculoNEN(480, lavg)
    let nen12 = calculoNEN(720, lavg)

    // formatação dos resultados
    lavg = formatValue(lavg)
    twa = formatValue(twa)
    nen = formatValue(nen)
    nen6 = formatValue(nen6)
    nen8 = formatValue(nen8)
    nen12 = formatValue(nen12)
    dose = formatValue(dose)
    let estDose = calcularDoseEst(dose, ta)
    

    //Passar Resultado
    resultNEN6.textContent = `${nen6} dB(A)`
    resultNEN8.textContent = `${nen8} dB(A)`
    resultNEN12.textContent = `${nen12} dB(A)`
    resultNEN.textContent = `${nen} dB(A)`
    resultLAVG.textContent = `${lavg} dB(A)`
    resultTWA.textContent = `${twa} dB(A)`
    resultDOSE.textContent = `${dose}`
    resultEST.textContent = calcularDoseEst(dose, ta)
    resultAmost.textContent = `${ta} minutos`
    resultExposition.textContent = `${te} minutos`
    viewResult.id = ""

    // limpar inputs
    doseInput.value = ""
    amostragemInput.value = ""
    expositionInput.value = ""
  }
})


closeSwitch.addEventListener("click", (e) => {
   e.preventDefault
  if(viewResult){
    viewResult.id = "hidden"
  }
})


const calculoNEN = ( te, lavg) => {
  let ne = lavg
  let nen = ne + 10 * Math.log10(te/480);
  return nen
}

const calculoLAVG = (ta, dose) => {
  ta = ta / 60
  let lavg = 16.61 * Math.log10(((dose/100) * 8)/ta) + 85
  return lavg
}

const calculoTWA = (dose) => {
  let twa = 16.61 * Math.log10(dose / 100) + 85;
  return twa
}

const calcularResultadoEstDose = (doseEst) => {
  let resultadoEstDose = 16.61 * Math.log10(doseEst / 100) + 85
  return resultadoEstDose
}

const calcularDoseEst = (dose, ta) => {
  
  if (ta === 480) {
    let doseEst = dose
    return doseEst
  } else if (ta > 480) {

    let lavg = calculoLAVG(ta, dose)
    let doseEst = dose
    let resultEstDose = calcularResultadoEstDose(doseEst)
    lavg = lavg.toFixed(2)
    resultEstDose = resultEstDose.toFixed(2)

    for (doseEst; resultEstDose !== lavg; doseEst = doseEst - 0.01) {
      resultEstDose = calcularResultadoEstDose(doseEst)
      resultEstDose = resultEstDose.toFixed(2)
    }
    doseEst = doseEst.toFixed(2)
    doseEst = String(doseEst)
    doseEst = doseEst.replace(/\./g, ",")
    return doseEst
    
  } else if (ta < 480) {
    let lavg = calculoLAVG(ta, dose)
    let doseEst = dose
    let resultEstDose = calcularResultadoEstDose(doseEst)
    lavg = lavg.toFixed(2)
    resultEstDose = resultEstDose.toFixed(2)

    for (doseEst; resultEstDose !== lavg; doseEst = doseEst + 0.01) {
      resultEstDose = calcularResultadoEstDose(doseEst)
      resultEstDose = resultEstDose.toFixed(2)
    }
    doseEst = doseEst.toFixed(2)
    doseEst = String(doseEst)
    doseEst = doseEst.replace(/\./g, ",")
    return doseEst
  }
}


