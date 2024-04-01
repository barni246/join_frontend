let chooesedContacts = [];
let subtasksHelpArray = [];

// Set CSS for AddTask-Popup Frame and clear 'subtasksHelpArray'.
function addTask(column) {
    columnName = column;
    document.getElementById('contactsDropdownContainer').classList.remove('d-none');
    document.getElementById('layover').classList.add('layover-plus');
    document.body.style = "overflow: hidden";
    let label = document.querySelectorAll("label");
    for (let index = 0; index < label.length; index++) {
        label[index].classList.add('mt-15-plus');
    }
    document.getElementById('taskCard').classList.add('task-card-plus');
    subtasksHelpArray = [];
}


// Reset CSS for AddTask-Popup Frame, save Subtasks, clear input fields and render tasks.
function closeAddTask() {

    document.getElementById('layover').classList.remove('layover-plus');
    document.body.style = "overflow: visible";
    let label = document.querySelectorAll("label");
    for (let index = 0; index < label.length; index++) {
        label[index].classList.remove('mt-15-plus');
    }
    document.getElementById('taskCard').classList.remove('task-card-plus');
    contactsOpened = false;
    saveSubtasks();
    deleteContentAddTask();
    updateHTML();
}


// Save and check input fields.
function editFinish(id) {

    document.getElementById('selectContainer' + id).classList.remove('selectContainerPlus');
    let titleInput = document.getElementById('titleInput' + id).value;
    let descriptionInput = document.getElementById('textAreaDescription' + id).value;
    let dateInput = document.getElementById('dateInput' + id).value;

    if (titleInput == "" || descriptionInput == "" || dateInput == "") {
        document.getElementById('titleInput' + id).placeholder = "This field is required";
        document.getElementById('titleInput' + id).classList.add('placehoder-color-red');
        document.getElementById('textAreaDescription' + id).placeholder = "This field is required";
        document.getElementById('textAreaDescription' + id).classList.add('placehoder-color-red');
        document.getElementById('dateInput' + id).style = "color:red";

    } else {
        updateForTasks(id);
        addServer();
        updateHTML();
        document.getElementById('editContainerWrapper' + id).classList.add('d-none');
        document.getElementById('layoverTaskPopup' + id).classList.remove('d-none');
        document.getElementById('contentTaskPopup' + id).classList.remove('d-none');
    }
}


// Open TaskPopup.
function openTaskPopup(id) {

    document.getElementById('layoverTaskPopup' + id).classList.remove('d-none');
    document.getElementById('contentTaskPopup' + id).classList.remove('d-none');
    document.body.style = "overflow: hidden";
    document.getElementsByClassName('header')[0].style.zIndex = "0";
    document.getElementById('titleInput' + id).value = `${tasks[id]['taskTitle']}`;
    document.getElementById('textAreaDescription' + id).innerHTML = `${tasks[id]['taskDescription']} `

}


// Close TaskPopup.
function closeTaskPopup(id) {

    document.getElementById('selectContainer' + id).classList.remove('selectContainerPlus'); // select Panel wird zugemacht
    document.getElementById('layoverTaskPopup' + id).classList.add('d-none');
    document.getElementById('contentTaskPopup' + id).classList.add('d-none');
    document.body.style = "overflow: visible";
    document.getElementsByClassName('header')[0].style.zIndex = "10";
    if (tasks[id]) {
        document.getElementById('titleInput' + id).classList.remove('placehoder-color-red');
        document.getElementById('textAreaDescription' + id).classList.remove('placehoder-color-red');
        document.getElementById('dateInput' + id).value = tasks[id]['date'];
        document.getElementById('dateInput' + id).style = "color: lightgray";
    }
}


function stopPropagation(event) {
    event.stopPropagation();
}


// Show Edit-Frame with current prio button.
function editTask(id) {
    setCalendar(id);
    document.getElementById('contentTaskPopup' + id).classList.add('d-none');
    document.getElementById('editContainerWrapper' + id).classList.remove('d-none');
    document.getElementById('editContainer' + id).classList.remove('d-none');
    if (tasks[id]['prioUrgent']) {
        showButtonUrgentRed(id);
    }
    if (tasks[id]['prioMedium']) {
        showButtonMediumOrange(id);
    }
    if (tasks[id]['prioLow']) {
        showButtonLowGreen(id);
    }
}


// Rule out old dates.
function setCalendar(id) {
    let todayEdit = new Date();
    let ddEdit = String(todayEdit.getDate()).padStart(2, "0");
    let mmEdit = String(todayEdit.getMonth() + 1).padStart(2, "0");
    let yyyyEdit = todayEdit.getFullYear();
    todayEdit = yyyyEdit + "-" + mmEdit + "-" + ddEdit;
    document.getElementById("dateInput"+id).min = todayEdit;
}


// Close Edit-Frame.
function closeEditContainer(id) {
    document.getElementById('layoverTaskPopup' + id).classList.add('d-none');
    document.getElementById('editContainerWrapper' + id).classList.add('d-none');
    document.getElementById('editContainer' + id).classList.add('d-none');
}


// Toggle Select-Panel.
function dropDown(id) {
    document.getElementById('selectContainer' + id).classList.toggle('selectContainerPlus');
    document.getElementById('editContainerAvatars'+id).classList.toggle('d-none');
}


// Load current prio button.
function prioButtonUrgentRed(id) {
    tasks[id]['prioUrgent'] = true;
    tasks[id]['prioMedium'] = false;
    tasks[id]['prioLow'] = false;
    showButtonUrgentRed(id);
    hidePrioButtonMediumOrange(id);
    hidePrioButtonLowGreen(id);
    showButtonUrgentRedOnTaskPopup(id);
}


// Load current prio button.
function prioButtonMediumOrange(id) {
    tasks[id]['prioUrgent'] = false;
    tasks[id]['prioMedium'] = true;
    tasks[id]['prioLow'] = false;
    showButtonMediumOrange(id);
    hidePrioButtonUrgentRed(id);
    hidePrioButtonLowGreen(id);
    showButtonMediumOrangeOnTaskPopup(id);
}


// Load current prio button.
function prioButtonLowGreen(id) {
    tasks[id]['prioUrgent'] = false;
    tasks[id]['prioMedium'] = false;
    tasks[id]['prioLow'] = true;
    showButtonLowGreen(id);
    hidePrioButtonMediumOrange(id);
    hidePrioButtonUrgentRed(id);
    showButtonLowGreenOnTaskPopup(id);
}


// Hover current prio button.
function showButtonUrgentRed(id) {
    document.getElementById('prioArrowRed' + id).classList.add('d-none');
    document.getElementById('prioArrowWhite' + id).classList.remove('d-none');
    document.getElementById('urgent' + id).classList.add('urgent-red', 'button-shadow');
}


// Hover current prio button.
function showButtonMediumOrange(id) {
    document.getElementById('prioEqualSignOrange' + id).classList.add('d-none');
    document.getElementById('prioEqualSignWhite' + id).classList.remove('d-none');
    document.getElementById('medium' + id).classList.add('medium-orange', 'button-shadow');
}


// Hover current prio button.
function showButtonLowGreen(id) {
    if (tasks[id]['prioLow']) {
        document.getElementById('prioArrowGreen' + id).classList.add('d-none');
        document.getElementById('prioArrowWhiteDown' + id).classList.remove('d-none');
        document.getElementById('low' + id).classList.add('low-green', 'button-shadow');
    }
}


// Remove hover effect from not current prio button.
function hidePrioButtonUrgentRed(id) {
    document.getElementById('prioArrowRed' + id).classList.remove('d-none');
    document.getElementById('prioArrowWhite' + id).classList.add('d-none');
    document.getElementById('urgent' + id).classList.remove('urgent-red', 'button-shadow');
}


// Remove hover effect from not current prio button.
function hidePrioButtonMediumOrange(id) {
    document.getElementById('prioEqualSignOrange' + id).classList.remove('d-none');
    document.getElementById('prioEqualSignWhite' + id).classList.add('d-none');
    document.getElementById('medium' + id).classList.remove('medium-orange', 'button-shadow');
}


// Remove hover effect from not current prio button.
function hidePrioButtonLowGreen(id) {
    document.getElementById('prioArrowGreen' + id).classList.remove('d-none');
    document.getElementById('prioArrowWhiteDown' + id).classList.add('d-none');
    document.getElementById('low' + id).classList.remove('low-green', 'button-shadow');
}


// Load and show current prio button an TaskPopup-Frame.
function showButtonUrgentRedOnTaskPopup(id) {
    if (tasks[id]['prioUrgent']) {
        addServerPrioUrgent(id);
    }
}


// Load and show current prio button an TaskPopup-Frame.
function showButtonMediumOrangeOnTaskPopup(id) {
    if (tasks[id]['prioMedium']) {
        addServerPrioMedium(id);
    }
}


// Load and show current prio button an TaskPopup-Frame.
function showButtonLowGreenOnTaskPopup(id) {
    if (tasks[id]['prioLow']) {
        addServerPrioLow(id);
    }
}


// Remove shadow from not curren prio button.
function noButtonShadowRed(id) {
    if (tasks[id]['prioUrgent']) {
        document.getElementById('urgent' + id).classList.remove('button-shadow');
    }
}


// Remove shadow from not curren prio button.
function noButtonShadowOrange(id) {
    if (tasks[id]['prioMedium']) {
        document.getElementById('medium' + id).classList.remove('button-shadow');
    }
}


// Remove shadow from not curren prio button.
function noButtonShadowGreen(id) {
    if (tasks[id]['prioLow']) {
        document.getElementById('low' + id).classList.remove('button-shadow');
    }
}


// Show shadow for  curren prio button.
function buttonShadowRed(id) {
    if (tasks[id]['prioUrgent']) {
        document.getElementById('urgent' + id).classList.add('button-shadow');
    }
}


// Show shadow for  curren prio button.
function buttonShadowOrange(id) {
    if (tasks[id]['prioMedium']) {
        document.getElementById('medium' + id).classList.add('button-shadow');
    }
}


// Show shadow for  curren prio button.
function buttonShadowGreen(id) {
    if (tasks[id]['prioLow']) {
        document.getElementById('low' + id).classList.add('button-shadow');
    }
}


// Display the task, whose text or title equals input.
function searchTask() {
    document.getElementById('searchMenu').style = "border: 1px solid lightgray";
    let inputOfSearch = document.getElementById('searchTask').value;
    inputOfSearch = inputOfSearch.toLowerCase();
    notExist = true;
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let taskTitle = task['taskTitle'];
        let taskDescription = task['taskDescription'];
        document.getElementById('searchTask').placeholder = "Find task";
        document.getElementById('searchTask').classList.remove('placehoder-color-red');
        document.getElementById('task' + task['id']).classList.add('d-none');
        if (taskTitle.toLowerCase().includes(inputOfSearch) || taskDescription.toLowerCase().includes(inputOfSearch)) {
            inputIsIncludes(task);
        } else if (notExist) {
            inputIsNotExist(task);
        }
    }
}


// Check input for text and title.
function inputIsIncludes(task) {
    document.getElementById('task' + task['id']).classList.remove('d-none');
    document.getElementById('searchMenu').style = "border: 1px solid lightgray";
    document.getElementById('searchTask').classList.remove('placehoder-color-red');
    notExist = false;
}


// Input does not exist, border is red!
function inputIsNotExist(task) {
    document.getElementById('searchMenu').style = "border: 2px solid red";
    document.getElementById('searchTask').placeholder = "Task does not exist!";
    document.getElementById('searchTask').classList.add('placehoder-color-red');
    document.getElementById('task' + task['id']).classList.add('d-none');
}


// Show icon trash on TaskPopup.
function trashPopup(id) {
    document.getElementById('trashPopup' + id).classList.remove('d-none');
    document.getElementById('trashPopup' + id).classList.add('trash-popup');
}


// Delete task from tasks array.
 function deleteTask(id) {
    document.getElementById('task' + id).classList.add('d-none');
    closeTaskPopup(id)
    tasks.splice(id, 1);
    tasks.forEach((task, index) => {
        task['id'] = index;
    });
    addServer();
    updateHTML();
}


// Delete button for task, no.
function noDelete(id) {
    document.getElementById('trashPopup' + id).classList.add('d-none');
}


// Delete button for task, yes.
function yesDelete(id) {
    document.getElementById('trashPopup' + id).classList.add('d-none');
    deleteTask(id);
}



// Load and render all contacts from contacts.html
function loadContacts(id) {
    document.getElementById('listOfPersons' + id).innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contactUser = contacts[i];
        const contactUserName = contactUser.userName;
        if (tasks[id]['names'].includes(contactUserName)) {
            renderActiveContacts(id, contactUserName, i);
        } else {
            renderNotActiveContacts(id, contactUserName, i);
        }
    }
}


// Render contacts with checked: true
function renderActiveContacts(id, contactUserName, i) {
    return document.getElementById('listOfPersons' + id).innerHTML += /*html*/`
   <div class="nameOfEditContainer">
   <div class="user-name-edit-container" id="userNameEditContainer${i}">${contactUserName}</div> 
   <input class="checkbox-edit-container" type="checkbox" id="checkboxEditContainer${i}"  value="${contactUserName}" checked>
   </div>
  `;
}


// Render contacts with checked: false
function renderNotActiveContacts(id, contactUserName, i) {
    return document.getElementById('listOfPersons' + id).innerHTML += /*html*/`
     <div class="nameOfEditContainer">
     <div class="user-name-edit-container" id="userNameEditContainer${i}">${contactUserName}</div> 
     <input class="checkbox-edit-container" type="checkbox" id="checkboxEditContainer${i}"   value="${contactUserName}">
     </div>
    `;
}


// Save choosed contact to local array: chooesedContacts
function chooseContact(id) {
    tasks[id]['names'] = [];
    tasks[id]['bGcolorsOfAvatar'] = [];
    chooesedContacts = [];
    let currentTask = document.getElementById('editContainer' + id);
    let allCheckbox = currentTask.querySelectorAll('.checkbox-edit-container');
    for (let i = 0; i < allCheckbox.length; i++) {
        const checkbox = allCheckbox[i];
        if (checkbox.checked) {
            chooesedContacts.push(checkbox.value);
        }
    }
    saveChoosedContacts(id);
}


// Push local array (chooesedContacts) to tasks array
function saveChoosedContacts(id) {
    for (let index = 0; index < chooesedContacts.length; index++) {
        const contact = chooesedContacts[index];
        tasks[id]['names'].push(contact);
        tasks[id]['bGcolorsOfAvatar'].push(newColor());
    }
}


// Save subtask to local array: subtasksHelpArray and push it to tasks array
function saveSubtasks() {
    if (subtasksHelpArray != [])
        for (let index = 0; index < subtasksHelpArray.length; index++) {
            const subtask = subtasksHelpArray[index];
            tasks[tasks.length - 1]['subtasks'].push(subtask)
        }
}


// Save and render subtask to tasks array (with checked: true).
// Render progressbar
function saveDoneSubtask(id) {
    tasks[id]['subtasksCheckbox'] = [];
    let task = document.getElementById('contentTaskPopup' + id);
    let allCheckboxOfSubtasks = task.querySelectorAll('.checkbox-subtask');

    for (let i = 0; i < allCheckboxOfSubtasks.length; i++) {
        const checkboxOfSubtask = allCheckboxOfSubtasks[i];
        if (checkboxOfSubtask.checked && !tasks[id]['subtasksCheckbox'].includes(checkboxOfSubtask.value)) {
            tasks[id]['subtasksCheckbox'].push(checkboxOfSubtask.value);
        }
    }
    addServer();
    renderProgressBar(id, tasks[id]['subtasksCheckbox']);
    renderSubtasks(id);
}







