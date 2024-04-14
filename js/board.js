let columns = ['todo','progress','feedback','done'];

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

function emptyColumns() {
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    document.getElementById(`task_${column}`).innerHTML = '';    
  }
}

function renderTaskHTML(task,index) {
    return `
    <div onclick="openTaskInfo(${index})" id="id${index}" class="taskbox task" draggable="true" ondragstart="dragStart(${index})" ondragover="">
      <div class="${task.label.toLowerCase().split(' ').join('')} flex center">${task.label}</div>
      <div class="flex column gap-ss">
        <h3 class="start">${task.title}</h3>
        <p class="start">${task.description}</p>
      </div>
      <div class="barbox" id="bar${index}">
        <div class="barcontainer">
          <div class="bar" style="width: ${calcBar(task,index)}%;"></div>
        </div>
        <span>${task.subtasks[0]}/${task.subtasks.length - 1}&nbspSubtasks</span>
      </div>
      <div class="flex between wide">
        <div class="flex wrapper" id="userbox${index}">        
        </div>
      <img src="./img/${task.priority}.png" alt="priority">
      </div>              
    </div> 
    `;
}

function calcBar(task) {
  let subtasks = task.subtasks.length - 1;  
  let done = task.subtasks[0];
  return (subtasks === 0) ? 0 : ((done / subtasks) * 100);  
}

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

function renderAssigned(id, color, zIndex, left) {
  return `<div class="usertag absolute flex center" style="background-color:${color};z-index:${zIndex};left:${left}px">${id}</div>`;
}

async function dragTo(category) {
  tasks[draggedElement]['category'] = category;
  await setItem('taskobject',JSON.stringify(tasks));
  updateTasks();
}

function dragStart(id) {
  draggedElement = id;
  document.getElementById(`id${id}`).classList.add('fade');
}

function allowDrop(event) {
  event.preventDefault();
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

function openTaskInfo(index) {
  let task = tasks[index];
  let details = document.getElementById('task-details-container');
  details.innerHTML = '';

  details.innerHTML = `
    <div id="detailsContainer" class="details" onclick="hideDetailsContainer()">
      <div class="task-details">
        <div class="task-and-close-container">
          <div class="${task.label.toLowerCase().split(' ').join('')} flex center">${task.label}</div>
          <img src="./img/x.png" class="close-task">
        </div>
        <h2 class="task-details-header">${task.title}</h2>
        <p class="task-details-text">${task.description}</p>
        <p class="task-date">Due Date: 6/16/2024</p>
        <p>Priority: Urgent <img src="./img/${task.priority}.png" alt="priority">
        <div>
          <p>Assigned to: </p>
        </div>
      </div>
    </div>
  `;
}

function hideDetailsContainer() {
  document.getElementById('detailsContainer').classList.add('d-none');
  document.getElementById('detailsContainer').innerHTML = '';
}





