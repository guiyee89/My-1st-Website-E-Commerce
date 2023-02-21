
const numberCart = document.querySelector("#numerito");
let shoppingCart
let cartLS = localStorage.getItem("shoppingCart")

if (cartLS) {
    shoppingCart = JSON.parse(cartLS);
    addQuantity() 

} else {
    cart = [];
    
}

function addQuantity() {
    let num = shoppingCart.reduce((acc, prod) => acc + prod.quantity, 0);
    numberCart.innerText = num;
}