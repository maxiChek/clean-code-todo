const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

function createTaskControls(taskString) {
  const checkBox = Object.assign(document.createElement('input'), {
    type: 'checkbox'
  });
  const label = Object.assign(document.createElement('label'), {
    className: 'task',
    innerText: taskString
  });
  const editInput = Object.assign(document.createElement('input'), {
    type: 'text',
    className: 'task'
  });
  const editButton = Object.assign(document.createElement('button'), {
    className: 'edit',
    innerText: 'Edit'
  });
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'Delete'; // ← заодно accessibility-фикс
  deleteButton.appendChild(deleteButtonImg);
  return { checkBox, label, editInput, editButton, deleteButton };
}

function createNewTaskElement(taskString) {
  const listItem = document.createElement('li');
  const c = createTaskControls(taskString);
  listItem.append(
    c.checkBox,
    c.label,
    c.editInput,
    c.editButton,
    c.deleteButton
  );
  return listItem;
}

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createNewTaskElement(newTaskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  newTaskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

function moveTask(listItem, targetList, nextHandler) {
  targetList.appendChild(listItem);
  bindTaskEvents(listItem, nextHandler);
}

const taskCompleted = function () {
  moveTask(this.parentNode, completedTasksHolder, taskIncomplete);
};

const taskIncomplete = function () {
  moveTask(this.parentNode, incompleteTaskHolder, taskCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkboxChangeHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkboxChangeHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
