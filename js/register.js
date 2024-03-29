

let users = [];
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

async function init(){
    loadUsers();
}

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Zufällige Farbe auswählen
let color = getRandomColor();

let registerBtn = document.getElementById('registerBTN')
async function addUser() {

    registerBtn.disabled = true;
    users.push({
        name: nameUser.value,
        email: email.value,
        password: password.value,
        passwordAgain: passwordAgain.value,
        color: color
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
    window.location.href = 'login.html?msg=You Signed Up successfully';
}

function resetForm() {
    nameUser.value = '';
    email.value = '';
    password.value = '';
    passwordAgain = '';
    registerBtn.disabled = false;
}