const $eventsTable = document.querySelector(".events-cont")
const $upcomingTable = document.querySelector(".upcoming-cont")
const $pastTable = document.querySelector(".past-cont")
let events, pastEvents, upcomingEvents, cardCategories, upcomingCategories, pastCategories, noRepeatCategories, arrayNoRepeatCategories, ordenatedAttendancePastEvents, ordenatedCapacityPastEvents, percentajeOfAssistance, regularAssistance, averageAssistance, totalAssistance, revenues, totalRevenues, eventsInfo
let aux = ''
let fn = (card) => card.category 

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then (data => {
        eventsInfo = data
        events = eventsInfo.events
        currentDate = eventsInfo.currentDate

        pastEvents = events.filter(event => event.date < eventsInfo.currentDate)
        upcomingEvents = events.filter(event => event.date >= eventsInfo.currentDate)

        fn = events => events.category
        upcomingCategories = Array.from(new Set(upcomingEvents.map(fn)))
        pastCategories = Array.from(new Set(pastEvents.map(fn)))

        ordenatedAttendancePastEvents = pastEvents.map( events => events).sort((b, a) => (((a.assistance * 100) / a.capacity) - ((b.assistance * 100) / b.capacity)))
        ordenatedCapacityPastEvents = pastEvents.map( events => events).sort((b, a) => (a.capacity - b.capacity));

        let highAttendance = ordenatedAttendancePastEvents[0] 
        let lowAttendance = ordenatedAttendancePastEvents[ordenatedAttendancePastEvents.length -1]
        let highCapacity = ordenatedCapacityPastEvents[0]
        printStatistic(highAttendance, lowAttendance, highCapacity)
        statisticCategories(upcomingCategories, upcomingEvents)
        pastStatistic(pastCategories, pastEvents)
    })
    .catch(error => console.log(error))


    function statisticCategories(category, events){
        let categoryArray = []
        category.forEach(element => {
            let eventsSameCategory = events.filter(event => event.category === element)

            percentajeOfAssistance = eventsSameCategory.map(event => ((event.estimate * 100) / event.capacity))
            totalAssistance = percentajeOfAssistance.reduce((cont, num) => cont+num)
            averageAssistance = ((totalAssistance)/percentajeOfAssistance.length)

            revenues = eventsSameCategory.map(event => (event.estimate * event.price)).reduce((cont, num) => cont+num)
            const category = {
                name:element,
                estimate:averageAssistance.toFixed(2),
                revenues:revenues
            }
            console.log(category)
            categoryArray.push(category)
        })
        const arrayOrdened = categoryArray.sort((a, b) => b.revenues - a.revenues)
        printEventUp($upcomingTable, arrayOrdened)
    }

    function pastStatistic(category, events){
        let categoryArray = []
        category.forEach(element => {
            let eventsSameCategory = events.filter(event => event.category === element)
            console.log(eventsSameCategory)

            percentajeOfAssistance = eventsSameCategory.map(event => ((event.assistance * 100) / event.capacity))
            totalAssistance = percentajeOfAssistance.reduce((cont, num) => cont+num)
            averageAssistance = ((totalAssistance)/percentajeOfAssistance.length)
            revenues = eventsSameCategory.map(event => (event.assistance * event.price)).reduce((cont, num) => cont+num)
            const category = {
                name:element,
                assistance:averageAssistance.toFixed(2),
                revenues:revenues
            }
            console.log(category)
            categoryArray.push(category)
        })
        const arrayOrdened = categoryArray.sort((a, b) => b.revenues - a.revenues)
        printEventPast($pastTable, arrayOrdened)
    }

    function printEventUp(container, categoryArray){
        let contenedor1 = `
            <tr>
                <td class="fw-bold fs-6">Categories</td>
                <td class="fw-bold fs-6">Estimated</td>
                <td class="fw-bold fs-6">Percentage of estimated attendance</td>
            </tr>`
        let template = '';
    categoryArray.forEach((value, i) =>{
        template += `
            <tr>
                <td class="blank">${categoryArray[i].name}</td>
                <td class="blank">$${categoryArray[i].revenues}</td>
                <td class="blank">${categoryArray[i].assistance || categoryArray[i].estimate}%</td>
            </tr> `
    })
    container.innerHTML= contenedor1 + template
}


    function printEventPast(container, categoryArray){
        let contenedor = `
            <tr>
                <td class="fw-bold fs-6">Categories</td>
                <td class="fw-bold fs-6">Revenue</td>
                <td class="fw-bold fs-6">Percentage of attendance</td>
            </tr>`
        let template = '';
    categoryArray.forEach((value, i) =>{
        template += `
            <tr>
                <td class="blank">${categoryArray[i].name}</td>
                <td class="blank">$${categoryArray[i].revenues}</td>
                <td class="blank">${categoryArray[i].assistance || categoryArray[i].estimate}%</td>
            </tr> `
    })
    container.innerHTML= contenedor + template
}   

    function printStatistic(highAttendance, lowAttendance, highCapacity){
        return $eventsTable.innerHTML = `
        <tr>
            <td class="fw-bold fs-6">Event with the highest percentage of attendance</td>
            <td class="fw-bold fs-6">Event with the lowest percentage of attendance</td>
            <td class="fw-bold fs-6">Event with larger capacity</td>
        </tr>
        <tr>
            <td class="blank">${highAttendance.name}: ${(highAttendance.assistance*100)/highAttendance.capacity}%</td>
            <td class="blank">${lowAttendance.name}: ${(lowAttendance.assistance*100)/lowAttendance.capacity}%</td>
            <td class="blank">${highCapacity.name}: ${highCapacity.capacity}</td>
        </tr>`
    } 