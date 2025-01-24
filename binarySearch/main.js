const generateArrayBtn = document.querySelector(".generate-array-btn");
const binarySearchBtn = document.querySelector(".binary-search-btn");
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
const line5 = document.querySelector(".line5");
const line6 = document.querySelector(".line6");
const line7 = document.querySelector(".line7");
const line8 = document.querySelector(".line8");

let generatedArray = [];

function generateArray() {
  blocksContainer.innerHTML = "";

  const screenWidth = window.innerWidth;
  blocksContainer.innerHTML = "";
  const barCount = screenWidth <= 768 ? 20 : 25;
  generatedArray = Array.from(
    { length: barCount },
    () => Math.floor(Math.random() * 100) + 1
  );

  generatedArray.sort((a, b) => a - b);

  generatedArray.forEach((num) => {
    const blocks = document.createElement("div");
    blocks.style.display = "flex";
    blocks.style.flexDirection = "column";
    blocks.style.alignItems = "center";

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

async function binarySearch() {
  const bars = document.querySelectorAll(".bar");
  const barValues = document.querySelectorAll(".bar-value");
  const target = parseInt(searchInput.value);
  const searchSpeed = speedInputRange.value;

  line4.style.fontWeight = "";
  line4.style.color = "white";
  line8.style.fontWeight = "";
  line8.style.color = "white";

  resetBarColors();

  if (isNaN(target)) {
    outputText.textContent = "Please enter a valid number!";
    outputText.style.color = "red";
    return;
  }

  outputText.textContent = `Searching for ${target}...`;
  outputText.style.color = "white";

  let left = 0;
  let right = generatedArray.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const midBar = bars[mid];
    const midBarValue = barValues[mid];
    midBar.style.backgroundColor = "yellow";
    midBarValue.style.backgroundColor = "yellow";
    setTimeout(() => line1.classList.add("blink"), searchSpeed);

    await new Promise((resolve) => setTimeout(resolve, searchSpeed));

    const midValue = parseInt(midBar.getAttribute("data-value"));

    if (midValue === target) {
      midBar.style.backgroundColor = "green";
      midBarValue.style.backgroundColor = "green";
      outputText.textContent = `Element ${target} found at index ${mid}!`;
      setTimeout(() => line3.classList.add("blink"), searchSpeed);

      line4.style.fontWeight = "bold";
      line4.style.color = "green";
      removeAllBlinkingClasses(searchSpeed);
      return;
    } else if (midValue < target) {
      left = mid + 1;
      setTimeout(() => line2.classList.remove("blink"), searchSpeed);
      setTimeout(() => line5.classList.add("blink"), searchSpeed);
      setTimeout(() => line6.classList.add("blink"), searchSpeed);
    } else {
      right = mid - 1;
      setTimeout(() => line7.classList.add("blink"), searchSpeed);
    }

    midBar.style.backgroundColor = "";
    midBarValue.style.backgroundColor = "";
  }

  line8.style.fontWeight = "bold";
  line8.style.color = "red";
  outputText.textContent = `Element ${target} not found. Returned value: (-1)`;

  removeAllBlinkingClasses(searchSpeed);
}

function removeAllBlinkingClasses(delay) {
  setTimeout(() => {
    line1.classList.remove("blink");
    line2.classList.remove("blink");
    line3.classList.remove("blink");
    line5.classList.remove("blink");
    line6.classList.remove("blink");
    line7.classList.remove("blink");
  }, delay);
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

binarySearchBtn.addEventListener("click", () => {
  binarySearch();
  setTimeout(line1.classList.remove("blink"));
  setTimeout(line2.classList.remove("blink"));
  setTimeout(line3.classList.remove("blink"));
  setTimeout(line5.classList.remove("blink"));
  setTimeout(line6.classList.remove("blink"));
  setTimeout(line7.classList.remove("blink"));
});

const logoText = document.querySelector(".logo-text");
logoText.addEventListener("click", (e) => {
  window.location.href = "../index.html";
});

const linearBtn = document.querySelector(".linear-btn");

linearBtn.addEventListener("click", (e) => {
  window.location.href = "../linearSearch/index.html";
});