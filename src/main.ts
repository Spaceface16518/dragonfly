import { generateUsername } from 'unique-username-generator';

let $dropContainer = document.getElementById('dropContainer');
let $name = document.getElementById('name');
let $file = document.getElementById('file');
let $toast = document.getElementById('toast');

// Use a random username as the default display name if none is set already
if (!$name.value) $name.value = generateUsername();

// Prevent browser's default drag-and-drop action in the drop zone
$dropContainer.addEventListener('dragover', e => e.preventDefault());
$dropContainer.addEventListener('dragenter', e => e.preventDefault());
// Handle drag-and-drop of files
$dropContainer.addEventListener('drop', e => {
  // Prevent the default action
  e.preventDefault();
  // Set the file input's value to the dropped files
  $file.files = e.dataTransfer.files;
  // Process the file
  playVideo();
});

// Clicking in the drop zone should trigger the file input
$dropContainer.addEventListener('click', () => $file.click());

// Process any file that is selected
$file.addEventListener('change', playVideo);

function playVideo() {
  showToast('Loading file ' + $file.files[0].name + '…');
}

function showToast(message) {
  // Function to show the user a message
  $toast.innerText = message;
  $toast.classList.add('show');
  // Hide the message in 5 seconds
  setTimeout(() => $toast.classList.remove('show'), 5000);
}
