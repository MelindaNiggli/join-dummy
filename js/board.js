/**
 * Represents the task categories.
 * @type {Array.<string>}
 */
let columns = ['todo','progress','feedback','done'];

/**
 * Updates the tasks displayed on the board.
 * @async
 */
async function updateTasks() {
  await loadTasks();
  emptyColumns();
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    let container = document.getElementById(`task_${task.category}`);
    container.innerHTML += renderTaskHTML(task,i);
    showAssigned(task,task.assigned,i);
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
    if (container.innerHTML === '') {
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
    document.getElementById(`task_${column}`).innerHTML = '';    
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
  return (length === 0) ? 0 : ((done / length) * 100);  
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
function showAssigned(task,assigned,index) {
  let container = document.getElementById(`userbox${index}`);
  let length = (assigned.length > 5) ? 5 : assigned.length;
  let left = 0;
  for (let i = 0; i < length; i++) {
    const user = assigned[i];
    let id = getInitials(user[0]);
    container.innerHTML += renderAssigned(id, user[1], i, left); 
    left += 24;  
  }
  if (task.subtasks.length == 1) {
    document.getElementById(`bar${index}`).style.display = 'none';
  }
};

/**
 * Filters tasks based on the search input.
 */
function filterTasks() {
  let search = document.getElementById('findtask').value;
  emptyColumns();
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    if (task.title.toLowerCase().includes(search.toLowerCase())) {
      let container = document.getElementById(`task_${task.category}`);
      container.innerHTML += renderTaskHTML(task,i);
      showAssigned(task,task.assigned,i);
    }
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
  tasks[draggedElement]['category'] = category;
  await setItem('taskobject',JSON.stringify(tasks));
  updateTasks();
}

/**
 * Initiates the drag of a task.
 * @param {number} id - The ID of the task being dragged.
 */
function dragStart(id) {
  draggedElement = id;
  document.getElementById(`id${id}`).classList.add('fade');
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
  document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * Removes the highlight from a drop zone after a drag-and-drop operation.
 * @param {string} id - The ID of the drop zone to remove the highlight from.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

/**
 * Toggles the visibility of the floating add task container.
 */
function toggleFloatingAddTask() {  
  let container = document.getElementById('blockcontainer');  
  let floatingcontainer = document.getElementById('add-task-container');  
  if (container.classList.contains('d-none')) {
    container.classList.toggle('d-none');
    floatingcontainer.classList.toggle('slidein');    
  } else {    
    floatingcontainer.classList.toggle('slideout'); 
    setTimeout(toggleBlock,200);       
  }
}

/**
 * Toggles the visibility of a block element.
 */
function toggleBlock() {
  let container = document.getElementById('blockcontainer');
  let floatingcontainer = document.getElementById('add-task-container'); 
  container.classList.toggle('d-none');
  floatingcontainer.classList.remove('slidein');
  floatingcontainer.classList.remove('slideout');
}

/**
 * Opens the task details panel and renders task information.
 * @param {number} index - The index of the task.
 */
function openTaskInfo(index) {
  let task = tasks[index];
  let details = document.getElementById('task-details-container');
  details.innerHTML = '';
  details.innerHTML = renderTaskInfoHTML(task);
}

/**
 * Renders the assigned users for a task in the task details panel.
 * @param {number} index - The index of the task.
 */
function renderInfoAssigned(index) {
  let container = document.getElementById('info-assigned');
  let assigned = tasks[index].assigned;
  container.innerHTML = '';  
  for (let i = 0; i < assigned.length; i++) {
    const user = assigned[i][0];
    const usercolor = assigned[i][1];
    container.innerHTML += `
    <div class="flex gap-s">
      <div class="usertag flex a-center j-center" style="background-color:${usercolor}">${getInitials(user)}</div>
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
  let container = document.getElementById('info-subtasks');
  let subtasks = tasks[index].subtasks;
  container.innerHTML = '';
  for (st of subtasks) {
    container.innerHTML += `
    <div class="flex gap-s info-st-img">
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
  return st[1] == 0 ? 'checkbox' : 'checkedbox';  
}

/**
 * Hides the task details container.
 */
function hideDetailsContainer() {
  document.getElementById('detailsContainer').classList.add('d-none');
  document.getElementById('detailsContainer').innerHTML = '';
}

/**
 * Renders the HTML structure for a task box.
 * @param {object} task - The task object containing details like title, description, subtasks, etc.
 * @param {number} index - The index of the task.
 * @returns {string} - The HTML structure for the task box.
 */
function renderTaskHTML(task,index) {
  return `
  <div onclick="openTaskInfo(${index}),renderInfoAssigned(${index}),renderInfoSubtasks(${index})" id="id${index}" 
     class="taskbox task" draggable="true" ondragstart="dragStart(${index})" ondragover="">
    <div class="${task.label.toLowerCase().split(' ').join('')} flex center">${task.label}</div>
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
function renderTaskInfoHTML(task){
  return `
  <div id="detailsContainer" class="details" onclick="hideDetailsContainer()">
    <div class="task-details">
      <div class="task-and-close-container">
        <div class="${task.label.toLowerCase().split(' ').join('')} flex center">${task.label}</div>
        <img src="./img/x.png" class="close-task">
      </div>
      <h2 class="task-details-header">${task.title}</h2>
      <p class="task-details-text">${task.description}</p>
      <div class="task-date">Due Date: 6/16/2024</div>
      <div class="task-priority">Priority: Urgent <img src="./img/${task.priority}.png" alt="priority"></div>
      <div class="task-assigned">
        <span>Assigned to: </span>
        <div id="info-assigned"></div>
      </div> 
      <div class="task-assigned">
        <span>Subtasks</span>
        <div id="info-subtasks"></div>    
      </div>
      <div class="info-buttons-container">
        <div class="info-button-delete">
          <img id="subtaskimg" src="./img/delete.svg" alt="delete">
          Delete
        </div>
        <img src="./img/VectorLinie.svg" alt="divider">
        <div class="info-button-edit">
          <img src="./img/edit.svg" alt="edit">
          Edit
        </div>
      </div>     
    </div>
  </div>
`;
}





