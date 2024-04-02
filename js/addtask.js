function selectPrio(prio) {
  document.querySelectorAll('.priobutton').forEach(b => b.classList.remove('urgentselect','mediumselect','lowselect'));
  document.getElementById(prio).classList.add(`${prio}select`);
}

function toggleDrop(id) {
  let container = document.getElementById(`${id}`);
  container.firstElementChild.classList.toggle('rotate');
  container.nextElementSibling.classList.toggle('invis');  
}

function checkUser(id) {
  document.getElementById(`${id}`).lastElementChild.classList.toggle('assigned-checked');
}

function selectCategory(category) {
  toggleDrop('arrowcategory');
  document.getElementById('category-input').value = category;
}

function enableSubtasksInput() {
  let field = document.getElementById('subtasks');
  
}
