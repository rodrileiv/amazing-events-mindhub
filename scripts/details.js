let query = location.search

let param = new URLSearchParams(query)

let id = param.get("id")

let events2 = data.events

let eventDetail = events2.find(eventDetail => eventDetail._id == id)

let buildDetails = document.querySelector(".cards-details")

    buildDetails.innerHTML = `<div class="details">
        <img src="${eventDetail.image}" alt="${eventDetail.name}">
        <div class="details-text">
            <h3>${eventDetail.name}</h3>
            <p>${eventDetail.description}</p>
            <div>
            <p>Date: ${eventDetail.date}</p>
            <p>Category: ${eventDetail.category}</p>
            <p>Place: ${eventDetail.place}</p>
            <p>Capacity: ${eventDetail.capacity}</p>
            <p>Price: $${eventDetail.price}</p>
            </div>
        </div>
    </div>`

