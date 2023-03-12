// vars

const deleteAll = document.querySelector(".delete-all");

const indicator = document.querySelector(".indicator");
const cartBadge = document.querySelector(".cart-badge");
const cartItemsList = document.querySelector(".cart-items");

let products = [
  {
    id: "1",
    product_name: "Gold Coin",
    product_price: "400.55",
    product_image: "../../assets/images/coin.jpg",
    added_to_cart: true,
  },
  {
    id: "2",
    product_name: "EMERALD STONE 2 SET RING",
    product_price: "597.35",
    product_image: "../../assets/images/r1.jpg",
    added_to_cart: false,
  },
  {
    id: "3",
    product_name: "GOLD PEARS QUEEN RINGRegular price",
    product_price: "619.00",
    product_image: "../../assets/images/r2.jpg",
    added_to_cart: false,
  },
  {
    id: "4",
    product_name: "WINGED RING",
    product_price: "300",
    product_image: "../../assets/images/r3.jpg",
    added_to_cart: false,
  },
  {
    id: "5",
    product_name: "HALO UNIQUE OVAL CUT 3 SET RING",
    product_price: "1120",
    product_image: "../../assets/images/r4.jpg",
    added_to_cart: false,
  },
  {
    id: "6",
    product_name: "CANARY RADIANT RING",
    product_price: "212.55",
    product_image: "../../assets/images/r6.jpg",
    added_to_cart: false,
  },
];

const productsContainer = document.querySelector(".products-container");

const cartDropDown = document.querySelector(".list-items");
// vars


function preloader() {
  const preloader = document.querySelector("#preloader");
  setTimeout(() => preloader.classList.add("hidden"), 1000);
  setTimeout(() => preloader.classList.add("d-none"), 1600);
}
preloader();
//  ********************************* //
//  ********************************* //
//  ********************************* //
//  ********************************* //



function checkLocalStorage() {
  if (!localStorage.getItem("cartItems")) {
    localStorage.setItem("cartItems", JSON.stringify(products));
  }
}


function renderProductCard(product) {

  const productCard = `
    <div class="product-card ${product.added_to_cart ? "in-cart" : ""}" id="${
    product.id
  }">
      <img class="card-img" src="${product.product_image}" alt="${
    product.product_name
  } image">
  <div class="products-title">
  <h3 class="product-name">${product.product_name}</h3>
  <p class="product-price">${product.product_price} $</p>
  </div>
<div class="btns-wrapper">

<button class="add-to-cart toggle-cart" data-id="${product.id}">
  <span>Add To Cart</span>
  <span class="cart-img"><img src="assets/images/cart.png" alt="Add To Cart Button"></span>
</button>

<button class="delete-from-cart toggle-cart" data-id="${product.id}">
  <span>Delete From Cart</span>
  <span class="cart-img"><img src="assets/images/cart.png" alt="Delete From Cart"></span>
</button>
</div>
      <button class="quick-view-btn" data-id="${product.id}">
        <img class="quick-view-img" src="assets/images/eye-svgrepo-com.svg" alt="quick view button">
      </button>
    </div>
  `;
  productsContainer.insertAdjacentHTML("beforeend", productCard);
}

function renderUiProducts(products) {
  products.forEach(renderProductCard);
}

checkLocalStorage();
renderUiProducts(JSON.parse(localStorage.getItem("cartItems")));

// ******************************************//
// ******************************************//
// ******************************************//



const quickView = document.querySelectorAll(".quick-view-btn");

const modalWrapper = document.querySelector(".modal-wrapper");

const quickViewBtn = (quickViewButton) => {
  const { id } = quickViewButton.dataset;

  const productCard = quickViewButton.closest(".product-card");
  const modalCard = document.querySelector(".modal-card");
  const modalImg = document.querySelector(".modal-img img");
  const modalName = document.querySelector(".modal-name");
  const modalPrice = document.querySelector(".modal-price");
  const quickViewToggleCartBtns = document.querySelectorAll(
    ".modal-card .quickview-toggle-cart"
  );

  modalWrapper.classList.add("active");

  productCard.classList.contains("in-cart")
    ? modalCard.classList.add("in-cart")
    : modalCard.classList.remove("in-cart");

  modalImg.src = `${productCard.querySelector(".product-card img").src}`;
  modalName.innerHTML = `${
    productCard.querySelector(".product-name").innerHTML
  }`;
  modalPrice.innerHTML = `${
    productCard.querySelector(".product-price").innerHTML
  }`;

  quickViewToggleCartBtns.forEach((btn) => {
    btn.dataset.id = id;
  });
};

const closeBtn = document.querySelector(".close-btn");

function closeModal() {
  modalWrapper.classList.remove("active");
}

closeBtn.addEventListener("click", closeModal);

modalWrapper.addEventListener("click", function (event) {
  if (event.target === this) {
    closeModal();
  }
});
// ******************************************//

quickView.forEach((button) => {
  button.addEventListener("click", function () {
    quickViewBtn(this);
  });
});
// ******************************************//
// ******************************************//
// ******************************************//
// ******************************************//


cartBadge.addEventListener("click", function () {
  cartItemsList.classList.toggle("active");
});

function createDropdoawnElement(item) {
  const dropdoawnItem = `
  <li class="dropdown-item" data-id="${item.id}">
  <div class="ins-img"><img src="${item.product_image}" alt="" srcset=""></div>
  <div class="ins-content">
      <strong class="ins-name">${item.product_name}</strong>
      <p class="ins-price">$ ${item.product_price}</p>
  </div>
  <button data-id='${item.id}' class="delete-cart-item"><img class="delete-image" src="assets/images/Red-Trash-Simple-Icon.png" alt="delete image"></button>
  </li>

`;
  cartDropDown.insertAdjacentHTML("beforeend", dropdoawnItem);
  indicator.innerHTML = cartDropDown.children.length;

  renderDeleteEvent();
}

JSON.parse(localStorage.getItem("cartItems")).forEach((item) => {
  item.added_to_cart && createDropdoawnElement(item);
});

deleteAll.addEventListener("click", () => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(
      JSON.parse(localStorage.getItem("cartItems")).map((item) => {
        item.added_to_cart = false;
        return item;
      })
    )
  );
  cartDropDown.innerHTML = "";
  indicator.textContent = 0;
  document.querySelectorAll(".product-card.in-cart").forEach((card) => {
    card.classList.remove("in-cart");
  });
});

// ******************************************************* //
// ******************************************************* //
// ******************************************************* //
// ******************************************************* //
// ******************************************************* //

function handleAddOrDelete(action, btn, modal = false) {
  const cartProducts = JSON.parse(localStorage.getItem("cartItems"));
  const { id } = btn.dataset;
  const chosenProductIndex = cartProducts.findIndex((item) => item.id === id);
  const chosenProduct = cartProducts[chosenProductIndex];
  const productCard = document.getElementById(`${id}`);
  const dropdownItem = document.querySelector(`.dropdown-item[data-id='${id}']`);

  const toggleInCartClass = (toggle) => {
    productCard.classList.toggle("in-cart", toggle);
    if (modal) {
      btn.closest(".modal-card").classList.toggle("in-cart", toggle);
    }
  };

  if (action === "add") {
    toggleInCartClass(true);
    chosenProduct.added_to_cart = true;
    createDropdoawnElement(chosenProduct);
  } else if (action === "delete") {
    toggleInCartClass(false);
    chosenProduct.added_to_cart = false;
    if (dropdownItem) {
      dropdownItem.remove();
    }
  }

  localStorage.setItem("cartItems", JSON.stringify(cartProducts));
  indicator.innerHTML = cartDropDown.children.length;
}


function toggleCart(btn) {
  let action = btn.closest(".product-card").classList.contains("in-cart")
    ? "delete"
    : "add";

    handleAddOrDelete(action, btn);
}

document.querySelectorAll(".toggle-cart").forEach((btn) => {
  btn.addEventListener("click", function () {
    toggleCart(this);
  });
});

function quickviewToggleCart(btn) {
  let action = btn.closest(".modal-card").classList.contains("in-cart")
    ? "delete"
    : "add";

    handleAddOrDelete(action, btn, true);
}



function renderQuickViewBtn() {
document.querySelectorAll(".quickview-toggle-cart").forEach((btn) => {
  btn.addEventListener("click", function () {
    quickviewToggleCart(this);
  });
});
}

renderQuickViewBtn();


function renderDeleteEvent() {
  document.querySelectorAll(".delete-cart-item").forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function () {
      handleAddOrDelete("delete", this);
    });
  });
}

renderDeleteEvent();
