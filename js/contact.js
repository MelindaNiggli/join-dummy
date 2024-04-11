function showContact() {
    let overlay = document.getElementById('overlay');
    let container = document.getElementById('addContact');
    overlay.style.height = '100vh';
    overlay.style.position = 'absolute';
    container.style.display = 'flex';
    container.style.transform = 'translateX(1100px)';
    overlay.style.display = 'flex'; 

    setTimeout(function() {
        container.style.transform = 'translateX(0px)';
    }, 1); 
}

function closeContact() {
    let overlay = document.getElementById('overlay');
    let container = document.getElementById('addContact');
    container.style.transform = 'translateX(1600px)';
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 500); 
}


let contactUsers = [];
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
    includeHTML();
    loadContactUsers();
}

// Zufällige Farbe auswählen
function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
let color = getRandomColor();
async function loadContactUsers() {
    try {
        // JSON-Daten der Kontaktbenutzer abrufen und parsen
        let contactUsers = JSON.parse(await getItem('contactUsers'));

        // Kontakte alphabetisch nach Namen sortieren
        contactUsers.sort((a, b) => a.name.localeCompare(b.name));

        // Vorhandene Kontaktliste löschen
        const allUsersContainer = document.getElementById('allUsers');
        allUsersContainer.innerHTML = '';

        // Durch sortierte Kontakte iterieren und sie anzeigen
        contactUsers.forEach((contact, index) => {
            // Erstes Zeichen für die Gruppierung erhalten
            const firstChar = contact.name.charAt().toUpperCase();

            // Falls das erste Zeichen vom vorherigen abweicht, ein neues Gruppierungselement hinzufügen
            const previousChar = index > 0 ? contactUsers[index - 1].name.charAt(0) : '';
            if (firstChar !== previousChar) {
                allUsersContainer.innerHTML += `
                    <p class="Buchstabe">${firstChar}</p>
                    <span class="linie"></span>
                `;
            }

            const string = contact.name;
            const firstTwoChars = string.slice(0, 2).toUpperCase();


            // Kontakt anzeigen
            allUsersContainer.innerHTML += `
            <div class="contactUser" onclick="showUserInfo('${contact.name}', '${contact.email}','${contact.color}','${index}')">

                    <div id="ProfileBadge${index}" class="profileBadge" style="background-color: ${contact.color};">
                        <p>${firstTwoChars}</p>
                    </div>
                    <div id="userInfo">
                        <p id="nameContact">${contact.name}</p>
                        <p id="emailContact">${contact.email}</p>
                    </div>
                </div>
            `;
        });
    } catch (e) {
        console.log('Fehler:', e);
    }
}

function showUserInfo(name, email,color,index) {
    console.log(name);
    console.log(email);
    console.log(color);


    const string = name;
    const firstTwoChars = string.slice(0, 2).toUpperCase();


    const firstLetter = name.charAt(0).toUpperCase();
    const restOfWord = name.slice(1);
    const capitalizedWord = firstLetter + restOfWord;
    



    const container = document.getElementById('userInfoDetails');

    container.innerHTML = `

    <div id="userInfoSide">
        <div id="ProfileBadge${index}" class="profileBadge big" style="background-color: ${color};"> <p>${firstTwoChars}</p></div>
          
                
        <div class="wrapperFlex">
            <p id="nameContact" class="nameAside">${capitalizedWord}</p>
            <div class="editeDeleteWrapper">
                <div class="edit">
                    <img src="./img/edit.svg" alt="edit icon">
                    <p>Edit</p>
                </div>
                <div class="delete">
                    <img src="./img/delete.svg" alt="delete icon">
                    <p>Delete</p>
                </div>
            </div>
        </div>
    </div>
    <p class="contactInfo">Contact Information</p>


    <div>
        <div class="wrapperE">
            <p>Email</p>
            <a href="mailto:${email}">${email}</a>
        </div>
        <div class="wrapperP">
            <p>Phone</p>
            <a href="tel:"></a>
        </div>
    </div>
    
    `
}


async function saveUser(){

    console.log('funktioniert')
    contactUsers.push({
        name: nameUser.value,
        email: emailUser.value,
        phone: phoneUser.value,
        color: color
    });
    await setItem('contactUsers', JSON.stringify(contactUsers));
    resetForm();
}


function resetForm(){
    nameUser.value = '';
    emailUser.value = '';
    phoneUser.value = '';
}