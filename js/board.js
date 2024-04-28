/**
 * Represents the task categories.
 * @type {Array.<string>}
 */
let columns = ["todo", "progress", "feedback", "done"];

async function updateTasks() {
  await loadTasks();
  emptyColumns();
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    let container = document.getElementById(`task_${task.category}`);
    container.innerHTML += renderTaskHTML(task, i);
    showAssigned(task, task.assigned, i);
  }
  setNoTaskBox();
}

/**
 * Displays a message when there are no tasks in a column.
 */
function setNoTaskBox() {
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    const container = document.getElementById(`task_${column}`);
    if (container.innerHTML === "") {
      container.innerHTML += `
      <div class="emptybox flex center">
        <span>No tasks to do</span>
      </div>
      `;
    }
  }
}

/**
 * Clears all columns on the task board.
 */
function emptyColumns() {
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    document.getElementById(`task_${column}`).innerHTML = "";
  }
}

/**
 * Calculates the width of the progress bar for a task.
 * @param {object} task - The task object.
 * @returns {number} The width of the progress bar.
 */
function calcBar(task) {
  let length = task.subtasks.length;
  let done = calcChecked(task);
  return length === 0 ? 0 : (done / length) * 100;
}

/**
 * Calculates the number of completed subtasks for a task.
 * @param {object} task - The task object.
 * @returns {number} The number of completed subtasks.
 */
function calcChecked(task) {
  let done = 0;
  for (let i = 0; i < task.subtasks.length; i++) {
    const checked = task.subtasks[i][1];
    done += checked;
  }
  return done;
}

/**
 * Renders the assigned users for a task.
 * @param {object} task - The task object.
 * @param {Array} assigned - The array of assigned users.
 * @param {number} index - The index of the task.
 */
function showAssigned(task, assigned, index) {
  let container = document.getElementById(`userbox${index}`);
  let length = assigned.length > 5 ? 5 : assigned.length;
  let left = 0;
  for (let i = 0; i < length; i++) {
    const user = assigned[i];
    let id = getInitials(user[0]);
    container.innerHTML += renderAssigned(id, user[1], i, left);
    left += 24;
  }
  if (task.subtasks.length == 0) {
    document.getElementById(`bar${index}`).style.display = "none";
  }
}

/**
 * Filters tasks based on the search input.
 */
function filterTasks() {
  let found = 0;
  let alert = document.getElementById('notfound');
  let search = document.getElementById("findtask").value;
  emptyColumns();
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    if (task.title.toLowerCase().includes(search.toLowerCase())) {
      found++;
      let container = document.getElementById(`task_${task.category}`);
      container.innerHTML += renderTaskHTML(task, i);
      showAssigned(task, task.assigned, i);
    }
  }
  if (found === 0) {    
    alert.classList.remove('d-none');
  } else {
    alert.classList.add('d-none');
  }
  setNoTaskBox();
}

/**
 * Renders the assigned users for a task.
 * @param {string} id - The user ID.
 * @param {string} color - The color of the user tag.
 * @param {number} zIndex - The z-index of the user tag.
 * @param {number} left - The left position of the user tag.
 * @returns {string} The HTML for the user tag.
 */
function renderAssigned(id, color, zIndex, left) {
  return `<div class="usertag absolute flex center" style="background-color:${color};z-index:${zIndex};left:${left}px">${id}</div>`;
}

/**
 * Moves a task to a different category when dropped.
 * @param {string} category - The category to move the task to.
 * @returns {Promise<void>} A Promise that resolves after the task is moved and updated.
 */
async function dragTo(category) {
  tasks[draggedElement]["category"] = category;
  await setItem("taskobject", JSON.stringify(tasks));
  updateTasks();
}

/**
 * Initiates the drag of a task.
 * @param {number} id - The ID of the task being dragged.
 */
function dragStart(id) {
  draggedElement = id;
  document.getElementById(`id${id}`).classList.add("fade");
}

/**
 * Prevents the default behavior of an element during a drag-and-drop operation.
 * @param {Event} event - The drag event.
 */
function allowDrop(event) {
  event.preventDefault();
}

/**
 * Highlights a drop zone during a drag-and-drop operation.
 * @param {string} id - The ID of the drop zone to highlight.
 */
function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

/**
 * Removes the highlight from a drop zone after a drag-and-drop operation.
 * @param {string} id - The ID of the drop zone to remove the highlight from.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

/**
 * Toggles the visibility of the floating add task container.
 */

function toggleFloatingAddTask(column) {
  let maincontainer = document.body;
  let container = document.getElementById("blockcontainer");
  let floatingcontainer = document.getElementById("add-task-container");
  chosencolumn = column;  
  if (container.classList.contains("d-none")) {
    container.classList.toggle("d-none");    
    floatingcontainer.classList.toggle("slidein");
    maincontainer.style.overflow = 'hidden';
  } else {
    floatingcontainer.classList.toggle("slideout"); 
    maincontainer.style.overflow = 'auto';   
    setTimeout(toggleBlock, 200);
    setTimeout(reload, 400);
  }
}

function reload() {
  window.location.reload();
}

function toggleBlock() {
  let container = document.getElementById("blockcontainer");
  let floatingcontainer = document.getElementById("add-task-container");
  container.classList.toggle("d-none");
  floatingcontainer.classList.remove("slidein");
  floatingcontainer.classList.remove("slideout");
}

/**
 * Opens the task details panel and renders task information.
 * @param {number} index - The index of the task.
 */
function openTaskInfo(index) {
  let bodycontainer = document.body;
  let task = tasks[index];
  let details = document.getElementById("task-details-container");
  bodycontainer.style.overflow = 'hidden';
  details.innerHTML = "";
  details.innerHTML = renderTaskInfoHTML(task, index);
  let container = document.getElementById("task-details");
  container.classList.add("slidein");
}

function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Renders the assigned users for a task in the task details panel.
 * @param {number} index - The index of the task.
 */
function renderInfoAssigned(index) {
  let container = document.getElementById("info-assigned");
  let assigned = tasks[index].assigned;
  container.innerHTML = "";
  for (let i = 0; i < assigned.length; i++) {
    const user = assigned[i][0];
    const usercolor = assigned[i][1];
    container.innerHTML += `
    <div class="flex gap-s">
      <div class="usertag flex a-center j-center" style="background-color:${usercolor}">${getInitials(
      user
    )}</div>
      <span>${user}</span>
    </div>
    `;
  }
}

/**
 * Renders the subtasks for a task in the task details panel.
 * @param {number} index - The index of the task.
 */
function renderInfoSubtasks(index) {
  let container = document.getElementById("info-subtasks");
  let subtasks = tasks[index].subtasks;
  container.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    const st = subtasks[i];
    container.innerHTML += `
    <div class="flex gap-s info-st-img" id="st${i}" onclick="toggleInfoSubtask(${index},${i},${
      st[1]
    })">
      <img src="./img/${checkChecked(st)}.svg" alt="checkbox">
      ${st[0]}
    </div>    
    `;
  }
}

/**
 * Checks whether a subtask is checked or not.
 * @param {Array} st - The subtask array containing the task name and its status.
 * @returns {string} - Returns 'checkbox' if the subtask is unchecked, and 'checkedbox' if it's checked.
 */
function checkChecked(st) {
  return st[1] == 0 ? "checkbox" : "checkedbox";
}

async function removeTask(index) {
  hideDetailsContainer();
  tasks.splice(index, 1);
  await setItem("taskobject", JSON.stringify(tasks));
  updateTasks();
}

async function toggleInfoSubtask(taskindex, subtaskindex, subtaskchecked) {
  let subcheck = subtaskchecked;
  subcheck == 0 ? (subcheck = 1) : (subcheck = 0);
  tasks[taskindex].subtasks[subtaskindex][1] = subcheck;
  await setItem("taskobject", JSON.stringify(tasks));
  renderInfoSubtasks(taskindex);
  updateTasks();
}

function closeTaskInfo() {
  let bodycontainer = document.body;
  let container = document.getElementById("task-details");
  bodycontainer.style.overflow = 'auto';
  container.classList.remove("slidein");
  container.classList.add("slideout");
  setTimeout(hideDetailsContainer, 200);
  setTimeout(reload, 400);
}

/**
 * Hides the task details container.
 */
function hideDetailsContainer() {
  document.getElementById("task-details").classList.remove("slideout");
  document.getElementById("detailsContainer").classList.add("d-none");
}

function openTaskEdit(index) {
  let task = tasks[index];
  subtasks = tasks[index].subtasks;
  assigned = tasks[index].assigned;
  let details = document.getElementById("task-details-container");
  details.innerHTML = `
  <div id="detailsContainer" class="details">
    <div id="task-details">
      <form action="javascript:void(0);" onsubmit="saveEditTask(${index})" onkeydown="return event.key != 'Enter';">
        <div class="task-and-close-container">
          <div></div>
          <img src="./img/x.png" class="close-task" onclick="closeTaskInfo()">
        </div>
        <div class="task-bucket">        
          <div class="taskbranch">
              <span>Title</span>
              <input type="text" id="title" placeholder="Enter a title" maxlength="40" value="${task.title}" required>
            </div>
            <div class="taskbranch">
              <span>Description</span>
              <textarea name="" id="description" cols="30" rows="10" placeholder="Enter a description" maxlength="105">${task.description}</textarea>
            </div>
            <div class="taskbranch">
              <span>Due date</span>
              <input type="date" id="duedate" value="${task.date}"required>
            </div>
            <div class="taskbranch">
              <span>Prio</span>
              <div class="buttonbox">
                <button class="priobutton" id="urgent" onclick="selectPrio(id, event)">Urgent <img src="./img/upTask.svg" alt="urgent"></button>
                <button class="priobutton mediumselect" id="medium" onclick="selectPrio(id, event)">Medium <img src="./img/medium.svg" alt="medium"></button>
                <button class="priobutton" id="low" onclick="selectPrio(id, event)">Low <img src="./img/downTask.svg" alt="low"></button>
              </div>
            </div>
            <div class="taskbranch">
              <span>Assigned to</span>
              <div class="assigned-wrapper">
                <input type="text" id="assigned-input" class="wrapper" placeholder="Select contacts to assign">
                <div class="roundicon wrapper" onclick="toggleDrop(id)" id="arrowassigned"><img src="./img/arrow_drop_down.svg" alt="arrow"></div>
                <div class="invis absolute drop-menu" id="drop-menu-assigned">                   
                </div>   
              </div>                     
              <div id="tag-container" class="flex gap-ss"></div>
            </div>
            <div class="taskbranch">
            <span>Subtasks</span>
            <div class="relative">             
              <input type="text" id="subtasks" placeholder="Add new subtask" onkeyup="checkEnter(event)" disabled>             
              <div class="iconcontainer">
                <div class="invis" id="subtask-active-icons">
                  <div class="x-icon flex" onclick="clearInput()"><img src="./img/close.svg" alt="x"></div>                
                  <img src="./img/vertbar.png" alt="divider">
                  <div class="x-icon flex" onclick="assignSubtask(), clearInput()"><img src="./img/checksmall.png" alt="check"></div>
                </div>
                <div class="x-icon flex pad" onclick="toggleSubtasksInput()"><img src="./img/add.svg" alt="plus"></div>
              </div>
              <div id="created-subtasks-container">                           
              </div>
            </div>
          </div>
        </div>
        <div class="flex between wide">
          <div></div>
          <button class="info-ok-button" type="submit">Ok<img src="./img/check.svg" alt="check"></button>
        </div>
      </form>
    </div>
  </div>  
  `;
  selectPrio(task.priority, event);
  displayUserMenu();
  renderAssignedUsers();
  renderSubtasks();
}

async function saveEditTask(index) {
  let task = tasks[index];
  task.title = document.getElementById("title").value;
  task.description = document.getElementById("description").value;
  task.date = document.getElementById("duedate").value;
  task.priority = priority;
  task.assigned = assigned;
  task.subtasks = subtasks;
  await setItem("taskobject", JSON.stringify(tasks));
  setTimeout(reload(), 500);
}

function toggleTaskBurger(index,event) {
  event.stopPropagation();
  let popupcontainer = document.getElementById(`taskpopup${index}`);
  popupcontainer.classList.toggle('d-none');
}

async function burgerMoveTo(category,index,event) {
  event.stopPropagation();
  tasks[index]["category"] = category;
  await setItem("taskobject", JSON.stringify(tasks));
  updateTasks();
}



/**
 * Renders the HTML structure for a task box.
 * @param {object} task - The task object containing details like title, description, subtasks, etc.
 * @param {number} index - The index of the task.
 * @returns {string} - The HTML structure for the task box.
 */
function renderTaskHTML(task, index) {
  return `
  <div onclick="openTaskInfo(${index}),renderInfoAssigned(${index}),renderInfoSubtasks(${index})" id="id${index}" 
     class="taskbox task" draggable="true" ondragstart="dragStart(${index})" ondragover="">
    <div class="flex between wide burger-wrapper">
      <div class="${task.label.toLowerCase().split(" ").join("")} flex center">${task.label}</div>
      <div class="flex center paddot" onclick="toggleTaskBurger(${index},event)"><img src="./img/dots.png" alt="move" id="task-burger"></div>
      <div id="taskpopup${index}"  class="taskpopup d-none">        
        <p>Move to:</p>
        <div class="task-burger-divider"></div>
        <p onclick="burgerMoveTo('todo',${index},event)">To do</p>
        <p onclick="burgerMoveTo('progress',${index},event)">In progress</p>
        <p onclick="burgerMoveTo('feedback',${index},event)">Await&nbspfeedback</p>
        <p onclick="burgerMoveTo('done',${index},event)">Done</p>        
      </div>
    </div>
    <div class="flex column gap-ss">
      <h3 class="start">${task.title}</h3>
      <p class="start">${task.description}</p>
    </div>
    <div class="barbox" id="bar${index}">
      <div class="barcontainer">
        <div class="bar" style="width: ${calcBar(task)}%;"></div>
      </div>
      <span>${calcChecked(task)}/${task.subtasks.length}&nbspSubtasks</span>
    </div>
    <div class="flex between wide">
      <div class="flex wrapper" id="userbox${index}">        
      </div>
    <img src="./img/${task.priority}.png" alt="priority">
    </div>              
  </div> 
  `;
}

/**
 * Renders the HTML structure for the task details panel.
 * @param {object} task - The task object containing details like title, description, subtasks, etc.
 * @returns {string} - The HTML structure for the task details panel.
 */
function renderTaskInfoHTML(task, index) {
  return `
  <div id="detailsContainer" class="details">
    <div id="task-details">
      <div class="task-and-close-container">
        <div class="${task.label
          .toLowerCase()
          .split(" ")
          .join("")} flex center">${task.label}</div>
        <img src="./img/x.png" class="close-task" onclick="closeTaskInfo()">
      </div>
      <div class="task-bucket">       
        <h2 class="task-details-header">${task.title}</h2>
        <p class="task-details-text">${task.description}</p>
        <div class="task-date">Due Date: ${task.date}</div>
        <div class="task-priority">Priority: ${capitalizeString(
          task.priority
        )} <img src="./img/${task.priority}.png" alt="priority"></div>
        <div class="task-assigned">
          <span>Assigned to: </span>
          <div id="info-assigned"></div>
        </div> 
        <div class="task-assigned">
          <span>Subtasks</span>
          <div id="info-subtasks"></div>    
        </div>
      </div>  
      <div class="info-buttons-container">
        <div class="info-button-delete" onclick="removeTask(${index})">
          <img src="./img/delete.svg" alt="delete">
          Delete
        </div>
        <img src="./img/VectorLinie.svg" alt="divider">
        <div class="info-button-edit" onclick="openTaskEdit(${index})">
          <img src="./img/edit.svg" alt="edit">
          Edit
        </div>
      </div>     
    </div>
  </div>
`;
}
