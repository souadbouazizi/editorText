function execCmd(command, value = null) {
  document.execCommand(command, false, value);
}

function addImage() {
  document.getElementById('imageInput').click();
}

function uploadImage() {
  const file = document.getElementById('imageInput').files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      execCmd('insertImage', e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

function addLink() {
  const url = prompt('Enter the link URL:');
  if (url) {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      // Wrap selected text with an anchor tag
      execCmd('insertHTML', `<a href="${url}" target="_blank">${selectedText}</a>`);
    } else {
      execCmd('createLink', url);
      // Set target="_blank" for the inserted link
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const anchorTag = selection.anchorNode.parentElement;
        if (anchorTag && anchorTag.tagName === 'A') {
          anchorTag.setAttribute('target', '_blank');
        }
      }
    }
  }
}

function deleteContent() {
  const confirmation = confirm("Are you sure you want to delete the content?");
  if (confirmation) {
    document.getElementById('editor').innerHTML = '';  // Clear the content
  }
}

function undoContent() {
  document.execCommand('undo');  // Undo last action
}

function saveContent() {
  alert('Content saved.');
}

function downloadContent() {
  const content = document.getElementById('editor').innerHTML;
  const blob = new Blob([content], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'content.html';
  link.click();
}