const generateArrayBtn = document.querySelector(".generate-array-btn");
const mergeSortBtn = document.querySelector(".merge-sort-btn");
const blocksContainer = document.querySelector(".blocks-container");
const outputText = document.querySelector(".output-text");
const speedInputRange = document.querySelector("#speed");
// const line1 = document.querySelector(".line1");
// const line2 = document.querySelector(".line2");
// const line3 = document.querySelector(".line3");
// const line4 = document.querySelector(".line4");
// const line5 = document.querySelector(".line5");
// const line6 = document.querySelector(".line6");
// const line7 = document.querySelector(".line7");

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

async function mergeSort(arr, left, right) {
  const bars = document.querySelectorAll(".bar");
  const barValues = document.querySelectorAll(".bar-value");
  const speed = parseInt(speedInputRange.value);

  mergeSortBtn.classList.add('active')
  if(mergeSortBtn.classList.contains('active')){
    mergeSortBtn.disabled = true;
  }
  generateArrayBtn.classList.add('active')
    if(generateArrayBtn.classList.contains('active')){
      generateArrayBtn.disabled = true;
    }


  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  // line1.classList.add("blink");
  await mergeSort(arr, left, mid);
  // line2.classList.add("blink");
  await mergeSort(arr, mid + 1, right);
  // line3.classList.add("blink");

  await merge(arr, left, mid, right, bars, barValues, speed);

  // line4.classList.add("blink");

  mergeSortBtn.classList.remove('active')
    if(mergeSortBtn.classList.contains('active')){
      mergeSortBtn.disabled = true;
    } else {
      mergeSortBtn.disabled = false;
    }

    generateArrayBtn.classList.remove('active')
    if(generateArrayBtn.classList.contains('active')){
      generateArrayBtn.disabled = true;
    } else {
      generateArrayBtn.disabled = false;
    }
}

async function merge(arr, left, mid, right, bars, barValues, speed) {
  let n1 = mid - left + 1;
  let n2 = right - mid;

  const leftArray = new Array(n1);
  const rightArray = new Array(n2);

  for (let i = 0; i < n1; i++) leftArray[i] = arr[left + i];
  for (let i = 0; i < n2; i++) rightArray[i] = arr[mid + 1 + i];

  let i = 0,
    j = 0,
    k = left;

  while (i < n1 && j < n2) {
    bars[k].classList.add("selected");
    barValues[k].classList.add("selected");
    await sleep(speed);

    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      bars[k].style.height = `${leftArray[i] * 2}px`;
      bars[k].setAttribute("data-value", leftArray[i]);
      barValues[k].textContent = leftArray[i];
      i++;
    } else {
      arr[k] = rightArray[j];
      bars[k].style.height = `${rightArray[j] * 2}px`;
      bars[k].setAttribute("data-value", rightArray[j]);
      barValues[k].textContent = rightArray[j];
      j++;
    }

    bars[k].classList.remove("selected");
    barValues[k].classList.remove("selected");
    k++;
  }

  while (i < n1) {
    bars[k].classList.add("selected");
    barValues[k].classList.add("selected");

    arr[k] = leftArray[i];
    bars[k].style.height = `${leftArray[i] * 2}px`;
    bars[k].setAttribute("data-value", leftArray[i]);
    barValues[k].textContent = leftArray[i];
    i++;
    k++;

    await sleep(speed);
    bars[k - 1].classList.remove("selected");
    barValues[k - 1].classList.remove("selected");
  }

  while (j < n2) {
    bars[k].classList.add("selected");
    barValues[k].classList.add("selected");

    arr[k] = rightArray[j];
    bars[k].style.height = `${rightArray[j] * 2}px`;
    bars[k].setAttribute("data-value", rightArray[j]);
    barValues[k].textContent = rightArray[j];
    j++;
    k++;

    await sleep(speed);
    bars[k - 1].classList.remove("selected");
    barValues[k - 1].classList.remove("selected");
  }
}

async function startMergeSort() {
  const bars = document.querySelectorAll(".bar");
  const barValues = document.querySelectorAll(".bar-value");

  outputText.textContent = "Sorting the array using Merge Sort...";
  outputText.style.color = "white";

  await mergeSort(generatedArray, 0, generatedArray.length - 1);

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "green";
    barValues[k].style.backgroundColor = "green";
  }

  
  // line1.classList.remove("blink");
  // line2.classList.remove("blink");
  // line3.classList.remove("blink");
  // line4.classList.remove("blink");
  // line5.classList.remove("blink");
  // line6.classList.remove("blink");
  // line7.classList.remove("blink");

  

  outputText.textContent = "Sorting completed!";
  outputText.style.color = "lightgreen";
}

generateArrayBtn.addEventListener("click", () => {
  generateArray();
  outputText.textContent = "";
});

mergeSortBtn.addEventListener("click", () => {
  startMergeSort();
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

const bubbleBtn = document.querySelector(".bubble-btn");
const selectionBtn = document.querySelector(".selection-btn");
const insertionBtn = document.querySelector(".insertion-btn");
const quickBtn = document.querySelector(".quick-btn");

const logoText = document.querySelector(".logo-text");
logoText.addEventListener("click", (e) => {
  window.location.href = "../index.html";
});

selectionBtn.addEventListener("click", (e) => {
  window.location.href = "../selectionSort/index.html";
  resetBarColors()
});
insertionBtn.addEventListener("click", (e) => {
  window.location.href = "../insertionSort/index.html";
});
bubbleBtn.addEventListener("click", (e) => {
  window.location.href = "../bubbleSort/index.html";
});
quickBtn.addEventListener("click", (e) => {
  window.location.href = "../quickSort/index.html";
});