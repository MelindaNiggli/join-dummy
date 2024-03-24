

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

let registerBtn = document.getElementById('registerBTN')
async function addUser() {

    registerBtn.disabled = true;
    users.push({
        name: nameUser.value,
        email: email.value,
        password: password.value,
        passwordAgain: passwordAgain.value
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
    window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';
}

function resetForm() {
    nameUser.value = '';
    email.value = '';
    password.value = '';
    passwordAgain = '';
    registerBtn.disabled = false;
}