let productos = [];

fetch("../js/productos.json")
    .then(response => response.json())
    .then(data => {
        console.log(data)

        productos = data;
        console.log(productos)

        addProducts(productos);
        
    })

const containerProducts = document.querySelector("#container-productos");
const buttonSelect = document.querySelectorAll(".boton-categoria");
const title = document.querySelector(".titulo-principal");

const cartNumber = document.querySelector("#numerito");


function addProducts(productSelect){
    
    containerProducts.innerHTML = ""; /* para que se muestre vacio, y luego solo ejecute las categorias en cada boton */

    productSelect.forEach(producto => {

        const div = document.createElement("div"); /* toda esta construccion es para emular el contenido de productos del html hacia el JS */
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


buttonSelect.forEach(boton => {       /* creamos funcion de categorias de los botones para que cada click nos traiga los productos por categoria y id del html*/
    boton.addEventListener("click", (e) => {     
        
        buttonSelect.forEach(boton => boton.classList.remove("active"))     /* por cada click, se cambia la solapa active */

        e.currentTarget.classList.add("active")  

        if(e.currentTarget.id != "all") {    /* "todos" por el id que dimos en html */
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


function addingButtons(){  /* botones para agregar objetos al carrito */
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
    


    if(cart.some(producto => producto.id === id)) {  // .some nos devuelve true or false.. /* necesitamos identificar si X producto ya esta en el carrito, si es asi, sumar cantidad del mismo producto en vez de agregar 2 veces el mismo objeto entero */
        const index = cart.findIndex(producto => producto.id === id); /* buscamos el index de la propiedad que queremos sumar */
        cart[index].quantity++;                                            /* y le sumamos en cada eleccion */
    } else {
        addedProduct.quantity = 1;  /* creamos la propiedad Cantidad en el array dado q no existia */
        cart.push(addedProduct)
    }
    addQuantity()

    localStorage.setItem("productos-en-carrito", JSON.stringify(cart))
}

function addQuantity(){
    let num = cart.reduce((acc, prod) => acc + prod.quantity, 0);
    cartNumber.innerText = num;

}