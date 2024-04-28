
async function init(){
    await loadContactUsers();
    // Rufe die Funktion auf, um alle Benutzer zu löschen
    // Für den Reset : await clearExistingUsers();
    templateWrapperInfo();
}


// RESET FUNKTION UM ALLES ZU LÖCHEN
async function clearExistingUsers() {
    // Setze die Benutzerliste auf ein leeres Array
    let existingUsers = [];
    // Speichere die geleerte Benutzerliste
    await setItem('contactUsers', existingUsers);
    console.log('Alle Benutzer erfolgreich gelöscht.');
}


function templateWrapperInfo(){
    const wrapper =  document.getElementById('wrapperInfo');
    wrapper.innerHTML += `

    <div class="heading">
    <h1>Contacts</h1>
    <span class="linie"></span>
    <p>Better with a team</p>
</div>
<div id="userInfoDetails"></div>
    `
    if (window.innerWidth <= 767) {
        wrapper.innerHTML = '';
    }
  }

/**** SAVE USER TO LIST ****/


function addNewContact() {
    let overlay = document.getElementById('overlay');
    let container = document.getElementById('addContact');
    overlay.style.height = '100vh';
    overlay.style.position = 'fixed';
    container.style.display = 'flex';
    container.style.transform = 'translateX(1100px)';
    overlay.style.display = 'flex'; 

    setTimeout(function() {
        container.style.transform = 'translateX(0px)';
    }, 1); 
    const closeButton =  document.getElementById('closeNewContact')
    if (window.innerWidth <= 1075) {
        closeButton.src= './img/closeWhite.svg';
    }
}


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


/**** CONTACT LIST ****/

async function loadContactUsers() {
    try {
        // Daten laden
        contactUsers = JSON.parse(await getItem('contactUsers'));

        // Überprüfen, ob Daten geladen wurden
        if (contactUsers && contactUsers.length > 0) {
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

                // Die ersten zwei Buchstaben groß
                const firstTwoChars = contact.name.slice(0, 2).toUpperCase();

                // Erster Buchstabe des Namens groß
                const capitalizedWord = contact.name.charAt(0).toUpperCase() + contact.name.slice(1);

                // Kontakt Template anzeigen
                allUsersContainer.innerHTML += TemplateContactUsers(contact, index, firstTwoChars, capitalizedWord);
            });
        } else {
            // Zeige eine Nachricht an, wenn keine Kontaktbenutzer vorhanden sind
            const allUsersContainer = document.getElementById('allUsers');
            allUsersContainer.innerHTML = '<p>Keine Kontaktbenutzer vorhanden</p>';
        }
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



function back(){
    const wrapper =  document.getElementById('wrapperInfo');
    wrapper.innerHTML ='';
    wrapper.style.zIndex = '-2';
}
function more() {
    console.log('funktioniert')
    const wrapper = document.getElementById('editeDeleteWrapper');
    if (window.innerWidth <= 1075) {
        wrapper.style.display = 'block';
    } else {
        wrapper.style.display = 'none';
    }
}


async function showUserInfo(name, email, color, phone, index) {
    const wrapper =  document.getElementById('wrapperInfo');
    wrapper.innerHTML = `
    <div class="more" onclick="more()"><img src="./img/more_vert.svg" alt="see more"></div>
    <div  id="back" onclick="back()">
        <img src="./img/arrow-left-line.svg" alt="">
    </div>
    <div class="heading">
        <h1>Contacts</h1>
        <div class="wrapperInnerHeaing">
        <span class="linie"></span>
        <p>Better with a team</p>
        </div>
    </div>
    <div id="userInfoDetails"></div>
    `

    wrapper.style.zIndex = '0';
    await loadContactUsers(); // Aktualisieren der Benutzerliste
    const container = document.getElementById('userInfoDetails');
    if (container.style.transform === 'translateX(0px)') {
        container.style.transform = 'translateX(1100px)';
        setTimeout(function() {
            container.style.transform = 'translateX(0px)';
        }, 500); 
        if (window.innerWidth <= 1075) {
            wrapper.innerHTML= '';
        }
    } else {
        container.style.display = 'block';
        container.style.transform = 'translateX(1100px)';
        setTimeout(function() {
            container.style.transform = 'translateX(0px)';
        }, 1);
    }
    // Die ersten zwei Buchtaben gross
    const firstTwoChars = firstAndSecondCharUppercase(name);
    // Erster Buchstabe des Namens gross
    const capitalizedWord = firstCharUppercase(name);
    container.innerHTML = TemplateSideConatct(index, color, email, name, phone, firstTwoChars, capitalizedWord)
}

function firstAndSecondCharUppercase(name) {
    const string = name;
    return string.slice(0, 2).toUpperCase();
}

/**
 * Function to convert the first character of a string to uppercase
 * @param {string} name - The name string
 * @returns {string} - The modified string with the first character in uppercase
 */
function firstCharUppercase(name) {
    const firstLetter = name.charAt(0).toUpperCase();
    const restOfWord = name.slice(1);
    return firstLetter + restOfWord;
}



function EditHover(){
    document.getElementById('editimg').src = './img/edit-blue.svg';
}
function EditHoverOut(){
    document.getElementById('editimg').src = './img/edit.svg';
}
function DeleteHover(){
    document.getElementById('deleteImg').src = './img/delete-blue.svg';
}
function DeleteHoverOut(){
    document.getElementById('deleteImg').src = './img/delete.svg';
}


/**
 * Function to generate the HTML template for displaying user information
 * @param {number} index - The index of the user
 * @param {string} color - The color associated with the user
 * @param {string} email - The email of the user
 * @param {string} name - The name of the user
 * @param {string} phone - The phone number of the user
 * @param {string} firstTwoChars - The first two characters of the user's name in uppercase
 * @param {string} capitalizedWord - The user's name with the first character capitalized
 * @returns {string} - The HTML template for displaying user information
 */
function TemplateSideConatct(index,color,email,name,phone,firstTwoChars,capitalizedWord){
    return`
        <div id="userInfoSide">
        <div id="ProfileBadge${index}" class="profileBadge big" style="background-color: ${color};"> <p>${firstTwoChars}</p></div>
        
        <div class="wrapperFlex">
            <p id="nameContact" class="nameAside">${capitalizedWord}</p>
            <div id="editeDeleteWrapper" class="editeDeleteWrapper">
                <div class="edit" onmouseover="EditHover()"  onmouseout="EditHoverOut()"  onclick="editUser('${name}', '${email}','${color}','${phone}','${index}','${firstTwoChars}','${capitalizedWord}')">
                    <img id="editimg" src="./img/edit.svg" alt="edit icon">
                    <p>Edit</p>
                </div>
                <div class="delete" onmouseover="DeleteHover()"  onmouseout="DeleteHoverOut()" onclick="deleteUser('${name}')">
                    <img id="deleteImg" src="./img/delete.svg" alt="delete icon">
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
            <a class="phone" href="tel:${phone}">+41(0)${phone}</a>
        </div>
        </div>

    `;
}

/**
 * Function to display a success message upon deleting a user
 * @param {string} name - The name of the deleted user
 */
function messageDeleted(name){
    const msg =  document.getElementById('messageBox')
    msg.innerHTML = `User *${name}*  deleted successfully`;
    msg.style.background = 'var(--join-black)';
    msg.style.padding = '25px';
    msg.style.borderRadius = '20px';
    msg.style.color = 'white';
    msg.style.fontSize ='20px';
    setTimeout(function() {
        msg.innerHTML = ""; // Clears the content of the message box
    }, 3000); // Clears the message after 3 seconds (3000 milliseconds)
}

/**
 * Async function to delete a user
 * @param {string} name - The name of the user to delete
 */
async function deleteUser(name) {
    await loadContactUsers();
    try {
        // Load existing users
        let existingUsers = await getItem('contactUsers');
       existingUsers = JSON.parse(await getItem('contactUsers'))

        // Find the index of the user to delete
        const index = existingUsers.findIndex(user => user.name === name);
        if (index !== -1) {
            messageDeleted(name);
            // Remove the user from the array
            existingUsers.splice(index, 1);
            await setItem('contactUsers', JSON.stringify(existingUsers));
            console.log(`User ${name} deleted successfully.`);
            await loadContactUsers(); // Update the user list
            resetForm(); 
        } else {
            console.error(`User ${name} not found.`);
        }
    } catch (error) {
        console.error(`Error deleting user ${name}:`, error);
    }
}

/**
 * Async function to edit a user
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @param {string} color - The color associated with the user
 * @param {string} phone - The phone number of the user
 */
async function editUser(name, email, color, phone) {
    await loadContactUsers();
    let overlayEdit = document.getElementById('overlayEdit');
    let containerEdit = document.getElementById('editContact');
    overlayEdit.style.height = '100vh';
    overlayEdit.style.position = 'absolute';
    containerEdit.style.display = 'flex';
    containerEdit.style.transform = 'translateX(1100px)';
    overlayEdit.style.display = 'flex';

    setTimeout(function() {
        containerEdit.style.transform = 'translateX(0px)';
    }, 1);
    
    const firstTwoChars = firstAndSecondCharUppercase(name); // Use the result of firstCharUppercase here
    containerEdit.innerHTML = TemplateContainerUpdate(name, email, color, phone, firstTwoChars);


   const closeButton =  document.getElementById('close')
    if (window.innerWidth <= 1075) {
        closeButton.src= './img/closeWhite.svg';
    }
}

/**
 * Function to generate the HTML template for editing a user
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @param {string} color - The color associated with the user
 * @param {string} phone - The phone number of the user
 * @param {string} firstTwoChars - The first two characters of the user's name in uppercase
 * @returns {string} - The HTML template for editing a user
 */
function TemplateContainerUpdate(name, email, color, phone, firstTwoChars) {
    return `
    <div class="wrapper-left">
        <img src="./img/join-logo-weiss.svg" alt="logo">
        <div class="text">
            <h1>Edit contact</h1>
            <span class="linie"></span>
        </div>
    </div>
    <div class="wrapper-right">
        <img  id="close" class="close" src="./img/close.svg" alt="close" onclick="closeUpdate()">
        <div class="badge edit " style="background: ${color};">
        <p>${firstTwoChars}</p>
        </div>
        <form class="saveUser" onsubmit="return false;">
            <div class="wrapper-input-field">
                <div class="wrapper-input">
                    <input type="text" id="userInputUpdate" placeholder="Name" value="${name}" required>
                    <img src="./img/person.svg" alt="Person Icon" req>
                </div>
                <div class="wrapper-input">
                    <input type="email" id="emailInputUpdate" placeholder="Email" value="${email}" required>
                    <img src="./img/mail.svg" alt="Email Icon">
                </div>
                <div class="wrapper-input">
                    <input type="phone" id="phoneInputUpdate" placeholder="Phone" value="${phone}" required>
                    <img src="./img/call.svg" alt="Phone Icon">
                </div>
                <div class="wrapper-button">
                    <div class="delete">
                        <button class="cancle" onclick="deleteUser('${name}')">Delete</button>
                        <button class="BT-Black" onclick="updateUser('${name}')">Save<img src="./img/check.svg" alt="check"></button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    `;
}

/**
 * Function to display a success message upon updating a user
 * @param {string} name - The name of the updated user
 */
function messageSuccessfully(name){
    const msg =  document.getElementById('messageBox')
    msg.innerHTML = `User *${name}* updated successfully`;
    msg.style.display = 'block';
    msg.style.background = 'var(--join-black)';
    msg.style.padding = '25px';
    msg.style.borderRadius = '20px';
    msg.style.color = 'white';
    msg.style.fontSize ='20px'

    setTimeout(function() {
        msg.innerHTML = ""; // Clears the content of the message box
        msg.style.display = 'none';
    }, 1000); // Clears the message after 3 seconds (3000 milliseconds)
    showUserInfo();
}

/**
 * Async function to update a user
 * @param {string} name - The name of the user to update
 */
async function updateUser(name) {
    console.log(name);
    // Get data from input fields
    const nameInput = document.getElementById('userInputUpdate').value;
    const email = document.getElementById('emailInputUpdate').value;
    const phone = document.getElementById('phoneInputUpdate').value;

    // Load existing users from storage
    let existingUsers = await getItem('contactUsers');
    existingUsers = JSON.parse(existingUsers) || [];

    // Find the user to update by iterating through the array
    let userToUpdate = existingUsers.find(user => user.name === name);
    
    if (userToUpdate) {
        // Update user data
        userToUpdate.name = nameInput;
        userToUpdate.email = email;
        userToUpdate.phone = phone;

         // Save the updated array to remote storage
         await setItem('contactUsers', JSON.stringify(existingUsers));
         await loadContactUsers(); // Update the user list

         let overlay = document.getElementById('overlayEdit');
         let container = document.getElementById('editContact');
         container.style.transform = 'translateX(1600px)';
         setTimeout(function() {
             overlay.style.display = 'none';
         }, 500); 

         messageSuccessfully(name);
         showUserInfo();
         
    } else {
        console.log('User not found!');

    }
}

/**
 * Function to close the overlay and the user contact edit form
 */
function closeUpdate() {
    let overlay = document.getElementById('overlayEdit');
    let container = document.getElementById('editContact');
    container.style.transform = 'translateX(1600px)';
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 500); 
}

