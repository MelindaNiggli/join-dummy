function updateSummaryCounts() {
  // Filtern der Aufgaben nach Kategorie
  const todoTasks = tasks.filter(task => task.category === 'todo');
  const progressTasks = tasks.filter(task => task.category === 'progress');
  const feedbackTasks = tasks.filter(task => task.category === 'feedback');
  const doneTasks = tasks.filter(task => task.category === 'done');
  const urgentTasks = tasks.filter(task => task.priority === 'urgent');
  // Aktualisieren der Anzeige für die jeweiligen Kategorien
  document.getElementById("toDoAmount").textContent = todoTasks.length;
  document.getElementById("progressAmount").textContent = progressTasks.length;
  document.getElementById("feedbackAmount").textContent = feedbackTasks.length;
  document.getElementById("doneAmount").textContent = doneTasks.length;
  document.getElementById("urgentAmount").textContent = urgentTasks.length;
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






