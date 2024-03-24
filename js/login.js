
let users = [];


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
        window.location.href = 'board.html';
    }

}

function resetForm() {
    nameUser.value = '';
    email.value = '';
    password.value = '';
    passwordAgain = '';
    registerBtn.disabled = false;
}