const dropGlazing = document.querySelector('#glazing');
const dropPack = document.querySelector('#pack');

const priceAdaption =
{
    // Glazing Options
    glaze : [0,0,0.5,1.5],
    pack : [1,3,5,10]
}

for (let i=0; i < priceAdaption.glaze.length; i++) 
{
    dropGlazing.options[i].value = priceAdaption.glaze[i];
    dropPack.options[i].value = priceAdaption.pack[i];
}


function glazingChange(element) {
    const priceChange = Number(element.value); 
    const perPrice = Number(2.49+priceChange);
    const totalPrice = perPrice * Number(dropPack.value);
    const finalPrice = totalPrice.toFixed(2);
    console.log(finalPrice);
    let priceTag = document.querySelector("#detail-section-price");
    priceTag.innerText = '$'+finalPrice;
}


function packChange(element) {
    const priceChange = Number(element.value); 
    const totalPrice = (Number(dropGlazing.value)+2.49) * Number(dropPack.value);
    const finalPrice = totalPrice.toFixed(2);
    console.log(finalPrice);
    let priceTag = document.querySelector("#detail-section-price");
    priceTag.innerText = '$'+finalPrice;
}
