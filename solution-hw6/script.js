const dropGlazing = document.querySelector('#glazing');
const dropPack = document.querySelector('#pack');
let basePrice = Number(2.49)
let chosenGlazing = "Keep original"
let chosenPack = "1"
let priceTag = document.querySelector("#detail-section-price");
priceTag.innerText = "$" + basePrice
let cart = [];

const priceAdaption =
{
    // Glazing Options
    glaze: [0, 0, 0.5, 1.5],
    pack: [1, 3, 5, 10]
}

for (let i = 0; i < priceAdaption.glaze.length; i++) {
    dropGlazing.options[i].value = priceAdaption.glaze[i];
    dropPack.options[i].value = priceAdaption.pack[i];
}


function glazingChange(element) {
    const priceChange = Number(element.value);
    const perPrice = Number(basePrice + priceChange);
    const totalPrice = perPrice * Number(dropPack.value);
    const finalPrice = totalPrice.toFixed(2);
    // console.log(finalPrice);
    priceTag.innerText = '$' + finalPrice;
    chosenGlazing = dropGlazing.options[dropGlazing.selectedIndex].text
    // console.log(chosenGlazing);
}


function packChange(element) {
    const priceChange = Number(element.value);
    const totalPrice = (Number(dropGlazing.value) + basePrice) * Number(dropPack.value);
    const finalPrice = totalPrice.toFixed(2);
    // console.log(finalPrice);
    priceTag.innerText = '$' + finalPrice;
    chosenPack = dropPack.options[dropPack.selectedIndex].text
    // console.log(chosenPack);
}




//HW4

//For instruction 2.1 Update Gallery page
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const chosenRoll = params.get('roll')

//For insturction 2.2 Update Detail page

// Update the header text
const headerElement = document.querySelector('#list-title');
headerElement.innerText = chosenRoll + ' Cinnamon Roll';

// Update the image
const rollImage = document.querySelector('#detail-img');
rollImage.src = './products/' + rolls[chosenRoll].imageFile;

// Update the price
basePrice = rolls[chosenRoll].basePrice;
priceTag.innerText = '$' + basePrice;


// Add to cart
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}


let cartStoredArray= [];
if (localStorage.getItem("userCart") != null) {
    console.log("print");
    let storagedString = localStorage.getItem("userCart");
    cartStoredArray = JSON.parse(storagedString);
    console.log(cartStoredArray);
}


const btnCart = document.querySelector('#addtocart');

btnCart.onclick = function clickCart() {
    saveThis = new Roll(chosenRoll, chosenGlazing, chosenPack, basePrice);
    // console.log(saveThis);
    cart.push(saveThis);
    console.log(cart);
    // console.log(cart);
    let cartCombine = [...cart,...cartStoredArray];
    console.log(cartCombine);
    saveToLocalStorage(cartCombine);
}

function saveToLocalStorage(cartCombine) {
    let cartArray = Array.from(cartCombine);
    console.log(cartArray);
    const cartArrayString = JSON.stringify(cartCombine);
    localStorage.setItem("userCart",cartArrayString);
    console.log(localStorage);
}
