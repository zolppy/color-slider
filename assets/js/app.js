const redContainer = document.querySelector('#red');
const greenContainer = document.querySelector('#green');
const blueContainer = document.querySelector('#blue');
const copyButton = document.querySelector('#copy-btn');

const colors = () => {
  let redValue = redContainer.value;
  let greenValue = greenContainer.value;
  let blueValue = blueContainer.value;
  const bodyElement = document.querySelector('body');
  const outputElement = document.querySelector('#output');
  const copyIconElement = document.querySelector('#copy-icon');


  bodyElement.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
  outputElement.value = `rgb(${redValue}, ${greenValue}, ${blueValue})`;

  copyIconElement.classList.replace('bi-clipboard-check', 'bi-clipboard');
}

const copy = () => {
  const outputElement = document.querySelector('#output');
  const copyIconElement = document.querySelector('#copy-icon');
  let text = outputElement.value;

  outputElement.focus();

  navigator.clipboard.writeText(text)
  .then(() => {
    copyIconElement.classList.replace('bi-clipboard', 'bi-clipboard-check');
    alert('Copiado para área de transferência!');
  })
  .catch((error) => {
    console.error('Falha ao copiar:', error);
    alert('Falha ao copiar para a área de transferência.');
  });
}

redContainer.addEventListener('change', colors);
greenContainer.addEventListener('change', colors);
blueContainer.addEventListener('change', colors);
copyButton.addEventListener('click', copy);