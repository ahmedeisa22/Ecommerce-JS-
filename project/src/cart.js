var lable = document.getElementById("label");
var shoppingCart = document.getElementById("shopping-cart");
var cartAmount = document.getElementById("cartAmount");

var basket = JSON.parse(localStorage.getItem("data")) || [];
var cartCounter = basket.map((item) => item.item).reduce((x, y) => x + y, 0);

var calculateCounterFromLocal = function () {
  var res = basket.map((item) => item.item).reduce((x, y) => x + y, 0);
  cartAmount.innerHTML = res;
};
calculateCounterFromLocal();

function generateCartItem() {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((c) => {
        var { id, item } = c;
        var search = allitemsData.find((it) => it.id === id) || [];
        console.log(search);
        let { img, price, name } = search;
        return `
      <div class="cart-item">
      <img width="100" src=${img} alt="" />

      <div class="details">
      
        <div class="title-price-x">
          <h4 class="title-price">
            <p>${name}</p>
            <p class="cart-item-price" >$ ${price}</p>
          </h4>
        
          <i onclick="removeItem(${id})" class="fa-sharp fa-solid fa-xmark"></i>
        </div>

        <div class="cart-buttons">
          <div class="buttons">
         
            <i onclick="decrement(${id})" class="fa-solid fa-minus fa-lg"></i>
            <div id=${id} class="quantity">${item}</div>
          
            <i onclick="increment(${id})" class="fa-solid fa-plus fa-lg"></i>
          </div>
        </div>

        <h3 id="cart-price">$ ${item * price}</h3>
      
      </div>
    </div>
            `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    lable.innerHTML = `
    <h2>Cart is Empty!</h2>
    <a href="index.html">
    <button class="HomeBtn">Back to Home</button>
  </a>
    `;
  }
}
generateCartItem();

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
    generateCartItem();
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
  generateCartItem();
  totalBill();
};

function removeItem(id) {
  var selecteditem = id;

  var index = -1;
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].id === selecteditem.id) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    basket.splice(index, 1);
    cartCounter--;
    generateCartItem();
  } else throw "Not in array";

  localStorage.setItem("data", JSON.stringify(basket));
  update(id);
}

function totalBill() {
  if (basket.length !== 0) {
    var amount = basket
      .map((z) => {
        let { item, id } = z;
        var search = allitemsData.find((it) => it.id === id) || [];

        return search.price * item;
      })
      .reduce((x, y) => x + y, 0);

    lable.innerHTML = `
    <h2>Total Bill: $${amount}</h2>
    <button class="checkout">checkout</button>
    <button onclick="clearItem()" class="removeAll">Clear</button>
    `;
  } else {
    return;
  }
}
totalBill();

let clearItem = () => {
  basket = [];
  generateCartItem();
  localStorage.setItem("data", JSON.stringify(basket));
  calculateCounterFromLocal();
};
