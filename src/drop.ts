export default function setupDrop($drop: HTMLDivElement) {
    // prevent browser's default drag-and-drop action in the drop zone
    const preventDefault = (e: Event) => e.preventDefault()
    $drop.ondragover = preventDefault;
    $drop.ondragenter = preventDefault;
    // handle drag-and-drop of files
    $drop.ondrop = e => {
        preventDefault(e);
        // set the file input's value to the dropped files
        $file.files = e.dataTransfer?.files || null;
    }

    const $file = $drop.querySelector<HTMLInputElement>('#file')!
    $drop.onclick = () => $file.click();
}

