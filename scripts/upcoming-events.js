/* .....EVENTOS FUTUROS..... */
let currentDate = data.currentDate;
let upcomingEvents = [];

function futureDate(events){
    for(events of events){
        if (currentDate < events.date) {
            upcomingEvents.push(events)
        }
    }
return upcomingEvents;
}
console.log(futureDate(data.events));

let cardsHome = document.getElementById("cards-home");
let fragment = document.createDocumentFragment();

for (events of upcomingEvents){
    let title = document.createElement('h3');
    title.className = "titleCard";
    title.textContent = events.name;
    fragment.appendChild(title);

    let priceP = document.createElement('p');
    priceP.className = "priceP";
    priceP.textContent = "Price: $" + events.price;

    let image = document.createElement('img');
    image.className = "imageCard";
    image.src = events.image;
    fragment.appendChild(image);

    let viewMore = document.createElement('a');
    viewMore.className = "viewMore";
    viewMore.textContent = "View more...";
    viewMore.href = "./details.html";

    let divPrice = document.createElement('div');
    divPrice.className = "price";
    divPrice.appendChild(priceP);
    divPrice.appendChild(viewMore);

    let paragraph = document.createElement('p');
    paragraph.className = "pCard";
    paragraph.textContent = events.description;
    fragment.appendChild(paragraph);

    let divContainer = document.createElement('div');
    divContainer.className = "container-cards-home";
    divContainer.appendChild(title);
    divContainer.appendChild(image);
    divContainer.appendChild(paragraph);
    divContainer.appendChild(divPrice);
    fragment.appendChild(divContainer);
};
cardsHome.appendChild(fragment);