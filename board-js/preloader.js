
 setURL('https://barnabas-gonda.de/post/smallest_backend_ever');

let contacts = [];

async function init() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('keyTasks')) || [];
    contacts = JSON.parse(backend.getItem("contacts")) || [];
    await includeHTML();
    navbarToggler();
    tooltip= document.getElementById('tooltip');
    updateHTML();
}

init();

function navbarToggler() {
    const url= window.location.href;
    const currentPage = url.replace(/^(?:\/\/|[^/]+)*\//, '');
    const currentPageClean=  currentPage.replace("_", " ").replace(".html", "");
    const menuLinks= document.querySelectorAll('.nav-item');
    [...menuLinks].forEach(item => {
        if (currentPageClean.includes(item.innerText.toLowerCase())) {
            item.classList.add('active-nav');
        }
    })
}

let logoutOpen= false;
let tooltip; 

function openCloseLogout() {
    
    if (logoutOpen) {
        tooltip.style.display= "none";
        logoutOpen= false;    
    }

    else {
        tooltip.style.display= "block";
        tooltip.innerHTML = '';
        tooltip.innerHTML = `
        <div class="tooltipLinks" onclick="window.location.href= 'help.html'">
          <img onclick="window.location.href= 'help.html'" id="helpTooltip" src="assets/img/icon_help.png">
          <a  href="help.html"> Help</a>
        </div>

        <div class="tooltipLinks">
          <img id="legalNoticeTooltip" onclick="window.location.href= 'legal_notice.html'" src="assets/img/icon_legal_notice.png">
          <a   href="legal_notice.html">Legal Notice</a>
       </div>

      <div class="tooltipLinks" onclick="logout()">
      <img id="personTooltip" src="assets/img/Group 13.svg" >
      <a  href="#" onclick="logout()">Logout</a>
    </div>
       
        
       
        `;
        logoutOpen= true;   
    }
}


 async function logout() {
    setURL('https://barnabas-gonda.de/post/smallest_backend_ever');
     await downloadFromServer();
     users = JSON.parse(backend.getItem("users")) || [];
     let index= users.findIndex(u => {
         return u.loggedIn == true
     })
     if (index !== -1) {
         users[index].loggedIn= false;
         await backend.setItem("users", JSON.stringify(users));
         window.location.href = "index.html";
     }
     else {
         window.location.href = "index.html";
     }
 }


 document.addEventListener('click', (event)=> {
    tooltip = document.getElementById('tooltip');
    if(!tooltip.contains(event.target)){
        tooltip.style.display = 'none';
        logoutOpen = false;
    }
})