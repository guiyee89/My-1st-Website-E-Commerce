let cart = localStorage.getItem("productos-en-carrito");
cart = JSON.parse(cart);

const empty = document.querySelector("#carrito-vacio");
const product = document.querySelector("#carrito-productos");
const actions = document.querySelector(".carrito-acciones");
const bought = document.querySelector("#carrito-comprado");
let deleteButton = document.querySelectorAll(".carrito-producto-eliminar");
const emptyButton = document.querySelector("#carrito-acciones-vaciar");
const total = document.querySelector("#total")
const buy = document.querySelector("#carrito-acciones-comprar")

function addToCart() {

  product.innerHTML = "";
  

  if (cart && cart.length > 0) {

    empty.classList.add("disabled");
    product.classList.remove("disabled");
    actions.classList.remove("disabled");
    bought.classList.add("disabled");

    product.innerHTML = "";

    cart.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
              <img  src="${producto.img}" alt="${producto.title}" />
              <div class="carrito-producto-titulo">
                <small>Item</small>
                <h3>${producto.title}</h3>
              </div>

              <div class="carrito-producto-cantidad">
                <small>Quantity</small>
                <p>${producto.quantity}</p>
              </div>

              <div class="carrito-producto-precio">
                <small>Price</small>
                <p>${producto.price}</p>
              </div>

              <div class="carrito-producto-subtotal">
                <small>Sub-total</small>
                <p>${producto.price * producto.quantity}</p>
              </div>

              <button class="carrito-producto-eliminar" id="${producto.id}">
                <i class="bi bi-trash-fill"></i>
              </button>
        `;

        product.append(div);
    });
  } else {
    empty.classList.remove("disabled");
    product.classList.add("disabled");
    actions.classList.add("disabled");
    bought.classList.add("disabled");
    actions.innerHTML = "";
  }

  newDeleteButton();
  caclTotal()
}
addToCart();


function newDeleteButton() {
  /* botones para agregar objetos al carrito */
  deleteButton = document.querySelectorAll(".carrito-producto-eliminar");

  deleteButton.forEach((boton) => {
    boton.addEventListener("click", deleteProduct);
  });
}

function deleteProduct(e) {
  const id = e.currentTarget.id;
  const index = cart.findIndex((producto) => producto.id === id);

  cart.splice(index, 1);
  addToCart();

  localStorage.setItem("productos-en-carrito", JSON.stringify(cart));
  console.log(cart)
}


emptyButton.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

  cart.length= 0;
   localStorage.setItem("productos-en-carrito", JSON.stringify(cart));
   addToCart()
}

function caclTotal(){
  const totalTotal = cart.reduce((acc, products) => acc + (products.price * products.quantity), 0);
  total.innerText = `$${totalTotal}`;
}

buy.addEventListener("click", buyProducts);
function buyProducts() {

   cart.length= 0;
   localStorage.setItem("productos-en-carrito", JSON.stringify(cart));
   
    empty.classList.add("disabled");
    product.classList.add("disabled");
    actions.classList.add("disabled");
    bought.classList.remove("disabled");

    product.innerHTML = "";
    actions.innerHTML = "";
}



