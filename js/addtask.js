let assigned = [];

function selectPrio(prio) {
  document
    .querySelectorAll(".priobutton")
    .forEach((b) =>
      b.classList.remove("urgentselect", "mediumselect", "lowselect")
    );
  document.getElementById(prio).classList.add(`${prio}select`);
}

function toggleDrop(id) {
  let container = document.getElementById(`${id}`);
  container.firstElementChild.classList.toggle("rotate");
  container.nextElementSibling.classList.toggle("invis");
}

function checkUser(id) {
  let container = document.getElementById(`${id}`);
  let checkeduser = container.firstElementChild.lastElementChild.innerHTML;   
  let index = assigned.indexOf(checkeduser);
  if (container.lastElementChild.classList.contains("assigned-checked")) {
    assigned.splice(index,1);
  } else {
    assigned.push(checkeduser); 
  }
  container.lastElementChild.classList.toggle("assigned-checked");
}

function selectCategory(category) {
  toggleDrop("arrowcategory");
  document.getElementById("category-input").value = category;
}

function enableSubtasksInput() {
  let field = document.getElementById("subtasks");
  let hiddenicons = document.getElementById("subtask-active-icons");
  let plusicon = hiddenicons.nextElementSibling;
  
  field.disabled ? field.disabled = false : field.disabled = true;
  if (field.disabled == false) {field.focus()};
  hiddenicons.classList.toggle('invis');
  hiddenicons.classList.toggle('flex');
  plusicon.classList.toggle('invis');
  plusicon.classList.toggle('flex');
}

function clearInput() {
  document.getElementById('subtasks').value = '';
  enableSubtasksInput();
}

function editSubtask(id) {
  let field = document.getElementById(`subtasks-input-c${id}`);
  let iconboxedit = document.getElementById(`created-subtasks-iconbox${id}`);
  let iconboxcheck = document.getElementById(`created-subtasks-iconbox${id}`).nextElementSibling;
  field.disabled = false;
  field.focus();
  iconboxedit.classList.toggle('invis');
  iconboxedit.classList.toggle('flex');
  iconboxcheck.classList.toggle('invis');
  iconboxcheck.classList.toggle('flex');  
}

function checkSubtask(id) {
  let field = document.getElementById(`subtasks-input-c${id}`);
  let iconboxedit = document.getElementById(`created-subtasks-iconbox${id}`);
  let iconboxcheck = document.getElementById(`created-subtasks-iconbox${id}`).nextElementSibling;
  field.disabled = true;
  iconboxedit.classList.toggle('invis');
  iconboxedit.classList.toggle('flex');
  iconboxcheck.classList.toggle('invis');
  iconboxcheck.classList.toggle('flex'); 
}

function deleteSubtask(id) {
  let field = document.getElementById(`subtasks-input-c${id}`);
  let iconboxedit = document.getElementById(`created-subtasks-iconbox${id}`);
  let iconboxcheck = document.getElementById(`created-subtasks-iconbox${id}`).nextElementSibling;
  field.disabled = true;
  field.focus();
  iconboxedit.classList.toggle('invis');
  iconboxedit.classList.toggle('flex');
  iconboxcheck.classList.toggle('invis');
  iconboxcheck.classList.toggle('flex'); 
}

function createTask() {
  animateCreatedTask();
} 

function animateCreatedTask() {
  let addedbox = document.getElementById('added-to-board-box');
  addedbox.style.top = '30%';
  setTimeout(() => {
    window.location.href = "board.html";
  }, 1500);
}

function clearAddTask() {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('duedate').value = '';
  document.getElementById('category-input').value = '';
  document.getElementById('subtasks').value = '';  
  selectPrio("medium");
}
