let users = [];
let tasks = [];

/** 
 * Adding selectedMenu / selectedImg effects to the selected menu element
 * @param {string} menuitem using the docTitle and giving it to the function to know what page is active
 */
function menuSelected(menuitem) {  
    let menupoint = document.getElementById(menuitem);
    menupoint.classList.add("selectedMenu");
    if (menuitem == "Join-Privacy-Policy" || menuitem == "Join-Legal-Notice") {
      menupoint.style.color = '#cdcdcd';
    } else {
      menupoint.firstChild.classList.add("selectedImg");
    }
  }
  
  /**
   * Loading in the templates of the sidemenu and the header
   * After that calling the menuSelected function to change the appearance of the clicked menu item
   */
  
  async function includeHTML() {
    let includeElements = document.querySelectorAll("[include-html]");
    for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("include-html"); 
      let resp = await fetch(file);
      if (resp.ok) {
        element.innerHTML = await resp.text();
      } else {
        element.innerHTML = "Page not found";
      }
    }
    menuSelected(document.title);
    updateSummaryCounts();
    displayCurrentDate();
  }

  function getInitials(user) {
    let names = user.split(' ');
    let firstletter = names[0].charAt(0).toUpperCase();  
    return names[1] ? (firstletter + (names[1].charAt(0).toUpperCase())) : firstletter;
  }

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

async function init(){
  loadUsers();
  loadTasks();
}

async function loadTasks() {  
  try {
    tasks = JSON.parse(await getItem('taskobject'));
  } catch(e){
    console.error('Loading error:', e);
  }
}

async function loadUsers(){
  try {
      users = JSON.parse(await getItem('users'));
  } catch(e){
      console.error('Loading error:', e);
  }
}