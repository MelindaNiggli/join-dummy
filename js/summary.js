document.addEventListener('DOMContentLoaded', function() {
  getAndDisplayUserName();
  displayCurrentDate();
});
/**
 * Updates the task counts for each status and displays them.
 * @param {Array} tasks - The array of tasks.
 */
function updateTaskCounts(tasks) {
  const counts = { todo: 0, progress: 0, feedback: 0, done: 0 };
  const taskAmount = tasks.length;

  tasks.forEach(task => {
    if (task.category === 'todo') counts.todo++;
    else if (task.category === 'progress') counts.progress++;
    else if (task.category === 'feedback') counts.feedback++;
    else if (task.category === 'done') counts.done++;
  });

  document.getElementById("toDoAmount").textContent = counts.todo;
  document.getElementById("progressAmount").textContent = counts.progress;
  document.getElementById("feedbackAmount").textContent = counts.feedback;
  document.getElementById("doneAmount").textContent = counts.done;
  document.getElementById("taskAmount").textContent = taskAmount;
}

/**
 * Counts the number of urgent tasks and displays them.
 * @param {Array} tasks - The array of tasks.
 */
function countUrgentTasks(tasks) {
  let urgentCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].priority === "urgent") {
      urgentCount++;
    }
  }
  document.getElementById("urgentAmount").textContent = urgentCount;
  return urgentCount;
}

/**
 * Updates the greeting message based on the current time.
 */
function updateGreeting() {
  const now = new Date();
  const hour = now.getHours();

  let greetingText;

  if (hour < 12) {
    greetingText = "Good morning";
  } else if (hour < 18) {
    greetingText = "Good day";
  } else {
    greetingText = "Good evening";
  }

  const greetElement = document.getElementById('greet');
  if (greetElement) { 
    greetElement.textContent = greetingText;
  }
}

updateGreeting();

function displayCurrentDate() {
  const urgentCount = countUrgentTasks(tasks); // Verwende die vorhandene Funktion, um die Anzahl der dringenden Aufgaben zu erhalten
  const deadlineCountElement = document.getElementById("urgentAmount");
  if (deadlineCountElement) {
    deadlineCountElement.textContent = urgentCount;
  }
  if (urgentCount > 0) {
    // Falls es dringende Aufgaben gibt
    const earliestDate = tasks
      .filter(task => task.priority === "urgent") // Filtere die dringenden Aufgaben
      .map(task => new Date(task.date)) // Wandle das Fälligkeitsdatum in ein Date-Objekt um
      .reduce((a, b) => (a < b ? a : b)); // Finde das früheste Datum

    console.log('Frühestes Datum:', earliestDate); // Hinzugefügte console.log für das früheste Datum

    const deadlineElement = document.getElementById("currentDate");
    deadlineElement.textContent = formatDate(earliestDate);
    return earliestDate;
  }
}

function formatDate(date) {
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}



/**
 * Retrieves the logged-in user from local storage.
 * @returns {Object|null} - The logged-in user or null if no user is logged in.
 */
function getLoggedInUser() {
  return loggedInUser.length > 0 ? loggedInUser[0] : null;
}

/**
 * Displays the username in the summary area.
 */
async function getAndDisplayUserName() {
  try {
    let loggedInUser = getLoggedInUser(); // Benutzer aus dem Array abrufen
    let summaryNameElement = document.getElementById('summaryName');
    if (loggedInUser) { // Überprüfen, ob ein Benutzer angemeldet ist
      const name = loggedInUser.userInformation.name; // Namen des Benutzers abrufen
      summaryNameElement.textContent = name; // Den Namen im HTML-Dokument anzeigen
    } else {
      summaryNameElement.textContent = 'Guest'; // Wenn kein Benutzer angemeldet ist, "Gast" anzeigen
    }
  } catch (error) {
    console.error('Fehler beim Abrufen des Benutzernamens:', error);
  }
}
