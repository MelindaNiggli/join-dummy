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

/**
 * Displays the current date in the format "Month Day, Year".
 */
function displayCurrentDate() {
  const currentDate = new Date();

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  document.getElementById("currentDate").textContent = formattedDate;
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
  if (user) {
      summaryNameElement.textContent = user.name;
  } else {
      summaryNameElement.textContent = 'Guest';
  }
}

// Call the function to display the username.
displayUserName();





