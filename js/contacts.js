let contactList = [];
let storedContactsArray = [];
//let tasks = [];

let dataFromServer = async () => {
  setURL('https://barnabas-gonda.de/post/smallest_backend_ever');
  await downloadFromServer();
  storedContactsArray = JSON.parse(backend.getItem("contacts")) || [];
  tasks = JSON.parse(backend.getItem("keyTasks")) || [];
  renderContacts();
};

function stopPropagation(event) {
  event.stopPropagation();
}

dataFromServer();

let createContactData = async () => {
  let userName = document.querySelector("#name").value;
  let userMail = document.querySelector("#mail").value;
  let userPhone = document.querySelector("#phone").value;
  let userId = storedContactsArray.length;
  let newContact = {
    id: userId,
    userName: userName,
    userMail: userMail,
    userPhone: userPhone,
    createdAt: new Date().getTime(),
    color: newColor(),
  };

  storedContactsArray.push(newContact);
  await backend.setItem("contacts", JSON.stringify(storedContactsArray));
  document.getElementById("contactLoader").innerHTML = ``;
  cancelContactData();
  renderContacts();
};


function newColor() {
  var randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
  //filterColor(randomColor);
  return randomColor;
}


const renderContacts = () => {
  let addContactToList = document.querySelector("#contactInList");
  addContactToList.innerHTML = "";
  let sortedContacts = storedContactsArray.sort((a, b) =>
    a.userName.localeCompare(b.userName)
  );

  for (let i = 0; i < sortedContacts.length; i++) {
    const contact = sortedContacts[i];
    const previousContact = sortedContacts[i - 1];
    if (
      previousContact != undefined &&
      contact.userName[0] != previousContact.userName[0]
    ) {
      let initials = createInitials(contact);
      subRenderContacts(initials,contact);
     
    } else if (i === 0) {
      let initials = createInitials(contact);
      subRenderContacts(initials,contact);

    } else {
      let initials = createInitials(contact);
      subRenderContactsNoSorter(initials,contact);
     
    }
  }
};


function subRenderContacts(initials,contact) {
  let addContactToList = document.querySelector("#contactInList");
  return  addContactToList.innerHTML += /*html*/ `
  <li>
    <div class="sorter">${contact.userName[0]}</div>
    <div class="contact-box" onclick="toggleBetweenContacts(${contact.id})">
      <a href="#"><div id="initialsContainer" style="background: ${contact.color}">${initials}</div></a> 
      <div class="name-mail-container">
        <div>${contact["userName"]}</div>
        <div>${contact["userMail"]}</div>
      </div>
    </div>
  </li>
`;
}


function  subRenderContactsNoSorter(initials,contact) {
let addContactToList = document.querySelector("#contactInList");
return   addContactToList.innerHTML += /*html*/ `
<li>
  <div class="contact-box" onclick="toggleBetweenContacts(${contact.id})">
    <a href="#"><div id="initialsContainer" style="background: ${contact.color}">${initials}</div></a> 
    <div class="name-mail-container">
      <div>${contact["userName"]}</div>
      <div>${contact["userMail"]}</div>
    </div>
  </div>
</li>
`;

}


const addContact = () => {
  let addContact = document.getElementById("contactLoader");
  addContact.innerHTML = ``;
  document.body.append(addContactTemplate());
};


function formValidation() {
  let inputs = document.getElementsByTagName("input");
  let userPattern = /^[a-zA-ZäöüÄÖÜß]+ [a-zA-ZäöüÄÖÜß]+$/;
  let mailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  let phonePattern =
    ///^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,}$/;
    /[0-9]$/;
  let allCorrect = true;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    if (input.value.length == 0) {
      let message = "This field is required!";
      allCorrect = false;
      generateTooltip(input, message);
    }

    if (
      input.type === "email" &&
      !mailPattern.test(input.value) &&
      input.value.length > 0
    ) {
      let message = "Please enter a valid email adress!";
      allCorrect = false;
      generateTooltip(input, message);
    }

    if (
      input.type === "tel" &&
      !phonePattern.test(input.value) &&
      input.value.length > 0
    ) {
      let message = "Please enter a valid phone number!";
      allCorrect = false;
      generateTooltip(input, message);
    }

    if (
      input.type === "text" &&
      !userPattern.test(input.value) &&
      input.value.length > 0
    ) {
      let message =
        "Please enter a valid name (Full name seperated by a space; No middle names)!";
      allCorrect = false;
      generateTooltip(input, message);
    }
  }
  return allCorrect;
}


function generateTooltip(input, message) {
  let tooltip = document.createElement("div");
  tooltip.classList.add("validation-tooltip");
  tooltip.innerHTML = /*html*/ `
        <p>!</p>
        <p>${message}</p>
        `;
  input.parentNode.append(tooltip);
}


const createInitials = (contact) => {
  let matches = contact.userName.match(/\b\w/g) || [];
  return (
    (matches[0] || "") + (matches[matches.length - 1] || "")
  ).toUpperCase();  
};

const clearContactArguments = (contactList) => {
  contactList.shift();
};



const cancelContactData = () => {
  let addContact = document.getElementById("contactLoader");
  addContact.innerHTML = ``;
  let blurContainer = document.querySelector("#overlay-blur-container");
  blurContainer.remove();
};

const showContactData = (contact) => {
  let updateContactForm = document.querySelector("#updatedContacts");
  updateContactForm.innerHTML = ``;
  const index = storedContactsArray.findIndex(user => user.id === contact.id)
  let initials = createInitials(contact);
  if (contact != null) {

    updateContactForm.innerHTML += /*html*/ `
      <div class="contact-info">
        <div class="contact-header">
            <div class="initials-big" style="background: ${contact.color}">${initials}</div>
            <div class="add-task-container-small">
              <h1 id="usName${index}">${contact["userName"]}</h1>
              <div class="contact-task" id="contact-task" onclick="renderTaskOverlay(${contact.id})">
                  <img src="assets/img/icon_add_task_plus.png" alt="#">
                  <h2>Add Task</h2>
              </div>
            </div>
        </div>
        
        <div class="contact-edit" >
            <div><h2>Contact Information</h2></div>
            
            <div onclick="editContact(${index})"><img src="assets/img/icon_edit_dark.png" alt=""> Edit</div>
            
        </div>
        <div class="contact-mail">
            <h3>Email</h3>
            <a href="mailto:ania.schulze@hotmail.com">${contact["userMail"]}</a>
        </div>
        <div class="contact-call">
            <h3>Phone</h3>
            <a href="tel:+49 123-456-7890">${contact["userPhone"]}</a>
        </div>
      </div>
    `;


  }
  if (window.innerWidth < 1000) {
    let sectionLeft = document.getElementsByTagName('section')[0];
    let sectionRight = document.getElementsByTagName('section')[1];
    sectionRight.style.display = "block";
    sectionLeft.style.display = "none";
    let button = document.getElementsByClassName('button-position')[0];
    button.style.display = "none";
  }
  if (window.innerWidth >= 1000) {
    let sectionRight = document.getElementsByTagName('section')[1];
    sectionRight.style.display = "";
  }
};



function closeContactDataMobile() {
  let sectionLeft = document.getElementsByTagName('section')[0];
  let sectionRight = document.getElementsByTagName('section')[1];
  let button = document.getElementsByClassName('button-position')[0];
  button.style.display = "block";
  if (window.innerWidth < 1000) {
    sectionRight.style.display = "none";
    sectionLeft.style.display = "block";
  }
  if (window.innerWidth < 750) {
    sectionRight.style.display = "none";
    sectionLeft.style.display = "flex";
  }

}


const editContact = (userId) => {
  document.body.append(editContactTemplate(userId));
  for (let index = 0; index < storedContactsArray.length; index++) {
    const element = storedContactsArray[index];
    if (index == userId) {
      const firstLetterOfFirstName = element.userName.split("", 1).toString();
      const fullName = element.userName.split(" ");
      const firstLetterOfLastName = fullName[1].split("", 1).toString();
      document.getElementById('edit-contact-avatar').innerHTML = `
       <div class="avatarForContactEdit" style="background-color:${element.color}">${firstLetterOfFirstName.toUpperCase()}${firstLetterOfLastName.toUpperCase()}</div>`;
      document.getElementById('profile').innerHTML = `
       <div class="profile" style="background-color:${element.color}">${firstLetterOfFirstName.toUpperCase()}${firstLetterOfLastName.toUpperCase()}</div>
       `;
    }
  }
};

const closeEditOverlay = () => {
  document.getElementById("editContactOverlay").remove();
  let inputs = document.getElementsByTagName("input");
  [...inputs].forEach((input) => {
    input.value = "";
  });
};

const toggleBetweenContacts = (userId) => {
  var currentUser = getUserById(userId);
  showContactData(currentUser);
};


const getUserById = (userId) => {
  var currentUser = storedContactsArray.filter(
    (v) => v != null && v.id == userId
  );
  return currentUser.length > 0 ? currentUser[0] : null;
};

async function saveContactData(userId) {
  let contactId = userId;
  let contact = storedContactsArray[contactId];
  let name = document.getElementById("name").value;
  let email = document.getElementById("mail").value;
  let phone = document.getElementById("phone").value;

  contact.userName = name;
  contact.userMail = email;
  contact.userPhone = phone;

  await backend.setItem("contacts", JSON.stringify(storedContactsArray));

  window.location.reload();
}

const defaultOnload = () => {
  document.getElementById("editContactOverlay").innerHTML = ``;
};


function removeValidationTooltip() {
  let tooltips = document.getElementsByClassName("validation-tooltip");
  if (tooltips) {
    [...tooltips].forEach((element) => {
      element.remove();
    });
  }
}


window.addEventListener("click", function (event) {
  let button = this.document.getElementById("requireFill");
  if (button && event.target != button) {
    removeValidationTooltip();
  }
});

