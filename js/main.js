let productos = [];

fetch("../js/productos.json")
    .then(response => response.json())
    .then(data => {   
        productos = data
        addProducts(productos);
        
    })

const containerProducts = document.querySelector("#container-productos");
const buttonSelect = document.querySelectorAll(".boton-categoria");
const title = document.querySelector(".titulo-principal");

const cartNumber = document.querySelector("#numerito");


function addProducts(productSelect){
    
    containerProducts.innerHTML = ""; 

    productSelect.forEach(producto => {

        const div = document.createElement("div"); 
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.img}" alt="${producto.title}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.title}</h3>
            <p class="producto-precio">$${producto.price}</p>
            <button class="producto-agregar" id="${producto.id}"><span class="button_top">Add to Cart</span></button>
        </div>
        `;

        containerProducts.append(div);
    })
    addingButtons()   
     
}


buttonSelect.forEach(boton => {       
    boton.addEventListener("click", (e) => {     
        
        buttonSelect.forEach(boton => boton.classList.remove("active"))     

        e.currentTarget.classList.add("active")  

        if(e.currentTarget.id != "all") {    
        const productCat = productos.find(producto => producto.cat.id === e.currentTarget.id);
        title.innerText = productCat.cat.name;
        const buttonProduct = productos.filter(producto => producto.cat.id === e.currentTarget.id) ;
        addProducts(buttonProduct);

        }else {
            title.innerText = "All our products"
            addProducts(productos);
        }
    })
});


function addingButtons(){  
    addButton = document.querySelectorAll(".producto-agregar");

    addButton.forEach(boton => {
        boton.addEventListener("click", addCart)
    })
    
}


let cart;

let cartLS = localStorage.getItem("productos-en-carrito");

if(cartLS){
    cart = JSON.parse(cartLS);
    addQuantity()
} else {
    cart = [];
}



function addCart(e){
    const id = e.currentTarget.id;
    const addedProduct = productos.find(producto => producto.id === id)
    


    if(cart.some(producto => producto.id === id)) {  
        const index = cart.findIndex(producto => producto.id === id); 
        cart[index].quantity++;                                            
    } else {
        addedProduct.quantity = 1;  
        cart.push(addedProduct)
    }
    addQuantity()
    localStorage.setItem("productos-en-carrito", JSON.stringify(cart))

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
        onClick: function(){} 
      }).showToast();
}

function addQuantity(){
    let num = cart.reduce((acc, prod) => acc + prod.quantity, 0);
    cartNumber.innerText = num;

}