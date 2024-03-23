let tasks = [
    {
        "category": "todo",
        "label": "User Story",
        "title": "Einführung neuer Funktionen",
        "description": "Implementierung von Benutzeranmeldefunktionen und Profilseiten",
        "date": "2024-04-10",
        "subtasks": [1, "Benutzeranmeldung erstellen", "Profilseiten-Layout gestalten"],
        "priority": "medium",
        "assigned": [["Max Mustermann", "#ff0000"], ["Anna Müller", "#00ff00"], ["Lisa Wagner", "#0000ff"]]
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
  let container = document.getElementById('task_todo');
  container.innerHTML += renderTaskHTML(tasks[0]);  
}

function renderTaskHTML(task) {
    return `
    <div class="taskbox">
      <div class="${task.label.toLowerCase().split(' ').join('')} flex center">${task.label}</div>
      <div class="flex column gap-ss">
        <h3 class="start">${task.title}</h3>
        <p class="start">${task.description}</p>
      </div>
      <div class="barbox">
        <div class="barcontainer">
          <div class="bar" style="width: ${calcBar(task)}%;"></div>
        </div>
        <span>${task.subtasks[0]}/${task.subtasks.length - 1}&nbspSubtasks</span>
      </div>
      <div class="flex between">
        <div class="flex wrapper">
        
        </div>
      <img src="./img/${task.priority}.png" alt="priority">
      </div>              
    </div> 
    `;
}
/* ${showAssigned(task.assigned)} */

function getInitials(user) {
  let names = user.split(' ');
  return (names[0].charAt(0).toUpperCase()) + (names[1].charAt(0).toUpperCase());
}

function calcBar(task) {
  let subtasks = task.subtasks.length - 1;
  let done = task.subtasks[0];
  return (subtasks === 0) ? 0 : ((done / subtasks) * 100);
}

function showAssigned(assigned) {
  let i = 0;
  assigned.forEach(element => {
    const user = assigned[i];
    let id = getInitials(user[0]);
    return `<div class="usertag flex center" style="background-color:${color};z-index:${zIndex}">${id}</div>`;
    /* renderAssigned(id, user[1], i);  */
    i++;  
  });


  /* for (let i = 0; i < assigned.length; i++) {
    const user = assigned[i];
    let id = getInitials(user[0]);
    renderAssigned(id, user[1], i);   
  } */
}

function renderAssigned(id, color, zIndex) {
  return `<div class="usertag flex center" style="background-color:${color};z-index:${zIndex}">${id}</div>`;
}

{/* <div class="usertag flex center" id="ut1">AM</div>
          <div class="usertag flex center" id="ut2">EM</div>
          <div class="usertag flex center" id="ut3">MB</div> */}