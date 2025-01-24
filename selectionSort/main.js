const generateArrayBtn = document.querySelector(".generate-array-btn");
const selectionSortBtn = document.querySelector(".selection-sort-btn");
const blocksContainer = document.querySelector(".blocks-container");
const outputText = document.querySelector(".output-text");
const speedInputRange = document.querySelector("#speed");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");
const line4 = document.querySelector(".line4");
const line5 = document.querySelector(".line5");
const line6 = document.querySelector(".line6");
const line7 = document.querySelector(".line7");

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

  await sleep(350);

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

async function selectionSort() {
  const bars = document.querySelectorAll(".bar");
  const barValue = document.querySelectorAll(".bar-value");
  const searchSpeed = parseInt(speedInputRange.value);

  selectionSortBtn.classList.add('active')
  if(selectionSortBtn.classList.contains('active')){
    selectionSortBtn.disabled = true;
  }
  generateArrayBtn.classList.add('active')
  if(generateArrayBtn.classList.contains('active')){
    generateArrayBtn.disabled = true;
  }

  outputText.textContent = `Sorting the array using Selection Sort...`;
  outputText.style.color = "white";

  for (let i = 0; i < generatedArray.length; i++) {
    let minIndex = i;
    outputText.textContent = `Sorting the array using Selection Sort...`;
    setTimeout(line1.classList.add("blink"), searchSpeed);

    bars[i].style.backgroundColor = "yellow";
    barValue[i].style.backgroundColor = "yellow";

    await new Promise((resolve) => setTimeout(resolve, searchSpeed));

    for (let j = i + 1; j < generatedArray.length; j++) {
      bars[j].classList.add("selected");
      barValue[j].classList.add("selected");
      await sleep(searchSpeed);
      setTimeout(line2.classList.add("blink"), searchSpeed);

      if (generatedArray[j] < generatedArray[minIndex]) {
        setTimeout(line3.classList.add("blink"), searchSpeed);

        if (minIndex !== i) bars[minIndex].classList.remove("min");
        setTimeout(line4.classList.add("blink"), searchSpeed);
        setTimeout(line5.classList.add("blink"), searchSpeed);
        setTimeout(line6.classList.add("blink"), searchSpeed);
        setTimeout(line7.classList.add("blink"), searchSpeed);
        
        minIndex = j;
        bars[minIndex].classList.add("min");
      }
      bars[j].classList.remove("selected");
      barValue[j].classList.add("selected");
    }
    bars[minIndex].classList.remove("min");

    if (minIndex !== i) {
      await swap(i, minIndex);

      [generatedArray[i], generatedArray[minIndex]] = [
        generatedArray[minIndex],
        generatedArray[i],
      ];
    }

    
    setTimeout(line1.classList.remove("blink"), searchSpeed);
    setTimeout(line2.classList.remove("blink"), searchSpeed);
    setTimeout(line3.classList.remove("blink"), searchSpeed);
    setTimeout(line4.classList.remove("blink"), searchSpeed);
    
    setTimeout(line5.classList.remove("blink"), searchSpeed);
    setTimeout(line6.classList.remove("blink"), searchSpeed);
    setTimeout(line7.classList.remove("blink"), searchSpeed);
    
    bars[i].style.backgroundColor = "green";
    barValue[i].style.backgroundColor = "green";

  }
  
  selectionSortBtn.classList.remove('active')
  if(selectionSortBtn.classList.contains('active')){
    selectionSortBtn.disabled = true;
  } else {
    selectionSortBtn.disabled = false;
  }
  generateArrayBtn.classList.remove('active')
  if(generateArrayBtn.classList.contains('active')){
    generateArrayBtn.disabled = true;
  } else {
    generateArrayBtn.disabled = false;
  }
  outputText.textContent = `Sorting completed!`;
  outputText.style.color = "lightgreen";
}

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

generateArrayBtn.addEventListener("click", () => {
  generateArray();
  outputText.textContent = "";
  
});

selectionSortBtn.addEventListener("click", () => {
  selectionSort();
  resetBarColors()
});

const bubbleBtn = document.querySelector(".bubble-btn");
const insertionBtn = document.querySelector(".insertion-btn");
const mergeBtn = document.querySelector(".merge-btn");
const quickBtn = document.querySelector(".quick-btn");

const logoText = document.querySelector(".logo-text");
logoText.addEventListener("click", (e) => {
  window.location.href = "../index.html";
});

bubbleBtn.addEventListener("click", (e) => {
  window.location.href = "../bubbleSort/index.html";
});
insertionBtn.addEventListener("click", (e) => {
  window.location.href = "../insertionSort/index.html";
});
mergeBtn.addEventListener("click", (e) => {
  window.location.href = "../mergeSort/index.html";
});
quickBtn.addEventListener("click", (e) => {
  window.location.href = "../quickSort/index.html";
});
