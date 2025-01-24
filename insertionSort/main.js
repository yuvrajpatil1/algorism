const generateArrayBtn = document.querySelector(".generate-array-btn");
const insertionSortBtn = document.querySelector(".insertion-sort-btn");
const blocksContainer = document.querySelector(".blocks-container");
const outputText = document.querySelector(".output-text");
const speedInputRange = document.querySelector("#speed");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");
const line4 = document.querySelector(".line4");

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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function swap(index1, index2) {
  const bars = document.querySelectorAll(".bar");
  const barValues = document.querySelectorAll(".bar-value");
  const bar1 = bars[index1];
  const barValue1 = barValues[index1];
  const bar2 = bars[index2];
  const barValue2 = barValues[index2];

  bar1.classList.add("swap");
  barValue1.classList.add("swap");
  bar2.classList.add("swap");
  barValue2.classList.add("swap");

  const tempHeight = bar1.style.height;
  const tempValue = bar1.getAttribute("data-value");
  const tempText = barValue1.textContent;

  bar1.style.height = bar2.style.height;
  bar1.setAttribute("data-value", bar2.getAttribute("data-value"));
  barValue1.textContent = barValue2.textContent;

  bar2.style.height = tempHeight;
  bar2.setAttribute("data-value", tempValue);
  barValue2.textContent = tempText;

  bar1.classList.remove("swap");
  barValue1.classList.remove("swap");
  bar2.classList.remove("swap");
  barValue2.classList.remove("swap");
}

async function insertionSort() {
  const bars = document.querySelectorAll(".bar");
  const barValues = document.querySelectorAll(".bar-value");
  const speed = parseInt(speedInputRange.value);

  insertionSortBtn.classList.add('active')
  if(insertionSortBtn.classList.contains('active')){
    insertionSortBtn.disabled = true;
  }
  generateArrayBtn.classList.add('active')
    if(generateArrayBtn.classList.contains('active')){
      generateArrayBtn.disabled = true;
    }

  outputText.textContent = "Sorting the array using Insertion Sort...";
  outputText.style.color = "white";

  for (let i = 1; i < generatedArray.length; i++) {
    let key = generatedArray[i];
    let j = i - 1;

    line1.classList.add("blink");
    bars[i].classList.add("selected");
    barValues[i].classList.add("selected");
    await sleep(speed);

    while (j >= 0 && generatedArray[j] > key) {
      line2.classList.add("blink");
      bars[j + 1].classList.add("swap");
      barValues[j + 1].classList.add("swap");

      await swap(j, j + 1);

      generatedArray[j + 1] = generatedArray[j];
      j = j - 1;

      line3.classList.add("blink");
      line4.classList.add("blink");
      bars[j + 1].classList.remove("swap");
      barValues[j + 1].classList.remove("swap");
    }

    generatedArray[j + 1] = key;
    bars[j + 1].classList.remove("selected");
    barValues[j + 1].classList.remove("selected");
    await sleep(speed);
  }
  
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "green";
    barValues[k].style.backgroundColor = "green";
  }

  line1.classList.remove("blink");
  line2.classList.remove("blink");
  line3.classList.remove("blink");
  line4.classList.remove("blink");

  insertionSortBtn.classList.remove('active')
  if(insertionSortBtn.classList.contains('active')){
    insertionSortBtn.disabled = true;
  } else {
    insertionSortBtn.disabled = false;
  }

  generateArrayBtn.classList.remove('active')
    if(generateArrayBtn.classList.contains('active')){
      generateArrayBtn.disabled = true;
    } else {
      generateArrayBtn.disabled = false;
    }

  outputText.textContent = "Sorting completed!";
  outputText.style.color = "lightgreen";
}

generateArrayBtn.addEventListener("click", () => {
  generateArray();
  outputText.textContent = "";
});

insertionSortBtn.addEventListener("click", () => {
  insertionSort();
});

function resetBarColors() {
  const bars = document.querySelectorAll(".bar");
  const barValues = document.querySelectorAll(".bar-value");

  bars.forEach((bar) => {
    bar.style.backgroundColor = "";
  });

  barValues.forEach((barValue) => {
    barValue.style.backgroundColor = "";
  });
}

const selectionBtn = document.querySelector(".selection-btn");
const bubbleBtn = document.querySelector(".bubble-btn");
const mergeBtn = document.querySelector(".merge-btn");
const quickBtn = document.querySelector(".quick-btn");

const logoText = document.querySelector(".logo-text");
logoText.addEventListener("click", (e) => {
  window.location.href = "../index.html";
});

bubbleBtn.addEventListener("click", (e) => {
  window.location.href = "../bubbleSort/index.html";
  resetBarColors()
});
selectionBtn.addEventListener("click", (e) => {
  window.location.href = "../selectionSort/index.html";
});
mergeBtn.addEventListener("click", (e) => {
  window.location.href = "../mergeSort/index.html";
});
quickBtn.addEventListener("click", (e) => {
  window.location.href = "../quickSort/index.html";
});