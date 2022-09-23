const dropGlazing = document.querySelector('#glazing');
const dropPack = document.querySelector('#pack');
let basePrice = Number(2.49)
let chosenGlazing = "KeepOriginal"
let chosenPack = "1"
let priceTag = document.querySelector("#detail-section-price");
priceTag.innerText = "$" + basePrice



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
    console.log(finalPrice);
    priceTag.innerText = '$' + finalPrice;
    chosenGlazing = dropGlazing.options[dropGlazing.selectedIndex].text
    console.log(chosenGlazing);
}


function packChange(element) {
    const priceChange = Number(element.value);
    const totalPrice = (Number(dropGlazing.value) + basePrice) * Number(dropPack.value);
    const finalPrice = totalPrice.toFixed(2);
    console.log(finalPrice);
    priceTag.innerText = '$' + finalPrice;
    chosenPack = dropPack.options[dropPack.selectedIndex].text
    console.log(chosenPack);
}




//HW4

//For instruction 2.1 Update Gallery page
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const chosenRoll = params.get('roll')

//For insturction 2.2 Update Detail page
cart = [];

// Update the header text
const headerElement = document.querySelector('#list-title');
headerElement.innerText = chosenRoll + ' Cinnamon Roll';



//FROM HERE!!! 
let jsondata = '{"Original": {"basePrice": 2.49,"imageFile": "original-cinnamon-roll.jpg"},"Apple": {"basePrice": 3.49,"imageFile": "apple-cinnamon-roll.jpg"},"Raisin": {"basePrice": 2.99,"imageFile": "raisin-cinnamon-roll.jpg"},"Walnut": {"basePrice": 3.49,"imageFile": "walnut-cinnamon-roll.jpg"},"Double-Chocolate": {"basePrice": 3.99, "imageFile": "double-chocolate-cinnamon-roll.jpg"},"Strawberry": {"basePrice": 3.99,"imageFile": "strawberry-cinnamon-roll.jpg"}}';
myObj = JSON.parse(jsondata);


// Update the image
const rollImage = document.querySelector('#detail-img');
rollImage.src = './products/' + myObj[chosenRoll].imageFile;

// Update the price
basePrice = myObj[chosenRoll].basePrice;
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

const btnCart = document.querySelector('#addtocart');



btnCart.onclick = function clickCart() {
    saveThis = new Roll(chosenRoll, chosenGlazing, chosenPack, basePrice);
    console.log(saveThis);
    cart.push(saveThis);
    console.log(cart);
}
