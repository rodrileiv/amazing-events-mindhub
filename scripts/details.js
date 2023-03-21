let events
let currentDate  
let params
let id 
let card

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then (response => {
        currentDate = response.currentDate
        events = response.events
        const queryString = location.search //
        params = new URLSearchParams(queryString)
        id = params.get("id")
        card = events.find(item => item._id == id)
        const div = document.getElementById("cont-cards")
        div.innerHTML = `
        <div class="card card-details">
            <img src="${card.image}" class="card-img-details card-img-top p-3 justify-content-center" alt="Picture of ${card.name}">
            <h5 class="card-title-details text-align-center">${card.name}</h5>
            
            <div class="card-body-details">
                <ul>
                <li>Date: ${card.date}</li>
                <li>Description: ${card.description}</li>
                <li>Category: ${card.category}</li>
                <li>Place: ${card.place}</li>
                <li>Capacity: ${card.capacity}</li>
                <li>Assistance: ${card.assistance || card.estimate}</li> 
                </ul>
                <p class="price-details fw-bold text-center text-decoration-none">Price:$ ${card.price}</p>
            </div>
        </div>`
        })

