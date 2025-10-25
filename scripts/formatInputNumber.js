const formatNumber = document.getElementsByClassName("format-number")

function ativarMascaraUniversal(formatNumber) {
  document.addEventListener('input', function(e) {
    if (e.target.matches(formatNumber)) {
      formatInputNumber(e.target);
    }
  });
}

function formatInputNumber (input) {
  let valor = input.value.replace(/\D/g, ""); 

  if (valor.length === 0) {
      input.value = "";
      return;
  }

  // 1. Insere a vírgula duas posições antes do final (simulando centavos)
  let valorFormatado = valor.replace(/(\d+)(\d{2})$/, '$1,$2'); 
  
  // 2. Se a vírgula estiver no início (ex: '1' -> ',01'), adiciona zero
  if (valorFormatado.startsWith(',')) {
      valorFormatado = '0' + valorFormatado;
  }
  
  // 3. Adiciona separador de milhar (ponto) na parte inteira
  valorFormatado = valorFormatado.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  input.value = valorFormatado;
}

document.addEventListener('DOMContentLoaded', () => {
  ativarMascaraUniversal('.format-number');
});