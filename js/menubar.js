/**
 * Function to remove selectedMenu / selectedImg effects from the non selected menu element
 * Adding selectedMenu / selectedImg effects to the selected menu element
 * @param {string} menuitem using the id to adress the item
 */
function menuSelected(menuitem) {
  document.querySelectorAll(".selectedMenu").forEach((e) => e.classList.remove("selectedMenu"));
  document.querySelectorAll(".selectedImg").forEach((e) => e.classList.remove("selectedImg"));
  let menupoint = document.getElementById(menuitem);
  menupoint.classList.add("selectedMenu");
  if (menuitem == "privacy" || menuitem == "legal") {
    menupoint.style.color = '#cdcdcd';
  } else {
    menupoint.firstChild.classList.add("selectedImg");
  }
}


