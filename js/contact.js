
async function init(){
    loadContactUsers();
    // Rufe die Funktion auf, um alle Benutzer zu löschen
    // Für den Reset : await clearExistingUsers();
}


// RESET FUNKTION UM ALLES ZU LÖCHEN
async function clearExistingUsers() {
    // Setze die Benutzerliste auf ein leeres Array
    let existingUsers = [];

    // Speichere die geleerte Benutzerliste
    await setItem('contactUsers', existingUsers);

    console.log('Alle Benutzer erfolgreich gelöscht.');
}


let contactUsers = [];

function addNewContact() {
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

/*****SAVE USER *****/

async function saveUser(){
    // Zuerst laden Sie die vorhandenen Benutzer aus dem Remote-Speicher
    let existingUsers = await getItem('contactUsers');
    existingUsers = existingUsers ? JSON.parse(existingUsers) : [];

    // Array mit verfügbaren Farben
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

    // Zufällige Farbe auswählen
    const color = colors[Math.floor(Math.random() * colors.length)];

   // Neuen User Pushen 
    existingUsers.push({
        name: nameUser.value,
        email: emailUser.value,
        phone: phoneUser.value,
        color: color
    });

    // Speichern des aktualisierte Arrays im Remote-Speicher
    await setItem('contactUsers', JSON.stringify(existingUsers));

    await loadContactUsers();
    resetForm();
    let overlay = document.getElementById('overlay');
    let container = document.getElementById('addContact');
    container.style.transform = 'translateX(1600px)';
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 500); 
}
    

// Zurücksetzen des Formulars
function resetForm(){
    nameUser.value = '';
    emailUser.value = '';
    phoneUser.value = '';
}


function closeContact() {
    let overlay = document.getElementById('overlay');
    let container = document.getElementById('addContact');
    container.style.transform = 'translateX(1600px)';
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 500); 
}


async function loadContactUsers() {
    try {
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

            // Die ersten zwei Buchtaben gross
            const string = contact.name;
            const firstTwoChars = string.slice(0, 2).toUpperCase();

            // Erster Buchstabe des Namens gross
            const firstLetter = string.charAt(0).toUpperCase();
            const restOfWord = string.slice(1);
            const capitalizedWord = firstLetter + restOfWord;

            // Kontakt Template anzeigen
            allUsersContainer.innerHTML +=  TemplateContactUsers(contact, index, firstTwoChars, capitalizedWord);
        });
    } catch (e) {
        console.log('Fehler:', e);
    }
}


// Template Contact Users bei der Kontaktliste
function TemplateContactUsers(contact, index,firstTwoChars, capitalizedWord) {
    return `
        <div class="contactUser" onclick="showUserInfo('${contact.name}', '${contact.email}','${contact.color}','${contact.phone}','${index}')">
            <div id="ProfileBadge${index}" class="profileBadge" style="background-color: ${contact.color};">
                <p>${firstTwoChars}</p>
            </div>
            <div id="userInfo">
                <p id="nameContact">${capitalizedWord}</p>
                <p id="emailContact">${contact.email}</p>
            </div>
        </div>
    `;
}


function showUserInfo(name, email,color,phone,index) {
    const container = document.getElementById('userInfoDetails');
    if (container.style.transform === 'translateX(0px)') {
        container.style.transform = 'translateX(1100px)';
        setTimeout(function() {
            container.style.transform = 'translateX(0px)';
        }, 500); 
    } else {
        container.style.display = 'block';
        container.style.transform = 'translateX(1100px)';
        setTimeout(function() {
            container.style.transform = 'translateX(0px)';
        }, 1);
    }
    // Die ersten zwei Buchtaben gross
    const string = name;
    const firstTwoChars = string.slice(0, 2).toUpperCase();

    // Erster Buchstabe des Namens gross
    const firstLetter = name.charAt(0).toUpperCase();
    const restOfWord = name.slice(1);
    const capitalizedWord = firstLetter + restOfWord;
    
    container.innerHTML = TemplateSideConatct(index, color,email,name, phone,firstTwoChars, capitalizedWord);
}


function TemplateSideConatct(index,color,email,name,phone,firstTwoChars, capitalizedWord){
    return`
        <div id="userInfoSide">
        <div id="ProfileBadge${index}" class="profileBadge big" style="background-color: ${color};"> <p>${firstTwoChars}</p></div>
        
                
        <div class="wrapperFlex">
            <p id="nameContact" class="nameAside">${capitalizedWord}</p>
            <div class="editeDeleteWrapper">
                <div class="edit" onclick="editUser('${name}')">
                    <img src="./img/edit.svg" alt="edit icon">
                    <p>Edit</p>
                </div>
                <div class="delete" onclick="deleteUser('${name}')">
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
            <a href="tel:${phone}">${phone}</a>
        </div>
        </div>

    `
}


function messageSuccessfully(name){
    const msg =  document.getElementById('messageBox')
    msg.innerHTML = `User *${name}*  deltetd successfully`;
    msg.style.background = 'var(--join-black)';
    msg.style.padding = '25px';
    msg.style.borderRadius = '20px';
    msg.style.color = 'white';
    msg.style.fontSize ='20px'
}

// DELETE USER
async function deleteUser(name) {
    await loadContactUsers();
    try {
        // Laden der vorhandenen Benutzer
        let existingUsers = await getItem('contactUsers');
       existingUsers = JSON.parse(await getItem('contactUsers'))

        // Finden des Index des Benutzers, der gelöscht werden soll
        const index = existingUsers.findIndex(user => user.name === name);
        if (index !== -1) {
            messageSuccessfully(name);
            // Entfernen des Benutzers aus dem Array
            existingUsers.splice(index, 1);
            
            // Speichern des aktualisierten Arrays im Remote-Speicher
            await setItem('contactUsers', JSON.stringify(existingUsers));

            console.log(`User ${name} deleted successfully.`);
            await loadContactUsers(); // Aktualisieren der Benutzerliste
            resetForm(); // Zurücksetzen des Formulars
        } else {
            console.error(`User ${name} not found.`);
        }
    } catch (error) {
        console.error(`Error deleting user ${name}:`, error);
    }
}


//EDIT USER

async function editUser(){
    
}