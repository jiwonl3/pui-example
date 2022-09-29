const cart = new Set();
const tempSet = new Set();



//ONLY FOR HW5, IN HW6 YOU HAVE TO DELETE THIS CODE AND BRING FINAL PRICE IN DETAIL PAGE!
const glazePriceAdpatation = {
    'Original' : 0 ,
    'Sugar Milk': 0 ,
    'Vanilla Milk' : 0.5 
}

const packPriceAdaptation = {
    '1' : 1,
    '3' : 3,
    '6' : 5,
    '12': 10
}
//


class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;

        this.element = null;
    }
}

let OriginalRoll = new Roll('Original','Sugar Milk',Number(1),Number(2.49));
let WalnutRoll = new Roll('Walnut','Vanilla Milk',Number(12), Number(3.49));
let RaisinRoll = new Roll('Raisin','Sugar Milk',Number(3),Number(2.99));
let AppleRoll = new Roll('Apple','Original',Number(3),Number(3.49));

cart.add(OriginalRoll);
cart.add(WalnutRoll);
cart.add(RaisinRoll);
cart.add(AppleRoll);


// function addNewCart(rollType, rollGlazing, packSize, rollPrice) {
//     const cartItem = new Roll(rollType, rollGlazing, packSize, rollPrice);
//     tempSet.add(cartItem);
//     return cartItem;
// }


for (const cartItem of cart) {
    createElement(cartItem);

} 

function createElement(cartItem) {
    const template = document.querySelector('#cart-template');
    const clone = template.content.cloneNode(true);
    cartItem.element = clone.querySelector('.cart-item');
    const btnDelete = cartItem.element.querySelector('.remove');

    btnDelete.addEventListener('click', () => {
        deleteCart(cartItem);
        console.log(cart);
        displayPrice(cartItem);
    });

    const cartItemElement = document.querySelector('#cart-itemlist');

    for (let i of cart) {
        cartItemElement.prepend(cartItem.element);
        updateElement(cartItem);
    }

    displayPrice(cartItem);
}



function updateElement(cartItem) {
    const cartImg = cartItem.element.querySelector('.cartimg');
    const cartType = cartItem.element.querySelector('#cart-name-name');
    const cartGlaze = cartItem.element.querySelector('#cart-name-glaze');
    const cartPack = cartItem.element.querySelector('#cart-name-pack');
    const cartPrice = cartItem.element.querySelector('#cart-name-price');
    const glazingValue = cartItem.glazing;
    const packValue = cartItem.size;
    const formulaEachPrice = (glazePriceAdpatation[glazingValue] + cartItem.basePrice) * packPriceAdaptation[packValue];
    let eachPriceCeil = Number(formulaEachPrice.toFixed(2));

    cartImg.src = "./products/" + rolls[cartItem.type].imageFile;
    cartType.innerText = cartItem.type + " Cinnamon Roll";
    cartGlaze.innerText = "Glazing: "+ cartItem.glazing;
    cartPack.innerText = "Pack Size: " + cartItem.size;
    cartPrice.innerText = "$" + eachPriceCeil;
}


function deleteCart(cartItem) {
    cartItem.element.remove();
    cart.delete(cartItem);
}


function displayPrice(cartItem) {
    let totalPPrice = 0;
    for(let i of cart) {
        let eachPPrice = (glazePriceAdpatation[i.glazing] + i.basePrice) * packPriceAdaptation[i.size];
        totalPPrice = totalPPrice + Number(eachPPrice.toFixed(2));
    }
    const cartTotalPrice = document.querySelector('#total-price');
    cartTotalPrice.innerText = "$" + totalPPrice.toFixed(2);
}