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

        // Überprüfen Sie die Bildschirmbreite, um zu entscheiden, ob es sich um eine mobile Ansicht handelt
        if (window.innerWidth <= 767) {
            // Ändern Sie den Hintergrund des logoWrapper-Elements während der Animation, wenn die Bildschirmbreite mobil ist
            logoWrapper.style.background = 'var(--join-black)'; // Hintergrundfarbe während der Animation
        }

        // Rufe deine JavaScript-Funktion auf
        init();
    }, 800); // 1000 Millisekunden = 1 Sekunde

    setTimeout(function() {
        ContentLogin();
       
        // Überprüfen Sie die Bildschirmbreite, um zu entscheiden, ob es sich um eine mobile Ansicht handelt
        if (window.innerWidth <= 767) {
            // Ändern Sie das Hintergrundbild des logoWrapper-Elements während der Animation, wenn die Bildschirmbreite mobil ist
            logo.style.backgroundImage = 'url(img/join-logo.svg)'; // Pfad zum neuen Hintergrundbild
            // Ändern Sie den Hintergrund des logoWrapper-Elements während der Animation, wenn die Bildschirmbreite mobil ist
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