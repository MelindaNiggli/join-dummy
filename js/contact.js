/**
 * Function to convert the first and second characters of a string to uppercase
 * @param {string} name - The name string
 * @returns {string} - The modified string with the first and second characters in uppercase
 */
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
            <div class="editeDeleteWrapper">
                <div class="edit" onclick="editUser('${name}', '${email}','${color}','${phone}','${index}','${firstTwoChars}','${capitalizedWord}')">
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
            <p >Phone</p>
            <a class="phone" href="tel:${phone}">${phone}</a>
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
        <img class="close" src="./img/close.svg" alt="close" onclick="closeUpdate()">
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
    msg.style.background = 'var(--join-black)';
    msg.style.padding = '25px';
    msg.style.borderRadius = '20px';
    msg.style.color = 'white';
    msg.style.fontSize ='20px'

    setTimeout(function() {
        msg.innerHTML = ""; // Clears the content of the message box
    }, 3000); // Clears the message after 3 seconds (3000 milliseconds)
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

