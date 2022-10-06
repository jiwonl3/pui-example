const cart = new Set();
const tempSet = new Set();



const packPriceAdaptation = {
    '1' : 1,
    '3' : 3,
    '6' : 5,
    '12': 10
}

const glazePriceAdpatation = {
    'Keep original' : 0 ,
    'Sugar milk': 0 ,
    'Vanilla milk' : 0.5,
    'Double chocolate' : 1.5
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

// function addNewCart(rollType, rollGlazing, packSize, rollPrice) {
//     const cartItem = new Roll(rollType, rollGlazing, packSize, rollPrice);
//     tempSet.add(cartItem);
//     return cartItem;
// }

cartArrayString = localStorage.getItem("userCart");
cartArray = JSON.parse(cartArrayString);
console.log(cartArray);

for (const cartItem of cartArray) {;
    createElement(cartItem);
}

// function retrieveFromLocalStorage() {
//     const cartArrayString = localStorage.getItem("userCart");
//     const cartArray = JSON.parse(cartArrayString);
//     console.log(cartArray);
//     for (const cartItem of cartArray) {;
//         createElement(cartItem);
//     }
// }


// for (const cartItem of cartFromLocalStorage) {
//     createElement(cartItem);

// } 

function createElement(cartItem) {
    const template = document.querySelector('#cart-template');
    const clone = template.content.cloneNode(true);
    cartItem.element = clone.querySelector('.cart-item');
    const btnDelete = cartItem.element.querySelector('.remove');

    btnDelete.addEventListener('click', () => {
        deleteCart(cartItem);
        displayPrice(cartItem);
    });

    const cartItemElement = document.querySelector('#cart-itemlist');

    for (let i of cartArray) {
        cartItemElement.prepend(cartItem.element);
        updateElement(cartItem);
    }

    displayPrice(cartItem);
}

// const formulaEachPrice = (glazePriceAdpatation[glazingValue] + cartItem.basePrice) * packPriceAdaptation[packValue];


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
    console.log(cartArray);
    for (let i=0; i < cartArray.length; i++){
        if(cartArray[i] === cartItem){
            cartArray.splice(i,1);
        }
    }
    // cartArray.delete(cartItem);

    const cartArrayString = JSON.stringify(cartArray);
    localStorage.setItem("userCart",cartArrayString);
    console.log(localStorage);

}


function displayPrice(cartItem) {
    let totalPPrice = 0;
    for(let i of cartArray) {
        let eachPPrice = (glazePriceAdpatation[i.glazing] + i.basePrice) * packPriceAdaptation[i.size];
        totalPPrice = totalPPrice + Number(eachPPrice.toFixed(2));
    }
    const cartTotalPrice = document.querySelector('#total-price');
    cartTotalPrice.innerText = "$" + totalPPrice.toFixed(2);
}