const queryString = location.search
const params = new URLSearchParams(queryString)

let events = data.events;

let fragment = document.createDocumentFragment();

function createCard(arr, contenedor) {
    let cardsHome = document.querySelector(contenedor)
    cardsHome.innerHTML = ""
    for (events of arr) {
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
        viewMore.innerHTML = `
        <a href="./details.html?id=${events._id}">View more...</a>`

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
}
createCard(events, "#cards-home")

/* CATEGORIAS DOM */

let categories = [];

let category = document.getElementById("form-category")
data.events.forEach(e => {
    if (!categories.includes(e.category)) {
    categories.push(e.category)
    category.innerHTML += `
        <div id="content-cat">
            <label class="checkbox">
                <input type="checkbox" name="category" id="${e.category}" value="${e.category}">
                <span>${e.category}</span>
            </label>
        </div>`
}
});

/* FILTRO CATEGORÍA */

let checkButton = document.querySelectorAll("input[type='checkbox']")
let eventsChecked = []

checkButton.forEach(boton => boton.addEventListener('change', check))
function check() {
    eventsChecked = []
    let select = Array.from(checkButton).filter(e => e.checked)
    for (const event of data.events) {
        select.forEach(input => {
        if (event.category == input.value) {
            eventsChecked.push(event)
        }
    });
}
    if (eventsChecked.length > 0) {
        createCard(eventsChecked, "#cards-home")
    } else {
        createCard(data.events, "#cards-home")
    }
};

/* FILTRO DE BUSQUEDA NO LOGRE HACERLO :C */
