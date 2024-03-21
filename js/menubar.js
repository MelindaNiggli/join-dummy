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
}


