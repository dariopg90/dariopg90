const getStyles = () => {
  const JSONColorStyles = localStorage.getItem("colorStyles");
  colorStyles = JSONColorStyles ? JSON.parse(JSONColorStyles) : [];
};

const saveStyles = () => {
  localStorage.setItem("colorStyles", JSON.stringify(colorStyles));
};

const getColorStylesSavedData = () => {
  const JSONdata = localStorage.getItem("colorStylesSavedData");
  colorStylesSavedData = JSONdata ? JSON.parse(JSONdata) : [];
};

const saveColorStylesSavedData = () => {
  localStorage.setItem(
    "colorStylesSavedData",
    JSON.stringify(colorStylesSavedData)
  );
};

const renderCards = (data) => {
  rootDiv.innerHTML = null;
  getStyles();
  getColorStylesSavedData();
  data.forEach((data) => {
    

    if (!colorStylesSavedData.includes(pagination)) {
      colorStyles.push({
        id: data.id,
        textColor: "black",
        backgroundColor: "white",
        erased:false
      });
    }
///////////////////////////////////////////////////////////
//////////////////API DOM Elements/////////////////////////
///////////////////////////////////////////////////////////


    const APIdiv = document.createElement("div");
    const APIimage = document.createElement("img");
    const APIpar = document.createElement("p");
    const APIlist = document.createElement("ul");
    const APIli1 = document.createElement("li");
    const APIli2 = document.createElement("li");
    const APIli3 = document.createElement("li");

    APIdiv.classList.add("API-div");
    APIimage.classList.add("API-image");
    APIpar.classList.add("API-p");
    APIlist.classList.add("API-ul");
    APIli1.classList.add("API-li");
    APIli1.classList.add("API-li1");
    APIli2.classList.add("API-li");
    APIli2.classList.add("API-li2");
    APIli3.classList.add("API-li");
    APIli3.classList.add("API-li3");

    APIpar.textContent = data.name;
    APIli1.textContent = "VIEW";
    APIli2.textContent = "EDIT";
    APIli3.textContent = "DELETE";
    APIdiv.setAttribute("id", data.id);
    APIpar.setAttribute("id", "T" + data.id);
    APIimage.setAttribute("src", data.image);

    APIlist.appendChild(APIli1);
    APIlist.appendChild(APIli2);
    APIlist.appendChild(APIli3);

///////////////////////////////////////////////////////////
//////////////////DOM Elements functions//////////////////////
///////////////////////////////////////////////////////////

    APIli1.addEventListener("click", () => {
      let gender;
      if (data.gender === "Male") {
        gender = "He";
      } else if (data.gender === "Female") {
        gender = "She";
      } else {
        gender = "This";
      }
      popupHeader.textContent = `This is ${data.name}`;
      popupPar.textContent = `${gender} is a ${data.gender} ${data.species} that is currently ${data.status},
                      ${gender} was born in ${data.origin.name} and currently resides in 
                      ${data.location.name}`;
      popupImg.setAttribute("src", data.image);

      document.getElementById("popup").style.zIndex = "1000";
      document.getElementById("popup").style.visibility = "visible";
    });

    APIli2.addEventListener("click", () => {
      document.getElementById("edit").style.zIndex = "1000";
      document.getElementById("edit").style.visibility = "visible";
      const copyDom = renderCopy(data);
      copyCont.appendChild(copyDom);

      renderColors(colorArray, data.id);
    });

    APIli3.addEventListener("click", () => {
      APIdiv.style.display = "none";
      deleteCard(data.id)
    });

    if (data.name.length > 16) {
      APIpar.style.fontSize = "1.4rem";
      APIpar.style.textAlign = "1.4rem";
    }

    ///////////////////////////////////////////////////////////
    //////////////////DOM Elements Appending//////////////////////
    ///////////////////////////////////////////////////////////

    APIdiv.appendChild(APIimage);
    APIdiv.appendChild(APIpar);
    APIdiv.appendChild(APIlist);
    rootDiv.appendChild(APIdiv);
  });

  setCard(data);

  colorStylesSavedData.push(pagination);
  // console.log(colorStyles)
  saveStyles();
  saveColorStylesSavedData();
};

const deleteCard = (id) => {
  getStyles()
  const index = colorStyles.findIndex((color) => id === color.id)
  console.log(index)
  console.log(colorStyles[index].erased)
  colorStyles[index].erased = true
  saveStyles()
}

const setCard = (array) => {
  array.forEach((data) => {
    let color = colorStyles.find((color) => color.id === data.id);

    document.getElementById(data.id).style.backgroundColor = color.backgroundColor;
    document.getElementById(data.id).style.color = color.textColor;

    if(color.erased){
      document.getElementById(data.id).style.display = "none"
    }
    
  });
};

const renderPag = () => {
  pagDiv.innerHTML = null;
  let pagNum = 0;

  for (let i = 0; i < 34; i++) {
    pagNum++;
    const pagEl = document.createElement("a");
    pagEl.textContent = pagNum;
    pagEl.classList.add("pag-item");

    pagEl.addEventListener("click", (e) => {
      pagination = parseInt(e.originalTarget.textContent);
      currentPage = e.originalTarget.textContent;
      getURL();
    });

    pagDiv.appendChild(pagEl);
  }
};

const renderColors = (array, id) => {
  colorArrayDiv.innerHTML = null;

  getStyles();
  const index = colorStyles.findIndex((data) => data.id === id);
  console.log(colorStyles[index]);

  array.forEach((color) => {
    const colorSpan = document.createElement("span");
    colorSpan.classList.add("color-square");
    colorSpan.textContent = color;
    colorSpan.style.backgroundColor = color;
    colorSpan.style.color = color;
    colorArrayDiv.appendChild(colorSpan);

    colorSpan.addEventListener("click", (e) => {
      let innerColor = e.target.innerText;

      if (editBack && !editText) {
        colorStyles[index].backgroundColor = innerColor;
        document.getElementById(`${id}`).style.backgroundColor = innerColor;
        document.getElementById(`copy${id}`).style.backgroundColor = innerColor;
      } else if (!editBack && editText) {
        colorStyles[index].textColor = innerColor;
        document.getElementById(`T${id}`).style.color = innerColor;
        document.getElementById(`copyT${id}`).style.color = innerColor;
      }
    });
  });
};


const renderCopy = (data) => {
  const object = {
    color: ["red", "blue"],
    ...data,
  };

  const APIdiv1 = document.createElement("div");
  const APIimage1 = document.createElement("img");
  const APIpar1 = document.createElement("p");
  const APIlist1 = document.createElement("ul");
  const APIli11 = document.createElement("li");
  const APIli21 = document.createElement("li");
  const APIli31 = document.createElement("li");

  APIdiv1.classList.add("copyAPI-div");
  APIimage1.classList.add("API-image");
  APIpar1.classList.add("API-p");
  APIlist1.classList.add("API-ul");
  APIli11.classList.add("API-li");
  APIli11.classList.add("API-li1");
  APIli21.classList.add("API-li");
  APIli21.classList.add("API-li2");
  APIli31.classList.add("API-li");
  APIli31.classList.add("API-li3");

  APIpar1.textContent = object.name;
  APIli11.textContent = "VIEW";
  APIli21.textContent = "EDIT";
  APIli31.textContent = "DELETE";
  APIdiv1.setAttribute("id", "copy" + object.id);
  APIpar1.setAttribute("id", "copyT" + data.id);
  APIimage1.setAttribute("src", object.image);
  APIlist1.appendChild(APIli11);
  APIlist1.appendChild(APIli21);
  APIlist1.appendChild(APIli31);
  APIdiv1.appendChild(APIimage1);
  APIdiv1.appendChild(APIpar1);
  APIdiv1.appendChild(APIlist1);

  APIdiv1.style.backgroundColor = document.getElementById(
    `${data.id}`
  ).style.backgroundColor;

  APIpar1.style.color = document.getElementById(`T${data.id}`).style.color;

  return APIdiv1;
};
