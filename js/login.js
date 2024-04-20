
function render(){
    loadAnimation();
}
async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
  }

  let users = [];
function loadAnimation() {
    let logo = document.getElementById('logoImg');
    let logoWrapper = document.getElementById('logo');

    setTimeout(function() {
        logo.style.position = 'absolute';
        logo.style.top = '100px';
        logo.style.left = '77px';
        logo.style.transition = 'top 1s ease-in, left 1s ease-in, width 1s ease-in';
        logo.style.width = '100.03px';
        logo.style.transform = '';
        if (window.innerWidth <= 767) {
            logoWrapper.style.background = 'var(--join-black)'; 
        }
        loadUsers();
    }, 800); // 1000 Millisekunden = 1 Sekunde

    setTimeout(function() {
        ContentLogin();
        if (window.innerWidth <= 767) {
            logo.style.backgroundImage = 'url(img/join-logo.svg)'; // Pfad zum neuen Hintergrundbild
            logoWrapper.style.background = 'transparent'; // Hintergrundfarbe während der Animation
        }
    }, 1000); // 1000 Millisekunden = 1 Sekunde
}

function ContentLogin(){

    let content = document.getElementById('wrapperLogin');

    content.innerHTML += 
    `

    <form id="formLogin" onsubmit="login(); return false">
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
    <div class="wrapper-sing-up"> 
    <p>Not a Join user?</p>
    <a href="./registartion.html">Sign up</a>
</div>
    <footer>
        <a href="./privacy.html">Privacy Policy</a>
        <a href="./legal.html">Legal Notice</a>
    </footer>
    `;
 
 

}


async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

// Das Passwort hashen
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function login(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Hash das eingegebene Passwort
    let hashedPassword = await hashPassword(password);

    // Suche nach dem Benutzer in der Datenbank
    let user = users.find(u => u.email === email && u.password === hashedPassword);
    
    if(user){
        window.location.href = 'summary.html';
    } else {
        console.log("Benutzer nicht gefunden oder Passwort falsch.");
    }
}


function resetForm() {
    nameUser.value = '';
    email.value = '';
    password.value = '';
    passwordAgain = '';
    registerBtn.disabled = false;
}