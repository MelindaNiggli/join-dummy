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

function calcBar(task) {
  let length = task.subtasks.length;  
  let done = calcChecked(task);
  return (length === 0) ? 0 : ((done / length) * 100);  
}

function calcChecked(task) {
  let done = 0;
  for (let i = 0; i < task.subtasks.length; i++) {
    const checked = task.subtasks[i][1];
    done += checked;
  }
  return done;
}

function showAssigned(task, assigned, index) {
  let container = document.getElementById(`userbox${index}`);
  let length = (assigned.length > 5) ? 5 : assigned.length;
  let left = 0;
  for (let i = 0; i < length; i++) {
      const user = assigned[i];
      if (user && user[0]) { // Prüfen, ob user und user[0] existieren
          let id = getInitials(user[0]);
          container.innerHTML += renderAssigned(id, user[1], i, left); 
          left += 24;
      }
  }
  if (task.subtasks.length == 0) {
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

function toggleBlock() {
  let container = document.getElementById('blockcontainer');
  let floatingcontainer = document.getElementById('add-task-container'); 
  container.classList.toggle('d-none');
  floatingcontainer.classList.remove('slidein');
  floatingcontainer.classList.remove('slideout');
}

function openTaskInfo(index) {
  let task = tasks[index];
  let details = document.getElementById('task-details-container');  
  details.innerHTML = `
    <div id="detailsContainer" class="details">
      <div id="task-details">
        <div class="task-and-close-container">
          <div class="${task.label.toLowerCase().split(' ').join('')} flex center">${task.label}</div>
          <img src="./img/x.png" class="close-task" onclick="closeTaskInfo()">
        </div>
        <h2 class="task-details-header">${task.title}</h2>
        <p class="task-details-text">${task.description}</p>
        <div class="task-date">Due Date: ${task.date}</div>
        <div class="task-priority">Priority: ${capitalizeString(task.priority)} <img src="./img/${task.priority}.png" alt="priority"></div>
        <div class="task-assigned">
          <span>Assigned to: </span>
          <div id="info-assigned"></div>
        </div> 
        <div class="task-assigned">
          <span>Subtasks</span>
          <div id="info-subtasks"></div>    
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
  let container = document.getElementById('task-details');
  container.classList.add('slidein');
}

function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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

function renderInfoSubtasks(index) {
  let container = document.getElementById('info-subtasks');
  let subtasks = tasks[index].subtasks;
  container.innerHTML = '';
  for (let i = 0; i < subtasks.length; i++) {
    const st = subtasks[i];
    container.innerHTML += `
    <div class="flex gap-s info-st-img" id="st${i}" onclick="toggleInfoSubtask(${index},${i},${st[1]})">
      <img src="./img/${checkChecked(st)}.svg" alt="checkbox">
      ${st[0]}
    </div>    
    `;        
  }
}

function checkChecked(st) {
  return st[1] == 0 ? 'checkbox' : 'checkedbox';  
}

async function removeTask(index) {
  hideDetailsContainer();
  tasks.splice(index,1);
  await setItem('taskobject',JSON.stringify(tasks));
  updateTasks();
  }

async function toggleInfoSubtask(taskindex,subtaskindex,subtaskchecked) {
  let subcheck = subtaskchecked;
  subcheck == 0 ? subcheck = 1 : subcheck = 0;
  tasks[taskindex].subtasks[subtaskindex][1] = subcheck;
  await setItem('taskobject',JSON.stringify(tasks));
  renderInfoSubtasks(taskindex);
  updateTasks();
}

function closeTaskInfo() {
  let container = document.getElementById('task-details');
  container.classList.remove('slidein');
  container.classList.add('slideout');
  setTimeout(hideDetailsContainer,200);
}

function hideDetailsContainer() {
  document.getElementById('task-details').classList.remove('slideout');
  document.getElementById('detailsContainer').classList.add('d-none');  
}

function openTaskEdit(index) {
  let task = tasks[index];
  subtasks = tasks[index].subtasks;
  assigned = tasks[index].assigned;
  let details = document.getElementById('task-details-container');  
  details.innerHTML = `
  <div id="detailsContainer" class="details">
    <div id="task-details">
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
            <div class="wrapper">
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
            <input type="text" id="subtasks" placeholder="Add new subtask" disabled>             
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
        <div class="info-ok-button">Ok<img src="./img/check.svg" alt="check">
      </div>
    </div>
  </div>  
  `;
  selectPrio(task.priority,event);
  displayUserMenu();
  renderAssignedUsers()
  renderSubtasks();
}

