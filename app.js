const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-task');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
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
  deleteButtonImg.alt = 'Delete';
  deleteButton.appendChild(deleteButtonImg);
  return { checkBox, label, editInput, editButton, deleteButton };
}

function createNewTaskElement(taskString) {
  const listItem = document.createElement('li');
  const controls = createTaskControls(taskString);
  listItem.append(
    controls.checkBox,
    controls.label,
    controls.editInput,
    controls.editButton,
    controls.deleteButton
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
  const listItem = this.closest('li');

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
  const listItem = this.closest('li');
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

function moveTask(listItem, targetList, nextHandler) {
  targetList.appendChild(listItem);
  bindTaskEvents(listItem, nextHandler);
}

const taskCompleted = function () {
  moveTask(this.closest('li'), completedTasksHolder, taskIncomplete);
};

const taskIncomplete = function () {
  moveTask(this.closest('li'), incompleteTaskHolder, taskCompleted);
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

function bindTasksInList(holder, handler) {
  for (let i = 0; i < holder.children.length; i++) {
    bindTaskEvents(holder.children[i], handler);
  }
}

bindTasksInList(incompleteTaskHolder, taskCompleted);
bindTasksInList(completedTasksHolder, taskIncomplete);
