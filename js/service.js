let productos = [];

fetch("../js/productos2.json")
    .then(response => response.json())
    .then(data => {
        productos = data.services;
        addProducts(productos);
    });

const containerSection = document.querySelector("#container-section");
const numberCart = document.querySelector("#numerito");
let shoppingCart
let cartLS = localStorage.getItem("shoppingCart")

if (cartLS) {
    shoppingCart = JSON.parse(cartLS);
    addQuantity() 

} else {
    shoppingCart = [];
    
}

function addProducts(productSelect) {
    /* Hola profe! Comprendo que no hay que dejar anotaciones, pero solo queria aclarar que despues de terminar el proyecto, me di cuenta que no era necesario separar los productos en 2 array distintos en JSON porque aqui podria haber usado .map()
    De todas formas me sirvio de practica :D Saludos! */
    productSelect.forEach(producto => {
        const article = document.createElement("article");
        article.classList.add("grid_service_col_1", "flex_item_travel");
        article.innerHTML = `
                    <div class="travel_img">
                        <img src="${producto.img}" alt="Travel Planning"> 
                    </div>
                    <div class="travel_text_buybutton">
                        <div>
                        <h2>${producto.title}</h2>
                        </div>
                        <p>${producto.description1}</p> 
                        </div> 
                    <div>
                        <button id=${producto.id} class="boton">    
                            <span class="button_top"> Purchase Service</span>    
                        </button>
                    </div> 
                    `
        containerSection.append(article);
    });
    addingButton();
}

function addingButton() {
    let buttonSelect = document.querySelectorAll(".boton");
    buttonSelect.forEach(boton => {
        if (!boton.dataset.added) {
            boton.dataset.added = true;
            boton.addEventListener("click", addCart);
        }
    });
}


function addCart(e) {
    const id = e.currentTarget.id;
    const addedProduct = productos.find(producto => producto.id === id);
    console.log(addedProduct);

    const existingProduct = shoppingCart.find(item => item.id === addedProduct.id);
    if (existingProduct) {
        existingProduct.quantity++;
        console.log(existingProduct)
    } else {
        shoppingCart.push({ ...addedProduct, quantity: 1 });
    }
    
    addQuantity()

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    Toastify({
        text: "Added to Cart",
        offset: {
          x: 50,
          y: 80,
        },
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to left, #000, #2e2c2c)",
          borderRadius: "1rem",
        },
        onClick: function () { },
      }).showToast();
}

function addQuantity() {
    let num = shoppingCart.reduce((acc, prod) => acc + prod.quantity, 0);
    numberCart.innerText = num;
  }