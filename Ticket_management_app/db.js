// script for handling the database


// checking if the tickets already exists in the DataBase record
if (localStorage.getItem("allTickets") == null) {
    localStorage.setItem("allTickets", "[]");
}


function showTicketsOnLoad() {
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    for (let i = 0; i < allTickets.length; i++) {
        let id = allTickets[i].id;
        let title = allTickets[i].title;
        let description = allTickets[i].description;
        let date = allTickets[i].date;
        let time = allTickets[i].time;
        let filterColor = allTickets[i].filterColor;
        appendTicket(id, title, description, date, time, filterColor);
    }
}

showTicketsOnLoad();

function addToDb(id, title, description, date, time, filterColor) {
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    let ticketObj = {
        id: id,
        title: title,
        description: description,
        date: date,
        time: time,
        filterColor: filterColor
    }
    // console.log(ticketObj);
    allTickets.push(ticketObj);
    localStorage.setItem("allTickets", JSON.stringify(allTickets));
}

function removeFromDb(id) {
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    let updatedTicketsList = allTickets.filter(function (ticket) {
        if (ticket.id == id) {
            return false;
        }
        return true;
    })
    localStorage.setItem("allTickets", JSON.stringify(updatedTicketsList));
}


