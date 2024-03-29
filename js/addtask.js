function selectPrio(prio) {
  document.querySelectorAll('.priobutton').forEach(b => b.classList.remove('urgentselect','mediumselect','lowselect'));
  document.getElementById(prio).classList.add(`${prio}select`);
}

function toggleAssignedDrop() {
  document.getElementById('arrowassigned').classList.toggle('rotate');
  document.getElementById('assigned-drop-menu').classList.toggle('invis');
}
