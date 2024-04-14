function updateTaskCounts(tasks) {
  const counts = {todo: 0, progress: 0, feedback: 0, done: 0};
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


function showTasks() {
  const todoTasks = countTodoTasks();
  const showAmount = document.getElementById('toDoAmount');
  showAmount.innerHTML += `${todoTasks}`;
}

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
  const currentDate = new Date();

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  document.getElementById("currentDate").textContent = formattedDate;
}

function getLoggedInUser() {
  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  return user;
}

function displayUserName() {
  let user = getLoggedInUser();
  let summaryNameElement = document.getElementById('summaryName');
  if (user) {
      summaryNameElement.textContent = user.name;
  } else {
      summaryNameElement.textContent = 'Guest';
  }
}

// Rufen Sie die Funktion auf, um den Benutzernamen anzuzeigen
displayUserName();






