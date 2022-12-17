export default function setupToast($toastContainer: HTMLDivElement) {
  const $toastTemplate =
    $toastContainer.querySelector<HTMLTemplateElement>(
      "#toast-template"
    )!.content;

  return function showToast(message: string, timeout: number = 5000) {
    // create a new toast element
    const $toast = $toastTemplate.cloneNode(true) as HTMLDivElement;
    // set the toast contents
    $toast.innerText = message;
    // hide the message after timeout
    setTimeout(() => $toastContainer.removeChild($toast), timeout);
  };
}
