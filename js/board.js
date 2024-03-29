let tasks = [
    {
        "category": "todo",
        "label": "User Story",
        "title": "Einführung neuer Funktionen",
        "description": "Implementierung von Benutzeranmeldefunktionen und Profilseiten",
        "date": "2024-04-10",
        "subtasks": [1, "Benutzeranmeldung erstellen", "Profilseiten-Layout gestalten"],
        "priority": "medium",
        "assigned": [["Max Mustermann", "#ff0000"], ["Anna Müller", "#00ff00"], ["Lisa Wagner", "#0000ff"], ]
    },
    {
        "category": "progress",
        "label": "Technical",
        "title": "Datenbankoptimierung",
        "description": "Optimierung der Datenbankabfragen für verbesserte Leistung",
        "date": "2024-04-15",
        "subtasks": [2,"Indizes hinzufügen", "Abfragen überprüfen und optimieren", "Backup-Routinen überprüfen"],
        "priority": "urgent",
        "assigned": [["John Doe", "#ffff00"], ["Sarah Schmidt", "#ff00ff"]]
    },
    {
        "category": "feedback",
        "label": "User Story",
        "title": "Benutzerfreundlichkeit verbessern",
        "description": "Verbesserung der Benutzeroberfläche für eine bessere Benutzererfahrung",
        "date": "2024-04-20",
        "subtasks": [0],
        "priority": "low",
        "assigned": [["Michaela Maier", "#00ffff"]]
    },
    {
        "category": "done",
        "label": "Technical",
        "title": "Sicherheitspatching",
        "description": "Installation von Sicherheitsupdates und Patches zur Behebung von Sicherheitslücken",
        "date": "2024-03-28",
        "subtasks": [2, "Update auf neueste Softwareversion", "Überprüfung der Sicherheitskonfiguration"],
        "priority": "medium",
        "assigned": [["Emily Smith", "#ff8800"], ["David Becker", "#888888"]]
    },
    {
        "category": "todo",
        "label": "User Story",
        "title": "Integration von Zahlungsgateways",
        "description": "Integration von PayPal und Kreditkartenzahlungen in die Plattform",
        "date": "2024-04-05",
        "subtasks": [0, "PayPal-API integrieren", "Kreditkartenverarbeitung implementieren", "Fehlerbehandlung hinzufügen"],
        "priority": "urgent",
        "assigned": [["Daniel Johnson", "#00ff88"], ["Sophie Müller", "#ff0088"]]
    }
];

let columns = ['todo','progress','feedback','done'];

function Task(category, label, title, description, date, subtasks, priority, assigned) {
    this.category = category,
    this.label = label,    
    this.title = title,
    this.description = description,
    this.date = date,
    this.subtasks = subtasks,
    this.priority = priority,
    this.assigned = assigned  
}

function updateTasks() {
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
  let columns = ['todo','progress','feedback','done'];
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    document.getElementById(`task_${column}`).innerHTML = '';    
  }
}

function renderTaskHTML(task,index) {
    return `
    <div id="id${index}" class="taskbox" draggable="true" ondragstart="dragStart(${index})" ondragover="">
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
      <div class="flex between">
        <div class="flex wrapper" id="userbox${index}">        
        </div>
      <img src="./img/${task.priority}.png" alt="priority">
      </div>              
    </div> 
    `;
}

function getInitials(user) {
  let names = user.split(' ');
  let firstletter = names[0].charAt(0).toUpperCase();  
  return names[1] ? (firstletter + (names[1].charAt(0).toUpperCase())) : firstletter;
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
  return `<div class="usertag flex center" style="background-color:${color};z-index:${zIndex};left:${left}px">${id}</div>`;
}

function dragTo(category) {
  tasks[draggedElement]['category'] = category;
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
