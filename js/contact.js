function showContact() {
    let overlay = document.getElementById('overlay');
    let container = document.getElementById('addContact');
    overlay.style.position = 'absolute';
    container.style.display = 'flex';
    container.style.transform = 'translateX(1100px)';
    overlay.style.display = 'flex'; 

    setTimeout(function() {
        container.style.transform = 'translateX(0px)';
    }, 1); 
}

function closeContact() {
    let overlay = document.getElementById('overlay');
    let container = document.getElementById('addContact');
    container.style.transform = 'translateX(1600px)';
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 500); 
}