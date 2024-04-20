let assigned = [];
let subtasks = [];
let priority = "medium";

async function displayUserMenu() {  
  await loadUsers();
  await loadTasks();
  let dropbox = document.getElementById('drop-menu-assigned');
  for (let i = 0; i < users.length; i++) {
    const user = users[i].name;
    const color = users[i].color;
    dropbox.innerHTML += renderDropboxUser(user,color,i);
  }
}

function renderDropboxUser(user,color,index) {
  return `
    <div class="flex a-center between dropbox" id="c${index}" onclick="checkUser(${index})">
      <div class="flex a-center gap-s">
        <div class="usertag flex a-center j-center" style="background-color:${color}">${getInitials(user)}</div>
        <span>${user}</span>
      </div> 
   <div class=${setCheckedUser(user,color)}> </div>                 
   </div>
  `;
}

function setCheckedUser(user,color) {
  for (let item of assigned) {
    if (item[0] == user && item[1] == color) {
      return "assigned-checked";
    }    
  }
  return "assigned-check";  
}

function selectPrio(prio, event) {
  event.preventDefault();
  document
    .querySelectorAll(".priobutton")
    .forEach((b) =>
      b.classList.remove("urgentselect", "mediumselect", "lowselect")
    );
  document.getElementById(prio).classList.add(`${prio}select`);
  priority = prio;
}

function toggleDrop(id) {
  let container = document.getElementById(`${id}`);
  container.firstElementChild.classList.toggle("rotate");
  container.nextElementSibling.classList.toggle("invis");
}

function checkUser(id) {
  let container = document.getElementById(`c${id}`);
  let checkeduser = users[id].name;
  let checkedusercolor = users[id].color;
  let index = assigned.indexOf(checkeduser);
  if (container.lastElementChild.classList.contains("assigned-checked")) {
    assigned.splice(index, 1);
  } else {
    assigned.push([checkeduser,checkedusercolor]);
  }
  container.lastElementChild.classList.toggle("assigned-checked");
  renderAssignedUsers();
}

function renderAssignedUsers() {
  let container = document.getElementById("tag-container");
  container.innerHTML = "";
  let length = assigned.length > 10 ? 10 : assigned.length;
  for (let i = 0; i < length; i++) {
    const user = assigned[i][0];
    const usercolor = assigned[i][1];
    container.innerHTML += `
    <div class="usertag flex a-center j-center" style="background-color:${usercolor}">${getInitials(user)}</div>
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
  let iconboxcheck = document.getElementById(`created-subtasks-iconbox${id}`).nextElementSibling; 
  field.value = field.value.split('').splice(2).join(''); 
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
  subtasks[id][0] = field.value;
  field.value = `• ${field.value}`;  
  field.disabled = true;
  iconboxedit.classList.toggle("invis");
  iconboxedit.classList.toggle("flex");
  iconboxcheck.classList.toggle("invis");
  iconboxcheck.classList.toggle("flex");
}

function deleteSubtask(id) {
  subtasks.splice(id,1);
  renderSubtasks();
}

function checkRequired() {
  let category = document.getElementById('category-input');
  if (category.value == "") {
    category.style.borderColor = "red";
    category.style.borderWidth = "2px";
  } else {
    createTask();
  }
}

async function createTask() {
  let category = "todo";
  let label = document.getElementById('category-input').value;
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let date = document.getElementById('duedate').value;
  let tasktoadd = new Task (category, label, title, description, date, subtasks, priority, assigned);  
  tasks.push(tasktoadd);   
  await setItem('taskobject',JSON.stringify(tasks));  
  animateCreatedTask();
}

function animateCreatedTask() {
  let addedbox = document.getElementById("added-to-board-box");
  addedbox.style.top = "30%";
  setTimeout(() => {
    window.location.href = "board.html";
  }, 1500);
}

async function clearAddTask(event) {
  event.preventDefault();
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("duedate").value = "";
  document.getElementById("category-input").value = "";
  document.getElementById("subtasks").value = "";
  document.getElementById("tag-container").innerHTML = "";
  document.querySelectorAll(".assigned-checked").forEach((c) => c.classList.remove("assigned-checked"));
  assigned = [];
  subtasks = [];
  /* users = [];
  await setItem('users', JSON.stringify(users)); */ 
  /* tasks = []; 
  await setItem('taskobject', JSON.stringify(tasks)); */
  renderSubtasks();
  selectPrio("medium", event);
}

function assignSubtask() {
  let task = document.getElementById("subtasks").value;
  subtasks.push([task,0]);
  renderSubtasks();
}

function renderSubtasks() {
  let container = document.getElementById("created-subtasks-container");
  container.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    const task = subtasks[i][0];    
    container.innerHTML += displaySubtask(task,i);
  }
}

function displaySubtask(task, index) {
  return `
  <div class="relative">
    <input type="text" class="created-subtasks-input" id="subtasks-input-c${index}" value="• ${task}"disabled="disabled">
    <div class="iconcontainer">
      <div id="created-subtasks-iconbox${index}" class="subtasks-iconbox flex">
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
