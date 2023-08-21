// Start Slider
var next = document.getElementById("previous");
var prev = document.getElementById("next");
var img = document.getElementById("img-slider");
var slider = document.getElementById("slider");

var counter = 1;
function nextImg() {
  counter++;
  img.setAttribute("src", "./img/" + counter + ".jpg");
  slider.style.transition = "all 0.8s";
  if (counter === 6) counter = 1;
}
function prevImg() {
  counter--;
  if (counter <= 0) counter = 6;
  img.setAttribute("src", "./img/" + counter + ".jpg");
  slider.style.transition = "all 0.8s";
  if (counter === 0) counter = 6;
}
var myInternal;
function play() {
  myInternal = setInterval(nextImg, 2000);
}

function stop() {
  clearInterval(myInternal);
}

slider.addEventListener("mouseover", function () {
  stop();
});

slider.addEventListener("mouseleave", function () {
  play();
});

setTimeout(() => {
  play();
}, 5000);
// End Slider
/*************************************************************************************************** */

let shop = document.getElementById("shop");
var phonesbtn = document.getElementById("phone");
var clothesbtn = document.getElementById("clothe");
var carsbtn = document.getElementById("car");
var fruitbtn = document.getElementById("fruit");
var cartAmount = document.getElementById("cartAmount");
var cartCounter = 0;
var basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = function (arr) {
  shop.innerHTML = "";
  arr.forEach((item) => {
    let search = basket.find((it) => it.id === item.id) || [];

    shop.innerHTML += `
        <div class="item" id="product-id-${item.id}">
        <img src=${item.img} alt="" class="img-card" width="223" height="300"/>
        <div class="details">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <div class="price-quantity id="">
            <h2>$ ${item.price}</h2>
            <div class="buttons">
              <i onclick="increment(${
                item.id
              })" class="fa-solid fa-plus fa-lg"></i>
              <div id="${item.id}" class="quantity">${
      search.item === undefined ? "0" : search.item
    }</div>
              <i onclick="decrement(${
                item.id
              })" class="fa-solid fa-minus fa-lg"></i>
            </div>
          </div>
        </div>
        </div>
        `;
  });
};
window.addEventListener("load", function () {
  calculateCounterFromLocal();

  generateShop(fruitsItemsData);
});
phonesbtn.addEventListener("click", function () {
  generateShop(phonesItemsData);
});
clothesbtn.addEventListener("click", function () {
  generateShop(clothItemsData);
});
carsbtn.addEventListener("click", function () {
  generateShop(carsItemsData);
});
fruitbtn.addEventListener("click", function () {
  generateShop(fruitsItemsData);
});

var increment = function (id) {
  var selecteditem = id;

  var index = -1;
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].id === selecteditem.id) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    basket[index].item++;
    cartCounter++;
  } else {
    basket.push({
      id: selecteditem.id,
      item: 1,
    });
    cartCounter++;
  }

  localStorage.setItem("data", JSON.stringify(basket));

  update(id);
};

var decrement = function (id) {
  var selecteditem = id;

  var index = -1;
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].id === selecteditem.id) {
      index = i;
      break;
    }
  }
  if (index !== -1 && basket[index].item > 1) {
    basket[index].item--;
    cartCounter--;
  } else if (index !== -1) {
    basket.splice(index, 1);
    cartCounter--;
  } else throw "Not in array";

  localStorage.setItem("data", JSON.stringify(basket));
  update(id);
};

var update = function (id) {
  var selecteditem = id;

  var updateItem = { item: 0 };
  basket.forEach((item) => {
    if (item.id === selecteditem.id) {
      updateItem = item;
    }
  });

  selecteditem.innerHTML = updateItem.item;

  cartAmount.innerHTML = cartCounter;
  calculateCounterFromLocal();
};

var calculateCounterFromLocal = function () {
  var res = basket.map((item) => item.item).reduce((x, y) => x + y, 0);
  cartAmount.innerHTML = res;
};
