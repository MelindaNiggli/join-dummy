/**
 * Array to store user data
 * @type {Object[]}
 */
 let users = [];

/**
 * Function to render the initial animation and load users data
 */
function render() {
    loadAnimation();
}

/**
 * Function to load users data from storage
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e) {
        console.error('Loading error:', e);
    }
}


/**
 * Function to animate the logo and load users data
 */
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
    }, 800);

    setTimeout(function() {
        ContentLogin();
        if (window.innerWidth <= 767) {
            logo.style.backgroundImage = 'url(img/join-logo.svg)';
            logoWrapper.style.background = 'transparent';
        }
    }, 1000);
}

/**
 * Function to render login content
 */
function ContentLogin() {
    let content = document.getElementById('wrapperLogin');

    content.innerHTML += `
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
            <div id="pwInput" class="wrapper-input">
                <input type="password" placeholder="Password" id="password" required>
                <img src="./img/lock.svg" alt="Schloss Icon">
            </div>
            <p id="messagePW"></p>
            <div class="checkbox">
                <input type="checkbox" id="remember-me">
                <label for="remember-me">Remember Me</label>
            </div>
        </div>  
        <div class="wrapper-button">
            <button>Log in</button>
            <button type="button"  onclick="guestLogin()">Guest Log in</button>
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



/**
 * Function to hash a password using SHA-256 algorithm
 * @param {string} password - The password to be hashed
 * @returns {Promise<string>} - The hashed password
 */
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Function to handle user login
 * 
 */
async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let message = document.getElementById('messagePW');
    let border = document.getElementById('pwInput');

    // Hash the entered password
    let hashedPassword = await hashPassword(password);

    // Search for the user in the database
    let user = users.find(u => u.email === email && u.password === hashedPassword);
    
    if(user) {
        console.log('hello', user);
        loggedInUser.push({
            userInformation: user
        });
        // Setze das Cookie "loggedIn" mit einem Pfad von "/", dem Attribut "SameSite=None" und "secure"
        document.cookie = 'loggedIn=true; path=/; SameSite=None; secure';
        await setItem('userInformation', JSON.stringify(loggedInUser));
        window.location.href = 'summary.html'; 
    }else{
        message.innerHTML = `Wrong password Ups! Try again.`;
        message.style.display = 'flex';
        border.style.margin = '0p 0px 8px 0 !important';
        border.style.borderColor = '#FF8190';
    }
}


/**
 * Function to handle guest login
 * 
 */
function guestLogin() {
    loggedInUser = []; // Setze die loggedInUser-Variable zurück
    // Lösche das "loggedIn"-Cookie, um den Gastmodus zu aktivieren
    document.cookie = 'loggedIn=false; path=/; SameSite=None; secure'; // Cookie auf false setzen
    window.location.href = 'summary.html';
}

function resetForm() {
    nameUser.value = '';
    email.value = '';
    password.value = '';
    passwordAgain = '';
    registerBtn.disabled = false;

}
