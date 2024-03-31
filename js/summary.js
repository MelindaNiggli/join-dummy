function updateSummaryCounts() {
  // Überprüfen, ob die Elemente im HTML gefunden wurden
  const toDoAmountElement = document.getElementById("toDoAmount");
  const progressAmountElement = document.getElementById("progressAmount");
  const feedbackAmountElement = document.getElementById("feedbackAmount");
  const doneAmountElement = document.getElementById("doneAmount");

  // Falls ein oder mehrere Elemente nicht gefunden wurden, brechen wir hier ab
  if (!toDoAmountElement || !progressAmountElement || !feedbackAmountElement || !doneAmountElement) {
    return;
  }

  // Aufruf der countTasksByCategory() Funktion, um die aktuellen Zahlen zu erhalten
  const counts = countTasksByCategory();

  // Aktualisieren der Elemente im HTML mit den neuen Zahlen
  toDoAmountElement.textContent = counts.todo || 0;
  progressAmountElement.textContent = counts.progress || 0;
  feedbackAmountElement.textContent = counts.feedback || 0;
  doneAmountElement.textContent = counts.done || 0;
  console.log("Aktuelle Taskzählungen:", counts);
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

document.addEventListener('DOMContentLoaded', function() {
  updateSummaryCounts();
});



