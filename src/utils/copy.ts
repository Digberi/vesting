export const copy = (text: string) => {
  window.prompt('Copy to clipboard: Ctrl+C, Enter', text);

  // const textArea = document.createElement('textarea');
  // textArea.value = text;
  // document.body.appendChild(textArea);
  // textArea.select();
  // document.execCommand('copy');
  // document.body.removeChild(textArea);
};
