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
  document
    .getElementById(`${id}`)
    .lastElementChild.classList.toggle("assigned-checked");
}

function selectCategory(category) {
  toggleDrop("arrowcategory");
  document.getElementById("category-input").value = category;
}

function enableSubtasksInput() {
  let field = document.getElementById("subtasks");
  let hiddenicons = document.getElementById("subtask-active-icons");
  let plusicon = hiddenicons.nextElementSibling;
  
  field.disabled ? field.disabled = false : field.disabled = true;
  if (field.disabled == false) {field.focus()};
  hiddenicons.classList.toggle('invis');
  hiddenicons.classList.toggle('flex');
  plusicon.classList.toggle('invis');
  plusicon.classList.toggle('flex');
}

function clearInput() {
  document.getElementById('subtasks').value = '';
  enableSubtasksInput();
}
