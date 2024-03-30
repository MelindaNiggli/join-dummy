function loadAmount(){
  const todoCount = countTodoTasks();
  const progressCount = countTodoProgress();
  
  const todoAmountContainer = document.getElementById('toDoAmount');
  const progressAmountContainer = document.getElementById('progressAmount');
  
  todoAmountContainer.innerHTML = `${todoCount}`;
  progressAmountContainer.innerHTML = `${progressCount}`;
};

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
  } else {
    console.error("Element with ID 'greet' not found!");
  }
}
loadAmount();
updateGreeting();
setInterval(updateGreeting, 1000);



