/**
 * Array containing predefined colors for user registration
 * @type {string[]}
 */
const colors = [
    '#0038FF',
    '#00BEE8',
    '#1FD7C1',
    '#6E52FF',
    '#9327FF', 
    '#C3FF2B',
    '#FC71FF',
    '#FF4646',
    '#FF5EB3',
    '#FF745E',
    '#FF7A00',
    '#FFA35E',
    '#FFBB2B',
    '#FFC701',
    '#FFE62B'
];

/**
 * Function to get a random color from the predefined array of colors
 * @returns {string} - A randomly selected color hex code
 */
function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

let color = getRandomColor();
let registerBtn = document.getElementById('registerBTN').disabled


// Hash the password
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}


// Error Messages
//RED
function red(){
    const msg =  document.getElementById('messageBox');
    msg.style.backgroundColor= '#29abe2';
    msg.style.padding = '25px';
    msg.style.borderRadius = '20px';
    msg.style.color = 'white';
    msg.style.fontSize ='20px'
}


/**
 * Function to display a red error message indicating password mismatch
 */
function messageRedPasswort() {
    const msg =  document.getElementById('messageBox');
    msg.innerHTML = `It's not the same Password, please try again !`;
    red();
}


/**
 * Function to display a red error message indicating checkbox not checked
 */
function messageRedCheckbox() {
    const msg =  document.getElementById('messageBox');
    msg.innerHTML = `Please agree the Checkbox before proceeding!`;
    red();
}


/**
 * Function to display success message after successful registration
 */
function messageSuccessfully() {
    const msg =  document.getElementById('messageBox')
    msg.innerHTML = `You Signed Up successfully`
    msg.style.background = 'var(--join-black)';
    msg.style.padding = '25px';
    msg.style.borderRadius = '20px';
    msg.style.color = 'white';
    msg.style.fontSize ='20px'
}


/**
 * Function to display a red error message indicating email already registered
 */
function messageEmailRegistered() {
    const msg =  document.getElementById('messageBox')
    msg.innerHTML = `Email Address Already Registered`
    red();
}


/**
 * Function to add a user to the system after validation
 */
async function addUser() {
    let checkbox = document.getElementById('remember-me');
    const hashedPassword = await hashPassword(password.value);
    const hashedPasswordAgain = await hashPassword(passwordAgain.value);
    
    // Check if checkbox is checked and email is not already registered
    const isEmailRegistered = users.some(user => user.email === email.value);
    
    if (password.value === passwordAgain.value && !checkbox.checked == false && !isEmailRegistered) {
        users.push({
            name: nameUser.value,
            email: email.value,
            password: hashedPassword,
            passwordAgain: hashedPasswordAgain,
            color: color
        });
        await setItem('users', JSON.stringify(users));
        resetForm();
        messageSuccessfully(); // Positive registration message
    } else { 
        if (!checkbox.checked == true && !isEmailRegistered) {
            messageRedCheckbox(); // Checkbox error message
        } 
        if (isEmailRegistered) {
            messageEmailRegistered(); // Email already registered error message
        }
        if (password.value !== passwordAgain.value) {
            messageRedPasswort(); // Password error message
        }  
    }
}


/**
 * Function to reset the registration form
 */
function resetForm() {
    nameUser.value = '';
    email.value = '';
    password.value = '';
    passwordAgain = '';
    registerBtn.disabled = false;
}