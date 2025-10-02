let switchMenu = document.querySelector("#switch-menu")
let menuLinks = document.querySelector("#menu-links")

switchMenu.addEventListener("click", (e) => {
  e.preventDefault()
  if (menuLinks.classList.value === "hidden") {
    menuLinks.classList.remove("hidden")
    menuLinks.classList.add("container-itens")
  } else {
    menuLinks.classList.remove("container-itens")
    menuLinks.classList.add("hidden")
  }
})