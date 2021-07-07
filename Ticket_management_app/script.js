let openModal = document.querySelector(".open");
let closeModal = document.querySelector(".close");
let modalFilters = document.querySelectorAll('.ticket-filter');
let addTicket = document.querySelector('.add');
let cancelTicket = document.querySelector('.cancel');
let ticketContainer = document.querySelector('.ticket-container');
let headFilters = document.querySelectorAll('.filter');

document.querySelector('body').addEventListener('keydown', function (e) {
    if (e.key == "Escape")
        hideModal();
});


openModal.addEventListener('click', showModal);
closeModal.addEventListener('click', hideModal);
cancelTicket.addEventListener('click', hideModal);
addTicket.addEventListener('click', addTicketToMain);


for (let i = 0; i < headFilters.length; i++) {
    headFilters[i].addEventListener('dblclick', showAllTickets);
}

for (let i = 0; i < headFilters.length; i++) {
    headFilters[i].addEventListener('click', showFilteredTickets);
}

for (let i = 0; i < modalFilters.length; i++) {
    modalFilters[i].addEventListener('click', function (e) {
        document.querySelector('.selected-filter').classList.remove('selected-filter')
        e.target.classList.add("selected-filter");
    })
}

// function to show the create-ticket modal
function showModal() {
    ticketContainer.style.filter = "blur(10px)";
    let modal = document.querySelector('.modal-container');
    document.querySelector("#date").value = getDate();
    document.querySelector("#time").value = getTime();
    modal.style.display = "block";
}

// function to hide the create-ticket modal
function hideModal() {
    ticketContainer.style.filter = "blur(0px)";
    let modal = document.querySelector('.modal-container');
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
    modal.style.display = "none";
}

// function to handle creation of a ticket 
function addTicketToMain() {
    let id = uID();
    let title = document.querySelector("#title").value;
    let description = document.querySelector("#description").value;
    let date = document.querySelector("#date").value;
    let time = document.querySelector("#time").value;

    let selectedFilter = document.querySelector('.selected-filter');
    let style = getComputedStyle(selectedFilter);
    let bg = style.getPropertyValue('background-color');

    // console.log(bg);

    appendTicket(id, title, description, date, time, bg);

    // function adding the generated ticket into DataBase
    addToDb(id, title, description, date, time, bg);
    hideModal();

}


// function to add a ticket on the webpage
function appendTicket(id, title, description, date, time, filterColor) {
    let ticket = document.createElement('div');
    ticket.style.borderTop = filterColor + "30px solid"
    ticket.classList.add("ticket");
    ticket.innerHTML = `<div class="head">
                            <h2>#` + id + `</h2>
                            <i class="fa fa-trash-o delete"></i>
                        </div>
                            <h2> Title  -  ` + title + `</h2>
                        <h3>Description  :  </h3>
                        <p>
                            ` + description +
        `</p>
                        <h4> Date -  ` + date + ` </h4>
                        <h4> Time  -  ` + time + `</h4>`;
    ticketContainer.append(ticket);
    let allTickets = document.querySelectorAll('.delete');
    for (let i = 0; i < allTickets.length; i++) {
        allTickets[i].addEventListener('click', removeTicket)
    }
}


// function to remove the ticket from dataBase
function removeTicket(e) {
    let str = (e.target.previousElementSibling.textContent);
    let id = str.substring(1);
    // console.log(id) ; 
    removeFromDb(id);
    e.target.parentElement.parentElement.remove();
    // console.log(allTickets) ;
}



// function to display the ticket on the webpage according to the selected filter 
function showFilteredTickets(e) {
    let style = getComputedStyle(e.target);
    let filterColor = style.getPropertyValue('background-color');
    console.log(filterColor);

    let allTicketsOnPage = ticketContainer.querySelectorAll('.ticket');

    for (let i = 0; i < allTicketsOnPage.length; i++) {
        let thisTicketColor = getComputedStyle(allTicketsOnPage[i]).getPropertyValue('border-top-color');

        if (thisTicketColor != filterColor)
            allTicketsOnPage[i].style.display = "none";
        else
            allTicketsOnPage[i].style.display = "block";

    }
}

// to show all the tickets if double clicked on any filter 
function showAllTickets() {
    let allTickets = ticketContainer.querySelectorAll('.ticket');
    for (let i = 0; i < allTickets.length; i++) {
        allTickets[i].style.display = "block";
    }
}


// utility functions to get current date and time
function getDate() {

    let time = new Date();
    let day = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();

    if (day < 10) { day = '0' + day }
    if (month < 10) { month = '0' + month }

    return (year + "-" + month + "-" + day);
}
function getTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();

    if (hour < 10) { hour = '0' + hour }
    if (min < 10) { min = '0' + min }
    return hour + ":" + min;
}