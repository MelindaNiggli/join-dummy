
function loadAnimation() {
    let logo = document.getElementById('logo');
    setTimeout(function() {
        // Verstecke den Loader
        logo.style.width = '100.03px';
        logo.style.position = 'absolute';
        logo.style.top = '80px';
        logo.style.left = '77px';
        logo.style.transition = '1s ease-in'
    
        // Rufe deine JavaScript-Funktion auf

        init();

    }, 500); // 1000 Millisekunden = 1 Sekunde
    setTimeout(function() {
        ContentLogin();
    }, 1700); // 1000 Millisekunden = 1 Sekunde
}

function ContentLogin(){
    let content= document.getElementById('wrapperLogin').innerHTML += 
    `
    <div class="wrapper-sing-up"> 
        <p>Not a Join user?</p>
        <a href="./registartion.html">Sign up</a>
    </div>
    <form style="trasnition: 8s ease-in" onsubmit="login(); return false">
        <div class="wrapper-heading">
            <h1>Log in</h1>
            <span class="linie"></span>
        </div>
        <div class="wrapper-input-field">
            <div class="wrapper-input">
                <input type="email" placeholder="Email" id="email" required> 
                <img src="./img/mail.svg" alt="Email Icon">
            </div>
            <div class="wrapper-input">
                <input type="password" placeholder="Password" id="password" required>
                <img src="./img/lock.svg" alt="Schloss Icon">
            </div>
            <div class="checkbox">
                <input type="checkbox" id="remember-me">
                <label for="remember-me">Remember Me</label>
            </div>
        </div>  
        <div class="wrapper-button">
            <button onclick="">Log in</button>
            <button>Guest Log in</button>
        </div>
    </form>
    
    <div id="messageBox"></div>
    
    <footer>
        <a href="./privacy.html">Privacy Policy</a>
        <a href="./legal.html">Legal Notice</a>
    </footer>
    `;

}

async function init() {
    loadUsers();
}


async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
const messageBox = document.getElementById('messageBox'); 

if (msg) {
    messageBox.innerHTML = msg; 
}



function login(){

    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find( u => u.email == email.value && u.password == password.value);
    console.log(user);
    if(user){
        window.location.href = 'summary.html';
    }

}

function resetForm() {
    nameUser.value = '';
    email.value = '';
    password.value = '';
    passwordAgain = '';
    registerBtn.disabled = false;
}