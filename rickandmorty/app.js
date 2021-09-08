let pagination = 1;
let currentPage = "1";
// let paginationMax = pagination * 10;
// let paginationMin = paginationMax - 10;

let colorStyles = [];
let colorStylesSavedData = [];


const rootDiv = document.querySelector(".root");

const popupDiv = document.querySelector(".popup");
const popupImg = document.querySelector(".popup-img");
const popupRtn = document.querySelector(".popup-return");
const popupHeader = document.querySelector(".popup-header");
const popupPar = document.querySelector(".popup-par");

const pagDiv = document.querySelector(".pag-container");

const editDiv = document.querySelector(".edit-div");
const colorArrayDiv = document.querySelector(".edit-colors-array");
const colorBackdrop = document.querySelector(".backdrop-div");
const editRtn = document.querySelector(".edit-return");
const copyCont = document.querySelector(".edit-copy-container");
const editTxtBtn = document.querySelector(".edit-selector__text");
const editBackBtn = document.querySelector(".edit-selector__back");

const removeMemory = document.querySelector(".remove-storage");

let editText = false;
let editBack = true;

editBackBtn.style.borderColor = "white";
editTxtBtn.style.borderColor = "blueviolet";

const colorArray = [
  "darkslategray",
  "orangered",
  "pink",
  "aqua",
  "yellow",
  "cadetblue",
  "olive",
  "red",
  "lightgreen",
  "cornsilk",
  "blueviolet",
  "purple",
  "crimson",
  "blue",
  "goldenrod",
  "silver",
  "white",
  "black",
];

removeMemory.addEventListener("click", () => {
  localStorage.clear();
  getURL();
});

popupRtn.addEventListener("click", () => {
  document.getElementById("popup").style.visibility = "hidden";
});

editRtn.addEventListener("click", () => {
  document.getElementById("edit").style.visibility = "hidden";
  copyCont.innerHTML = null;
  editBack = true;
  editText = false;
  editBackBtn.style.borderColor = "white";
  editTxtBtn.style.borderColor = "blueviolet";
  saveStyles()
});

editBackBtn.addEventListener("click", () => {
  editBack = true;
  editText = false;
  editBackBtn.style.borderColor = "white";
  editTxtBtn.style.borderColor = "blueviolet";
});

editTxtBtn.addEventListener("click", () => {
  editBack = false;
  editText = true;
  editBackBtn.style.borderColor = "blueviolet";
  editTxtBtn.style.borderColor = "white";
});

const getURL = async () => {
  const APIurl = await getAPI(pagination);
  renderPag(APIurl);
  renderCards(APIurl);
};

getURL();

// getURL().then(APIdata => {
//     // saveData(APIdata)
//     let data = [...APIdata]
//     renderCards(data)
// })

// // let data = getData()

// renderCards(data)

// const data = localStorage.getItem('data')
// const dataArray = JSON.parse(data)
// console.log(dataArray)
