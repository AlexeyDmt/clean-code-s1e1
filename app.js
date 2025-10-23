// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector('#new-task');//Add a new task.
const addButton = document.querySelector('button');//first button
const incompleteTaskHolder = document.querySelector('#incomplete-tasks');//ul of #incomplete-tasks
const completedTasksHolder = document.querySelector('#completed-tasks');//completed-tasks

// New task list item
const createNewTaskElement = function(taskString) {

  const listItem = document.createElement('li');
  listItem.classList.add('task');

  // input (checkbox)
  const checkBox = document.createElement('input'); // checkbox
  // label
  const label = document.createElement('label'); // label
  // input (text)
  const editInput = document.createElement('input'); // text
  // button.edit
  const editButton = document.createElement('button');// edit button
  // button.delete
  const deleteButton = document.createElement('button');// delete button
  const deleteButtonImg = document.createElement('img');// delete button image

  label.textContent = taskString;
  label.classList.add('task__label');

  checkBox.type = 'checkbox';
  checkBox.classList.add('todo__input', 'task__checkbox');

  editInput.type = 'text';
  editInput.classList.add('task__input', 'todo__input', 'task__text');

  editButton.textContent = 'Edit'; // textContent encodes special characters, HTML does not.
  editButton.classList.add('todo__btn', 'todo__btn--edit');

  deleteButton.classList.add('todo__btn', 'delete');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.classList.add('delete__img');
  deleteButtonImg.alt = 'Delete task';

  // Each elements, needs appending
  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = function() {
  console.log('Add Task...');

  // Create a new list item with the text from the #new-task:
  if (!taskInput.value || taskInput.value.trim() === '') {
   taskInput.value = '';
   return;
  }
  
  const listItem = createNewTaskElement(taskInput.value.trim());

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);
  taskInput.value = '';
}

// Edit an existing task.
const editTask = function() {
  console.log('Edit Task...');
  console.log('Change "edit" to "save"');

  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.todo__btn--edit');

  // If class of the parent is .editmode
  const containsClass = listItem.classList.contains('task--editing');

  if (containsClass) {
    // switch to .editmode
    // label becomes the inputs value.
    label.textContent = editInput.value;
    editBtn.textContent = 'Edit';
  } else {
    editInput.value = label.textContent;
    editBtn.textContent = 'Save';
  }

  // toggle .editmode on the parent.
  listItem.classList.toggle('task--editing');
};

// Delete task.
const deleteTask = function() {
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

// Mark task completed
const taskCompleted = function() {
  console.log('Complete Task...');

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem);
}

const taskIncomplete = function() {
  console.log('Incomplete Task...');
  // Mark task as incomplete.
  // When the checkbox is unchecked
  // Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);
}

const ajaxRequest = function() {
  console.log('AJAX Request');
}

// The glue to hold it all together.
// Set the click handler to the addTask function.
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function(taskListItem) {
  console.log('bind list item events');

  // select ListItems children
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.todo__btn--edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  // Bind editTask to edit button.
  editButton.addEventListener('click', editTask);
  // Bind deleteTask to delete button.
  deleteButton.addEventListener('click', deleteTask);

  checkBox.addEventListener('change', function() {
    if (checkBox.checked) {
      completedTasksHolder.appendChild(taskListItem);
    } else {
      incompleteTaskHolder.appendChild(taskListItem);
    }
  });
}

// cycle over incompleteTaskHolder ul list items
// for each list item
for (let i=0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i]);
}

// cycle over completedTasksHolder ul list items
for (let i=0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i]);
}

// -------------------------------------------------------------------------------

// Issues with usability don't get seen until they are in front of a human tester.

// Prevent creation of empty tasks.

// Change edit to save when you are in edit mode.