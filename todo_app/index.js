let addButton = document.querySelector('.add-button');
let input = document.querySelector('.container input');
let list = document.querySelector(".list");

addButton.addEventListener("click", addTodo);
input.addEventListener('keypress', addTodoOnEnter);

// creating tasks array in local-storage
if (localStorage.getItem("tasks") == null) {
    localStorage.setItem("tasks", "[]");
}

let allItems = JSON.parse(localStorage.getItem("tasks"));
let id = allItems.length - 1;

// invoking show function in the beginning 
show();

// function to check if "enter" key is pressed
function addTodoOnEnter(e) {
    if (e.key == "Enter") {
        addTodo();
    }
}

// 'show' function to display all the tasks on the webpage
function show() {
    list.innerHTML = "";
    for (let i = 0; i < allItems.length; i++) {
        let itemDiv = document.createElement('div');
        itemDiv.textContent = allItems[i];
        itemDiv.classList.add("todo-item");

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");

        itemDiv.append(removeButton);
        list.append(itemDiv);

        removeButton.addEventListener('click', removeItem);
        removeButton.setAttribute("id", id);
        id++;
    }
}

// function to add tasks in the list
function addTodo(event) {
    let todoItem = input.value;         // getting the value from input filed
    if (todoItem) { 
        allItems.push(todoItem);            // adding task in the tasks array 

        // updating the local storage 
        localStorage.setItem("tasks", JSON.stringify(allItems));
        show();
    }

    // emptying the input field back again
    input.value = "";
}

// function to remove a task in the list
function removeItem(e) {

    // getting the item to be deleted 
    let todoItem = e.target.previousSibling.textContent;
    let idx = allItems.indexOf(todoItem);                   // looking for item's index in the tasks list
    allItems.splice(idx, 1);                                // removing the found index from the tasks list
    // console.log(allItems);
    localStorage.setItem("tasks", JSON.stringify(allItems));        // updating the local storage 
    list.innerHTML = "";                                            
    show(); 
}