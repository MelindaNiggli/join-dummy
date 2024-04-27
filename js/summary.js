document.addEventListener('DOMContentLoaded', function() {
  displayUserName();
  displayCurrentDate(tasks)
});

/**
 * Updates the task counts for each status and displays them.
 * @param {Array} tasks - The array of tasks.
 */
function updateTaskCounts(tasks) {
  /**
   * Object to store the count of tasks in each status.
   * @type {Object.<string, number>}
   */
  const counts = { todo: 0, progress: 0, feedback: 0, done: 0 };

  /**
   * Total number of tasks.
   * @type {number}
   */
  const taskAmount = tasks.length;

  tasks.forEach(task => {
    if (task.category === 'todo') counts.todo++;
    else if (task.category === 'progress') counts.progress++;
    else if (task.category === 'feedback') counts.feedback++;
    else if (task.category === 'done') counts.done++;
  });

  console.log('Task Counts:', counts);

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
  console.log('Urgent Counts:', urgentCount);
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

function displayCurrentDate(tasks) {
  // Zähle die Anzahl der dringenden Aufgaben
  const urgentCount = countUrgentTasks(tasks);

  if (urgentCount > 0) {
    // Filtere Aufgaben mit Priorität "urgent"
    const urgentTasks = tasks.filter(task => task.priority === 'urgent');


    // Wähle das Datum der ersten "urgent" Aufgabe aus
    const firstUrgentTaskDate = urgentTasks[0].date;

    // Formatieren des Datums
    const formattedDate = new Date(firstUrgentTaskDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Einsetzen des formatierten Datums in das Element mit der ID "currentDate"
    document.getElementById("currentDate").textContent = formattedDate;
  } else {
    // Wenn keine "urgent" Aufgaben vorhanden sind, gib eine entsprechende Meldung aus
    document.getElementById("currentDate").textContent = "No urgent tasks found.";
  }
}

/**
 * Retrieves the logged-in user from local storage.
 * @returns {Object|null} - The logged-in user or null if no user is logged in.
 */
function getLoggedInUser() {
  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  return user;
}

/**
 * Displays the username in the summary area.
 */
function displayUserName() {
  let user = getLoggedInUser();
  let summaryNameElement = document.getElementById('summaryName');
  if (summaryNameElement) {
      if (user) {
          summaryNameElement.textContent = user.name;
      } else {
          summaryNameElement.textContent = 'Guest';
      }
  }
}






