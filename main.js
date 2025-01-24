
const linearBtn = document.querySelector(".linear-btn");
const binaryBtn = document.querySelector(".binary-btn");
const selectionBtn = document.querySelector(".selection-btn");
const bubbleBtn = document.querySelector(".bubble-btn");
const insertionBtn = document.querySelector(".insertion-btn");
const mergeBtn = document.querySelector(".merge-btn");
const quickBtn = document.querySelector(".quick-btn");

const logoText = document.querySelector(".logo-text");
logoText.addEventListener("click", (e) => {
  window.location.href = "../index.html";
});
linearBtn.addEventListener("click", (e) => {
  window.location.href = "../linearSearch/index.html";
});
binaryBtn.addEventListener("click", (e) => {
  window.location.href = "../binarySearch/index.html";
});
selectionBtn.addEventListener("click", (e) => {
  window.location.href = "../selectionSort/index.html";
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
