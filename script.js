const todoInput = document.getElementById('todo-input');
const dueDate = document.getElementById('due-date');
const todoList = document.getElementById('todo-list');
const alertBox = document.getElementById('alert');
const addBtn = document.getElementById('add-btn');

let todos = [];

addBtn.addEventListener('click', addTodo);

function addTodo() {
  const task = todoInput.value.trim();
  const date = dueDate.value || 'No due date';
  if (!task) return;

  todos.push({ task, date, status: 'Pending' });
  showAlert('Todo added successfully', 'add');
  renderTodos();
  todoInput.value = '';
  dueDate.value = '';
}

function renderTodos() {
  todoList.innerHTML = '';
  if (todos.length === 0) {
    todoList.innerHTML = '<tr><td colspan="4" class="text-center text-purple-300 py-4">No task found</td></tr>';
    return;
  }

  todos.forEach((todo, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.status}</td>
      <td class="flex gap-2">
        <button class="btn btn-warning btn-sm" onclick="editTodo(${index})"><i class='bx bx-pencil'></i></button>
        <button class="btn btn-success btn-sm" onclick="completeTodo(${index})"><i class='bx bx-check'></i></button>
        <button class="btn btn-error btn-sm" onclick="deleteTodo(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

function editTodo(index) {
  const newTask = prompt('Edit your task', todos[index].task);
  if (newTask) {
    todos[index].task = newTask.trim();
    renderTodos();
  }
}

function completeTodo(index) {
  todos[index].status = 'Completed';
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  showAlert('Todo deleted successfully', 'delete');
  renderTodos();
}

function deleteAll() {
  todos = [];
  renderTodos();
}

function filterTodos() {
  todos = todos.filter(todo => todo.status === 'Pending');
  renderTodos();
}

function showAlert(message, type) {
  alertBox.classList.remove('hidden');
  alertBox.classList.add('block');
  alertBox.textContent = message;
  setTimeout(() => {
    alertBox.classList.add('hidden');
    alertBox.classList.remove('block');
  }, 2000);
}
