let $dropContainer: HTMLDivElement = document.querySelector('#dropContainer')!;
let $name: HTMLInputElement = document.querySelector('#name')!;
let $file: HTMLInputElement = document.querySelector('#file')!;
let $toast: HTMLDivElement = document.querySelector('#toast')!;

// Prevent browser's default drag-and-drop action in the drop zone
$dropContainer.addEventListener('dragover', e => e.preventDefault());
$dropContainer.addEventListener('dragenter', e => e.preventDefault());
// Handle drag-and-drop of files
$dropContainer.addEventListener('drop', e => {
	// Prevent the default action
	e.preventDefault();
	// Set the file input's value to the dropped files
	$file.files = e.dataTransfer?.files || null;
	// Process the file
	playVideo();
});

// Clicking in the drop zone should trigger the file input
$dropContainer.addEventListener('click', () => $file.click());

// Process any file that is selected
$file.addEventListener('change', playVideo);

function playVideo() {
	const file = $file.files?.[0];
	if (!file) {
		showToast('No file selected');
		return;
	}
	showToast('Loading file ' + file.name + '…');
}

function showToast(message: string) {
	// Function to show the user a message
	$toast.innerText = message;
	$toast.classList.add('show');
	// Hide the message in 5 seconds
	setTimeout(() => $toast.classList.remove('show'), 5000);
}
