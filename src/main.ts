import setupDrop from "./drop";
import setupToast from "./toast";

setupToast(document.querySelector("#toast-container")!);

const $drop = setupDrop(document.querySelector("#dropContainer")!);
const $file: HTMLInputElement = $drop.querySelector("#file")!;

const $video: HTMLVideoElement = document.querySelector("#video")!;

// the user wants to share a file
$file.onchange = () => {
    // get the file from the file input
    const file = $file.files?.[0];
    if (!file) return;

    // hide the drop zone
    $drop.classList.add("hidden");
    // show the video player
    $video.classList.remove("hidden");
    // TODO: change join code to share code

    // set the video source to the file
    $video.srcObject = file;

};
