// Function to execute editor commands
function execCmd(command, value = null) {
  document.execCommand(command, false, value);
}

// Function to trigger file input click for adding an image
function addImage() {
  document.getElementById('imageInput').click();
}

// Function to upload an image from the chosen file
function uploadImage() {
  const file = document.getElementById('imageInput').files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageHTML = `<img src="${e.target.result}" class="uploaded-image" alt="Uploaded Image">`;
      execCmd('insertHTML', imageHTML);
    };
    reader.readAsDataURL(file);
  }
}

// Function to add a link to selected text or create a new link
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

// Function to delete the content in the editor
function deleteContent() {
  const confirmation = confirm("Are you sure you want to delete the content?");
  if (confirmation) {
    document.getElementById('editor').innerHTML = '';  // Clear the content
    localStorage.removeItem('editorContent');  // Remove the saved content
  }
}

// Function to undo the last action
function undoContent() {
  document.execCommand('undo');  // Undo the last action
}

// Function to save the editor content
function saveContent() {
  const content = document.getElementById('editor').innerHTML;
  localStorage.setItem('editorContent', content);  // Save to local storage
  alert('Content saved.');
}

// Function to download the editor content as a file
function downloadContent() {
  const content = document.getElementById('editor').innerHTML;
  const blob = new Blob([content], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'content.html';
  link.click();
}

// Function to add an image from a URL
function addImageFromURL() {
  const imageURL = prompt('Enter the image URL:');
  if (imageURL) {
    // Insert the image into the editor
    execCmd('insertHTML', `<img src="${imageURL}" class="uploaded-image" alt="Image">`);
  }
}

// Load saved content when the page loads
window.onload = function () {
  const savedContent = localStorage.getItem('editorContent');
  if (savedContent) {
    document.getElementById('editor').innerHTML = savedContent;
  }
};
