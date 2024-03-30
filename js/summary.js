function updateGreeting() {
  const now = new Date();
  const hour = now.getHours();

  let greetingText; // Declare variable to hold the greeting text

  if (hour < 12) {
    greetingText = "Good morning";
  } else if (hour < 18) {
    greetingText = "Good day";
  } else {
    greetingText = "Good evening";
  }

  // Access and update the element's text content
  const greetElement = document.getElementById('greet');
  if (greetElement) { // Check if element exists before accessing
    greetElement.textContent = greetingText;
  } else {
    console.error("Element with ID 'greet' not found!"); // Handle missing element
  }
}
 
updateGreeting();
setInterval(updateGreeting, 1000); // Update every second

