/**
 * Represents the array of users.
 * @type {Array}
 */
let users = [];

/**
 * Represents the array of tasks.
 * @type {Array}
 */
let tasks = [];
let contacts = [];
let allclients = [];
let loggedInUser = []; 


/**
 * Adds selectedMenu / selectedImg effects to the selected menu element.
 * @param {string} menuitem - The menu item to be selected.
 */
function menuSelected(menuitem) {
    let menupoint = document.getElementById(menuitem);
    menupoint.classList.add("selectedMenu");
    if (menuitem == "Join-Privacy-Policy" || menuitem == "Join-Legal-Notice") {
        menupoint.style.color = '#cdcdcd';
    } else {
        menupoint.firstChild.classList.add("selectedImg");
    }
}

/**
 * Loads the templates of the sidemenu and the header asynchronously.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll("[include-html]");
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = "Page not found";
        }
    }
    menuSelected(document.title);
}

/**
 * Retrieves the initials from a user's full name.
 * @param {string} user - The full name of the user.
 * @returns {string} The initials of the user.
 */
function getInitials(user) {
    let names = user.split(' ');
    let firstletter = names[0].charAt(0).toUpperCase();
    return names[1] ? (firstletter + (names[1].charAt(0).toUpperCase())) : firstletter;
}

/**
 * Represents a task object.
 * @class
 * @param {string} category - The category of the task.
 * @param {string} label - The label of the task.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} date - The due date of the task.
 * @param {Array} subtasks - The array of subtasks for the task.
 * @param {string} priority - The priority of the task.
 * @param {Array} assigned - The array of users assigned to the task.
 */
function Task(category, label, title, description, date, subtasks, priority, assigned) {
    this.category = category,
    this.label = label,
    this.title = title,
    this.description = description,
    this.date = date,
    this.subtasks = subtasks,
    this.priority = priority,
    this.assigned = assigned  
}

/**
 * Loads tasks from local storage.
 * @async
 */
async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('taskobject'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * Loads users from local storage.
 * @async
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contactUsers'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * Logout Funktion
 * 
 */

async function logout() {
    try {
      loggedInUser = []; // Clear the logged in user data
      //await removeItem('userInformation'); // Remove user information from storage
      window.location.href = 'index.html'; // Redirect to the login page
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  }


/**
 * Holt die eingelogten Benutzer
 * 
 */
async function getLoggedInUser() {
    try {
        loggedInUser = JSON.parse(await getItem('userInformation'));
        return loggedInUser; // Rückgabe des abgerufenen Benutzers
    } catch (e) {
        console.error('Loading error:', e);
        return null; // Falls ein Fehler auftritt, wird null zurückgegeben
    }
  }
  
/**
 *  Überprüft, ob ein Cookie mit dem Namen "loggedIn" vorhanden ist
 * 
 */
  function isLoggedIn() {
    return document.cookie.includes('loggedIn=true');
}


/**
 *  Funktion zum Abrufen und Anzeigen des Benutzernamens
 * 
 */


async function getAndDisplayUserName() {
    try {
        if (isLoggedIn()) { // Überprüfe, ob ein Benutzer angemeldet ist
            let users = await getLoggedInUser(); // Benutzer abrufen und auf das Ergebnis warten
            let summaryNameElement = document.getElementById('summaryName');
            let user = users[0]; // Den ersten Benutzer im Array
            if (user && user.userInformation && user.userInformation.name) {
                summaryNameElement.textContent = user.userInformation.name;
            } else {
                summaryNameElement.textContent = 'Gast';
            }
        } else {
            let summaryNameElement = document.getElementById('summaryName');
            summaryNameElement.textContent = 'Gast';
        }
    } catch (error) {
        console.error('Fehler beim Abrufen des Benutzernamens:', error);
    }
}


/**
 * Funktion bei dem der Benutzername im Header steht
 * 
 */


async function getAndDisplayUserNameHeader() {
    try {
        if (isLoggedIn()) { // Überprüfe, ob ein Benutzer angemeldet ist
            let users = await getLoggedInUser(); // Benutzer abrufen und auf das Ergebnis warten
            let headerShortName = document.getElementById('headeruser')
            let user = users[0]; // Den ersten Benutzer im Array
            if (user && user.userInformation && user.userInformation.name) {
                headerShortName.textContent = user.userInformation.name.slice(0, 2).toUpperCase();
            } else {
                // Falls kein Benutzername vorhanden ist, setze "Gast"
                headerShortName.textContent = 'Gu';
            }
        } else {
            // Leere das Summary-Element, da kein Benutzer angemeldet ist
            headerShortName.textContent = 'Gu';
        }
    } catch (error) {
        console.error('Fehler beim Abrufen des Benutzernamens:', error);
    }
}


function openPopUp() {
    let popupContainer = document.getElementById("popupContainer");
    if (popupContainer.style.display === "block") {
      popupContainer.style.display = "none";
    } else {
      popupContainer.style.display = "block";
    }
  }

/**
 * Initializes the application by loading users and tasks, and updating task counts.
 * @async
 */
async function init() {
    await loadUsers();
    await loadTasks();
    updateTaskCounts(tasks);
    countUrgentTasks(tasks);
    getAndDisplayUserName();
}





