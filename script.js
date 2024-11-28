// Select elements
const noteTitle = document.getElementById('note-title');
const noteDescription = document.getElementById('note-description');
const noteTime = document.getElementById('note-time');
const addNoteButton = document.getElementById('add-note');
const notesContainer = document.getElementById('notes-container');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Initialize notes array from localStorage or an empty array
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to save notes to localStorage
function saveToLocalStorage() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to render notes
function renderNotes() {
  notesContainer.innerHTML = ''; // Clear container

  notes.forEach((note, index) => {
    // Create Note Card
    const noteCard = document.createElement('div');
    noteCard.className = 'p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md';

    // Title
    const title = document.createElement('h3');
    title.className = 'text-lg font-semibold text-gray-800';
    title.textContent = note.title;

    // Description
    const description = document.createElement('p');
    description.className = 'text-gray-600 mt-2';
    description.textContent = note.description;

    // Time
    const time = document.createElement('p');
    time.className = 'text-sm text-gray-500 mt-2 italic';
    time.textContent = `Scheduled Time: ${note.time}`;

    // Actions Container
    const actions = document.createElement('div');
    actions.className = 'flex space-x-4 mt-4';

    // Edit Button
    const editButton = document.createElement('button');
    editButton.className = 'bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600';
    editButton.textContent = 'Edit';
    editButton.onclick = () => editNote(index);

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteNote(index);

    // Append actions and card content
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    noteCard.appendChild(title);
    noteCard.appendChild(description);
    noteCard.appendChild(time);
    noteCard.appendChild(actions);

    notesContainer.appendChild(noteCard);
  });
}

// Function to show the toast notification
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000); // Hide toast after 3 seconds
}

// Function to add a new note
function addNote() {
  const title = noteTitle.value.trim();
  const description = noteDescription.value.trim();
  const time = noteTime.value;

  if (!title || !description || !time) {
    alert('Please fill in all fields.');
    return;
  }

  notes.push({ title, description, time });
  saveToLocalStorage(); // Update localStorage
  noteTitle.value = ''; // Clear inputs
  noteDescription.value = '';
  noteTime.value = '';
  renderNotes();

  // Show toast for successful note addition
  showToast('Note added successfully!'); 
}

// Function to edit a note
function editNote(index) {
  const updatedTitle = prompt('Edit your title:', notes[index].title);
  const updatedDescription = prompt('Edit your description:', notes[index].description);
  const updatedTime = prompt('Edit the time (YYYY-MM-DDTHH:mm):', notes[index].time);

  if (updatedTitle && updatedDescription && updatedTime) {
    notes[index] = { title: updatedTitle, description: updatedDescription, time: updatedTime };
    saveToLocalStorage(); // Update localStorage
    renderNotes();
    showToast('Note successfully updated'); // Show toast for successful update
  }
}

// Function to delete a note
function deleteNote(index) {
  notes.splice(index, 1); // Remove the note from the array
  saveToLocalStorage();   // Update localStorage
  renderNotes();          // Re-render the notes
  showToast('Note deleted successfully!'); // Show toast for delete
}

// Add event listener for adding a note
addNoteButton.addEventListener('click', addNote);

// Initial render
renderNotes();
