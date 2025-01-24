const generateArrayBtn = document.querySelector(".generate-array-btn");
const quickSortBtn = document.querySelector(".quick-sort-btn");
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

async function partition(arr, low, high) {
  const bars = document.querySelectorAll(".bar");
  const barValues = document.querySelectorAll(".bar-value");
  const speed = parseInt(speedInputRange.value);


  let pivot = arr[high];
  bars[high].classList.add("pivot");

  let i = low - 1;

  for (let j = low; j < high; j++) {
    bars[j].classList.add("selected");

    await sleep(speed);

    if (arr[j] < pivot) {
      i++;
      await swapBars(i, j, bars, barValues);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    bars[j].classList.remove("selected");
  }

  await swapBars(i + 1, high, bars, barValues);
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  bars[high].classList.remove("pivot");
  bars[i + 1].classList.add("sorted");

  return i + 1;
}

async function quickSort(arr, low, high) {
  const bars = document.querySelectorAll(".bar");

  quickSortBtn.classList.add('active')
  if(quickSortBtn.classList.contains('active')){
    quickSortBtn.disabled = true;
  }
  generateArrayBtn.classList.add('active')
    if(generateArrayBtn.classList.contains('active')){
      generateArrayBtn.disabled = true;
    }


  if (low < high) {
    // line1.classList.add("blink");
    const pi = await partition(arr, low, high);

    // line2.classList.add("blink");
    await quickSort(arr, low, pi - 1);

    // line3.classList.add("blink");
    await quickSort(arr, pi + 1, high);
  }

  // Turn all unsorted bars to green if sorting is done
  if (low === 0 && high === arr.length - 1) {
    for (let k = 0; k < bars.length; k++) {
      if (!bars[k].classList.contains("sorted")) {
        bars[k].classList.add("sorted");
        bars[k].style.backgroundColor = "green";
      }
    }
  }

  quickSortBtn.classList.remove('active')
    if(quickSortBtn.classList.contains('active')){
      quickSortBtn.disabled = true;
    } else {
      quickSortBtn.disabled = false;
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

async function swapBars(index1, index2, bars, barValues) {
  bars[index1].classList.add("swap");
  barValues[index1].classList.add("swap");
  bars[index2].classList.add("swap");
  barValues[index2].classList.add("swap");

  const tempHeight = bars[index1].style.height;
  const tempValue = bars[index1].getAttribute("data-value");
  const tempText = barValues[index1].textContent;

  bars[index1].style.height = bars[index2].style.height;
  bars[index1].setAttribute("data-value", bars[index2].getAttribute("data-value"));
  barValues[index1].textContent = barValues[index2].textContent;

  bars[index2].style.height = tempHeight;
  bars[index2].setAttribute("data-value", tempValue);
  barValues[index2].textContent = tempText;

  bars[index1].classList.remove("swap");
  barValues[index1].classList.remove("swap");
  bars[index2].classList.remove("swap");
  barValues[index2].classList.remove("swap");
}

async function startQuickSort() {
  const bars = document.querySelectorAll(".bar");
  const barValues = document.querySelectorAll(".bar-value");

  outputText.textContent = "Sorting the array using Quick Sort...";
  outputText.style.color = "white";

  await quickSort(generatedArray, 0, generatedArray.length - 1);

  // Turn all bars and values green after sorting
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "green";
    barValues[k].style.backgroundColor = "green";
  }

  // Remove any remaining blinking styles
  // line1.classList.remove("blink");
  // line2.classList.remove("blink");
  // line3.classList.remove("blink");
  // line4.classList.remove("blink");
  // line5.classList.remove("blink");
  // line6.classList.remove("blink");
  // line7.classList.remove("blink");
  
}

generateArrayBtn.addEventListener("click", () => {
  generateArray();
  outputText.textContent = ""; // Clear output text
});

quickSortBtn.addEventListener("click", () => {
  startQuickSort();
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
const mergeBtn = document.querySelector(".merge-btn");

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
mergeBtn.addEventListener("click", (e) => {
  window.location.href = "../mergeSort/index.html";
});