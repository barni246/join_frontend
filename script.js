async function init() {
    await includeHTML();
    navbarToggler();
    tooltip= document.getElementById('tooltip');
}
 
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); 
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

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

let logoutOpen = false;
let tooltip; 


document.addEventListener('click', (event)=> {
    if(!tooltip.contains(event.target)){
        tooltip.style.display = 'none';
        logoutOpen = false;
    }
})


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

function stopPropagation(event) {
    event.stopPropagation();
}