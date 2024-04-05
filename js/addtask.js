let assigned = [];
let subtasks = [];

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
    assigned.splice(index, 1);
  } else {
    assigned.push(checkeduser);
  }
  container.lastElementChild.classList.toggle("assigned-checked");
  renderAssignedUsers();
}

function renderAssignedUsers() {
  let container = document.getElementById("tag-container");
  container.innerHTML = "";
  let length = assigned.length > 10 ? 10 : assigned.length;
  for (let i = 0; i < length; i++) {
    const user = assigned[i];
    container.innerHTML += `
    <div class="usertag flex a-center j-center" style="background-color:#dddd55">${getInitials(
      user
    )}</div>
    `;
  }
}

function selectCategory(category) {
  toggleDrop("arrowcategory");
  document.getElementById("category-input").value = category;
}

function toggleSubtasksInput() {
  let field = document.getElementById("subtasks");
  let hiddenicons = document.getElementById("subtask-active-icons");
  let plusicon = hiddenicons.nextElementSibling;

  field.disabled ? (field.disabled = false) : (field.disabled = true);
  if (field.disabled == false) {
    field.focus();
  }
  hiddenicons.classList.toggle("invis");
  hiddenicons.classList.toggle("flex");
  plusicon.classList.toggle("invis");
  plusicon.classList.toggle("flex");
}

function clearInput() {
  document.getElementById("subtasks").value = "";
  toggleSubtasksInput();
}

function editSubtask(id) {
  let field = document.getElementById(`subtasks-input-c${id}`);
  let iconboxedit = document.getElementById(`created-subtasks-iconbox${id}`);
  let iconboxcheck = document.getElementById(
    `created-subtasks-iconbox${id}`
  ).nextElementSibling;
  field.disabled = false;
  field.focus();
  iconboxedit.classList.toggle("invis");
  iconboxedit.classList.toggle("flex");
  iconboxcheck.classList.toggle("invis");
  iconboxcheck.classList.toggle("flex");
}

function checkSubtask(id) {
  let field = document.getElementById(`subtasks-input-c${id}`);
  let iconboxedit = document.getElementById(`created-subtasks-iconbox${id}`);
  let iconboxcheck = document.getElementById(
    `created-subtasks-iconbox${id}`
  ).nextElementSibling;
  field.disabled = true;
  iconboxedit.classList.toggle("invis");
  iconboxedit.classList.toggle("flex");
  iconboxcheck.classList.toggle("invis");
  iconboxcheck.classList.toggle("flex");
}

function deleteSubtask(id) {
  let field = document.getElementById(`subtasks-input-c${id}`);
  let iconboxedit = document.getElementById(`created-subtasks-iconbox${id}`);
  let iconboxcheck = document.getElementById(
    `created-subtasks-iconbox${id}`
  ).nextElementSibling;
  field.disabled = true;
  field.focus();
  iconboxedit.classList.toggle("invis");
  iconboxedit.classList.toggle("flex");
  iconboxcheck.classList.toggle("invis");
  iconboxcheck.classList.toggle("flex");
}

function createTask() {
  animateCreatedTask();
}

function animateCreatedTask() {
  let addedbox = document.getElementById("added-to-board-box");
  addedbox.style.top = "30%";
  setTimeout(() => {
    window.location.href = "board.html";
  }, 1500);
}

function clearAddTask() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("duedate").value = "";
  document.getElementById("category-input").value = "";
  document.getElementById("subtasks").value = "";
  document.getElementById("tag-container").innerHTML = "";
  document
    .querySelectorAll(".assigned-checked")
    .forEach((c) => c.classList.remove("assigned-checked"));
  selectPrio("medium");
}

function assignSubtask() {
  let task = document.getElementById("subtasks").value;
  subtasks.push(task);
  renderSubtasks();
}

function renderSubtasks() {
  let container = document.getElementById("created-subtasks-container");
  container.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    const task = subtasks[i];
    const index = subtasks.indexOf(task);
    container.innerHTML += displaySubtask(task,index);
  }
}

function displaySubtask(task, index) {
  return `
  <div class="relative">
    <input type="text" class="created-subtasks-input" id="subtasks-input-c${index}" value="• ${task}"disabled="disabled">
    <div class="iconcontainer">
      <div id="created-subtasks-iconbox1" class="subtasks-iconbox flex">
        <div class="x-icon flex" onclick="editSubtask(${index})"><img src="./img/littlepen.png" alt="pen"></div>
        <img src="./img/vertbar.png" alt="divider">
        <div class="x-icon flex" onclick="deleteSubtask(${index})"><img src="./img/trash.png" alt="trash"></div>
      </div>
      <div class="subtasks-iconbox invis">
        <div class="x-icon flex" onclick="deleteSubtask(${index})"><img src="./img/trash.png" alt="trash"></div>
        <img src="./img/vertbar.png" alt="divider">
        <div class="x-icon flex" onclick="checkSubtask(${index})"><img src="./img/checksmall.png" alt="check"></div>
      </div>
    </div>
  </div>                
  `;
}
