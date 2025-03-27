// Disable right-click
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable keyboard shortcuts (F12, Ctrl+Shift+I, etc.)
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && (event.key === 'u' || event.key === 'i' || event.key === 's' || event.key === 'c')) {
    event.preventDefault();
  }
});
