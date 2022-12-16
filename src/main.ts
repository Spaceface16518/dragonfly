import { generateUsername } from 'unique-username-generator';

let $dropContainer = document.getElementById('dropContainer');
let $name = document.getElementById('name');
let $file = document.getElementById('file');
let $toast = document.getElementById('toast');

$name.value = generateUsername();

$dropContainer.addEventListener('dragover', e => e.preventDefault());
$dropContainer.addEventListener('dragenter', e => e.preventDefault());
$dropContainer.addEventListener('drop', e => {
  e.preventDefault();
  $file.files = e.dataTransfer.files;
  playVideo();
});

$dropContainer.addEventListener('click', () => {
  $file.click();
});

$file.addEventListener('change', playVideo);

function playVideo() {
  showToast('Loading file ' + $file.files[0].name + '…');
}

function showToast(message) {
  $toast.innerText = message;
  $toast.classList.add('show');
  setTimeout(() => $toast.classList.remove('show'), 5000);
}
