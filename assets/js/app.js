const RSliderElement = document.querySelector('#r-slider');
const GSliderElement = document.querySelector('#g-slider');
const BSliderElement = document.querySelector('#b-slider');
const RGBOutputCopyButton = document.querySelector('#rgb-output-copy-button');
const HexOutputCopyButton = document.querySelector('#hex-output-copy-button');

/* Se o valor possuir um dígito, receberá 0 antes dele, passando a ter dois */
const forTwoDigits = (value) => value < 10 ? '0' + value : value;

/* Atualiza o código de cor RGB da saída */
const updateRGBOutput = (RValue, GValue, BValue) => {
  const RGBOutputElement = document.querySelector('#rgb-output');
  const RGBOutputCopyIconElement = document.querySelector('#rgb-output-copy-icon');

  RGBOutputElement.value = `rgb(${RValue}, ${GValue}, ${BValue});`;
  RGBOutputCopyIconElement.classList.replace('bi-clipboard-check', 'bi-clipboard');
}

/* Atualiza o código de cor hexadecimal da saída */
const updateHexOutput = (RValue, GValue, BValue) => {
  const HexOutputElement = document.querySelector('#hex-output');
  const HexOutputCopyIconElement = document.querySelector('#hex-output-copy-icon');

  /* As letras são minúsculas, por padrão, mas pode ser utilizado ".toUpperCase()" para transformá-las */
  let RHexValue = forTwoDigits(RValue.toString(16)); /* 00 a ff*/
  let GHexValue = forTwoDigits(GValue.toString(16));
  let BHexValue = forTwoDigits(BValue.toString(16));

  HexOutputElement.value = `#${RHexValue}${GHexValue}${BHexValue};`;
  HexOutputCopyIconElement.classList.replace('bi-clipboard-check', 'bi-clipboard');
}

/* Atualiza a cor de fundo da página, de acordo com a combinação dos sliders */
const updateBackgroundColor = (RValue, GValue, BValue) => {
  const bodyElement = document.querySelector('body');

  bodyElement.style.backgroundColor = `rgb(${RValue}, ${GValue}, ${BValue})`;
}

const getColorValues = () => {
  /* Conversão simples de string para número " */
  let RValue = +RSliderElement.value;
  let GValue = +GSliderElement.value;
  let BValue = +BSliderElement.value;
  
  updateBackgroundColor(RValue, GValue, BValue);
  updateRGBOutput(RValue, GValue, BValue);
  updateHexOutput(RValue, GValue, BValue);
}

/* Copia código de cor RGB para a área de transferência */
const copyRBG = () => {
  const RGBOutputElement = document.querySelector('#rgb-output');
  const RGBOutputCopyIconElement = document.querySelector('#rgb-output-copy-button');
  let text = RGBOutputElement.value;

  /* Necessário para que a cópia funcione */
  RGBOutputElement.focus(); /* Só é possível utilizar "focus" em inputs */

  navigator.clipboard.writeText(text)
  .then(() => {
    RGBOutputCopyIconElement.classList.replace('bi-clipboard', 'bi-clipboard-check');
    alert('Código RGB copiado para área de transferência!');
  })
  /* Não há tratamento de erros */
  .catch((error) => {
    console.error('Falha ao copiar:', error);
    alert('Falha ao copiar para a área de transferência.');
  });
}

/* Copia código de cor RGB para a área de transferência */
const copyHex = () => {
  const HexOutputElement = document.querySelector('#hex-output');
  const HexOutputCopyIconElement = document.querySelector('#hex-output-copy-button');
  let text = HexOutputElement.value;

  HexOutputElement.focus();

  navigator.clipboard.writeText(text)
  .then(() => {
    HexOutputCopyIconElement.classList.replace('bi-clipboard', 'bi-clipboard-check');
    alert('Código hexadecimal copiado para área de transferência!');
  })
  .catch((error) => {
    console.error('Falha ao copiar:', error);
    alert('Falha ao copiar para a área de transferência.');
  });
}

/* Os eventos "input" e "change" são semelhantes e funcionam, porém o primeiro é melhor para este caso */
RSliderElement.addEventListener('input', getColorValues);
GSliderElement.addEventListener('input', getColorValues);
BSliderElement.addEventListener('input', getColorValues);
RGBOutputCopyButton.addEventListener('click', copyRBG);
HexOutputCopyButton.addEventListener('click', copyHex);