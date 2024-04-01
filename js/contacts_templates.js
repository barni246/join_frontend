function addContactTemplate() {
    let contactOverlay = document.createElement("div");
    contactOverlay.setAttribute("id", "overlay-blur-container");
    contactOverlay.onclick = function () { cancelContactData() }
    contactOverlay.innerHTML = /*html*/ `
  
    <div class="add-contact-overlay" onclick="stopPropagation(event)" >
      <div class="left-overlay">
              <div class="new-contact-noname mobile">
          
                <img src="assets/img/Group 13.png" alt="">
      
              </div>
        <div class="Task-are-better">
          <img src="assets/img/join_logo_light.png">
          <h1>Add Contact</h1>
          <p>Tasks are better with a team</p>
          <img src="assets/img/icon_line.png">
        </div>
      </div>
      <div class="add-contact-inputs">
        <div class="profile"><img src="assets/img/icon_person.png" alt="#"></div>
        <div class="input-fields">
          <form>
            <div class="fcf-form-group">
              <label for="Name" class="fcf-label"></label>
              <div class="fcf-input-group">
                <input type="text" id="name" name="Name" class="fcf-form-control" placeholder="Your first and last name" required>
                <img src="assets/img/icon_name.png">
              </div>
            </div>
            <div class="fcf-form-group">
              <label for="Email" class="fcf-label"></label>
              <div class="fcf-input-group">
                  <input type="email" id="mail" required name="Email" class="fcf-form-control" placeholder="Your email address">
                  <img src="assets/img/icon_mail.png">
              </div>
            </div>
            <div class="fcf-form-group">
              <label for="Phone" class="fcf-label"></label>
              <div class="fcf-input-group">
                <!-- <input type="tel" id="phone" name="Phone" pattern="^\+49 \d{4} \d{5}$" placeholder="+49 1234 56789" required> -->
                <!-- <input type="tel" id="phone" name="Phone" placeholder="1234567890" pattern="/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,}$/"  required> -->
                <input type="tel" id="phone" name="Phone" placeholder="1234567890"  required>
                <img src="assets/img/icon_phone.png">
              </div>
            </div>
          </form>
          <div class="button-container">
            <button class="button-style-cancel" onclick="cancelContactData()">Cancel <img src="assets/img/icon_close.png"></button>
            <button class="button-style-submit" onclick="if(formValidation()){createContactData()}" id="requireFill">Create contact <img src="assets/img/icon_create.png"></button>                       
          </div>
        </div>
      </div>
  </div>
  
    `;
    return contactOverlay;
  }


  function editContactTemplate(userId) {
    let editOverlay = document.createElement("div");
    editOverlay.setAttribute("id", "editContactOverlay");
    editOverlay.onclick = function () { closeEditOverlay() }
    editOverlay.innerHTML = /*html*/ `
       <div class="add-contact-overlay">
          <div id="leftOverlay"  onclick="stopPropagation(event)" class="left-overlay">
  
         <div id="edit-contact-avatar"></div>
            <div class="edit-contact-change">
              <img src="assets/img/join_logo_light.png">
              <h1>Edit Contact</h1>
              <p>Change contact information</p>
              <img src="assets/img/icon_line.png">
            </div>
          </div>
          <div class="add-contact-inputs"   onclick="stopPropagation(event)">
            <div class="profile-container">
               <div id=profile class="profile "><img src="assets/img/icon_person.png" alt="#"></div>
            </div>
           
            <div class="input-fields">
            <form>
                  <div class="fcf-form-group">
                    <label for="Name" class="fcf-label"></label>
                    <div class="fcf-input-group">
                      <input type="text" id="name" value="${storedContactsArray[userId].userName}" name="Name" class="fcf-form-control" placeholder="Your name" required >
                      <img src="assets/img/icon_name.png">
                    </div>
                  </div>
                  <div class="fcf-form-group">
                    <label for="Email" class="fcf-label"></label>
                    <div class="fcf-input-group">
                        <input type="email" id="mail" value="${storedContactsArray[userId].userMail}" name="Email" class="fcf-form-control" placeholder="Your email address" required>
                        <img src="assets/img/icon_mail.png">
                    </div>
                  </div>
                  <div class="fcf-form-group">
                    <label for="Phone" class="fcf-label"></label>
                    <div class="fcf-input-group">
                      <input type="tel" id="phone" value="${storedContactsArray[userId].userPhone}" name="Phone" placeholder="+49 1234 56789" required>
                      <img src="assets/img/icon_phone.png">
                    </div>
                  </div>
                </form>
              <div class="button-container">
                <button class="button-style-cancel" onclick="closeEditOverlay()">Cancel <img src="assets/img/icon_close.png"></button>
                <button class="button-style-submit" id="requireFill" onclick="if(formValidation()){saveContactData(${userId})}">Save Contact <img src="assets/img/icon_create.png"></button>                       
              </div> 
            </div>
          </div>
        </div>
  
    `;
    return editOverlay;
  }
  