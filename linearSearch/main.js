const generateArrayBtn = document.querySelector(".generate-array-btn");
const linearSearchBtn = document.querySelector(".linear-search-btn");
const blocksContainer = document.querySelector(".blocks-container");
const algoContainer = document.querySelector(".algo-container");
const searchInput = document.querySelector(".search-input");
const outputText = document.querySelector(".output-text");
const speedInputRange = document.querySelector("#speed");
const codeText = document.querySelector(".algo");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");
const line4 = document.querySelector(".line4");


let generatedArray = [];

function generateArray() {
  const screenWidth = window.innerWidth;
  blocksContainer.innerHTML = "";

  const barCount = screenWidth <= 768 ? 20 : 25;

  generatedArray = Array.from(
    { length: barCount },
    () => Math.floor(Math.random() * 100) + 1
  );

  generatedArray.forEach((num) => {
    const blocks = document.createElement("div");
    blocks.style.display = "flex";
    blocks.style.flexDirection = "column";
    blocks.style.alignItems = "center";

    // Create the bar
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${num * 2}px`;
    bar.setAttribute("data-value", num);

    const barValue = document.createElement("div");
    barValue.className = "bar-value";
    barValue.textContent = num;

    blocks.appendChild(bar);
    blocks.appendChild(barValue);

    blocksContainer.appendChild(blocks);
  });
}



async function linearSearch() {
  const bars = document.querySelectorAll(".bar");
  const barValues = document.querySelectorAll(".bar-value");
  const target = parseInt(searchInput.value);
  const searchSpeed = speedInputRange.value;

  line4.style.fontWeight = "";
  line4.style.color = "white";
  line3.style.fontWeight = "";
  line3.style.color = "white";

  resetBarColors()

  if (isNaN(target)) {
    outputText.textContent = "Please enter a valid number!";
    outputText.style.color = "red";
    return;
  }

  outputText.textContent = `Searching for ${target}...`;
  outputText.style.color = "white";

  for (let i = 0; i < generatedArray.length; i++) {
    const currentBar = bars[i];
    const currentBarValue = barValues[i];
    currentBar.style.backgroundColor = "yellow";
    currentBarValue.style.backgroundColor = "red";
    setTimeout(line1.classList.add('blink'), searchSpeed)
    await new Promise((resolve) => setTimeout(resolve, searchSpeed));

    setTimeout(line2.classList.add('blink'), searchSpeed)

    const barValue = parseInt(currentBar.getAttribute("data-value"));
    if (barValue === target) {
      currentBar.style.backgroundColor = "green";
      currentBarValue.style.backgroundColor = "green";
      outputText.textContent = `Element ${target} found at index ${i}!`;

      line3.style.fontWeight = 'bold'
      line3.style.color = 'green'
      setTimeout(line3.classList.add('blink'), searchSpeed)
      setTimeout(line1.classList.remove('blink'), searchSpeed)
        setTimeout(line2.classList.remove('blink'), searchSpeed)
        setTimeout(line3.classList.remove('blink'), searchSpeed)
        setTimeout(line4.classList.remove('blink'), searchSpeed)
      return;
      
    }

    currentBar.style.backgroundColor = "";
    currentBarValue.style.backgroundColor= ""
  }

  line4.style.fontWeight = 'bold'
  line4.style.color = 'red'
  outputText.textContent = `Element ${target} not found. Returned value: (-1)`;

  setTimeout(line1.classList.remove('blink'), searchSpeed)
  setTimeout(line2.classList.remove('blink'), searchSpeed)
  setTimeout(line3.classList.remove('blink'), searchSpeed)
}

function resetBarColors() {
  const bars = document.querySelectorAll(".bar");
  const barValues = document.querySelectorAll(".bar-value");

  bars.forEach((bar) => {
    bar.style.backgroundColor = "skyblue";
  });

  barValues.forEach((barValue) => {
    barValue.style.backgroundColor = "white";
  });
}

generateArrayBtn.addEventListener("click", () => {
  generateArray();
});

linearSearchBtn.addEventListener("click", () => {
  linearSearch();
  setTimeout(line1.classList.remove("blink"));
  setTimeout(line2.classList.remove("blink"));
  setTimeout(line3.classList.remove("blink"));
});

const logoText = document.querySelector(".logo-text");
logoText.addEventListener("click", (e) => {
  window.location.href = "../index.html";
});

const binaryBtn = document.querySelector(".binary-btn");

binaryBtn.addEventListener("click", (e) => {
  window.location.href = "../binarySearch/index.html";
});