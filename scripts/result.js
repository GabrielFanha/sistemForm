const result = () => {
  const body = document.querySelector('body');
  if (body) {
    const view = document.createElement('div')
    view.className = 'hidden'
    const containerResult = document.createElement('div')
    containerResult.className = "container-result"
    const containerTitle = document.createElement('div')
    containerTitle.className = "container-title"
    const title = document.createElement("div")
    title.className = "title"
    const img = document.createElement("img")
    img.src = "../assets/logo.svg"
    const txTitle = document.createElement("p")
    txTitle.className = "tx-xl"
    const closePopup = document.createElement("img")
    closePopup.src = "../assets/close.svg"
    closePopup.id = "close-popup"
    const divisor = document.createElement("div")
    divisor.className = "divisor"
    const containerItem = document.createElement("div")
    containerItem.className = "container-item"
    const item = document.createElement("div")
    item.className = "item"
    const nameResult = document.createElement("p")
    nameResult.className = "name-result tx-md"
    const result = document.createElement("span")
    result.className = "result tx-md"

    // passa os resultados
    nameResult.textContent = "NEN de 12 horas:"
    result.textContent = "77,90 dB(A)"

    //Ordenar as tags
    view.appendChild(containerItem)
    containerItem.appendChild(containerResult)
    containerResult.appendChild(containerTitle, divisor, containerItem)
    containerTitle.appendChild(title, closePopup)
    title.appendChild(img, txTitle)
    containerItem.appendChild(item)
    item.appendChild(nameResult, result)



  } else {
    console.error('Elemento com a classe .container-item não encontrado.');
  }

}