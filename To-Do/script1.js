
// ==========================
// DOM ELEMENTS
// ==========================
const todoInput = document.getElementById("to-do-input");
const enterInputBtn = document.getElementById("enter-input");
const displayTask = document.getElementById("todo-list");
const clearCompletedBtn = document.getElementById("clear-completed");
const itemLeft = document.getElementById("item-left");
const emptyState = document.querySelector(".empty-state");
const filters = document.querySelectorAll(".filter");

// ==========================
// STATE
// ==========================
let todos = [];
let currentFilter = "all";

// ==========================
// LOAD FROM LOCAL STORAGE
// ==========================
function loadTodos() {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  if (storedTodos) {
    todos = storedTodos;
  }
  renderTodos();
}

// ==========================
// ADD TODO
// ==========================
function addTodo(text) {
  if (text.trim() === "") return;

  const todo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todos.push(todo);
  todoInput.value = "";

  saveTodos();
  renderTodos();
}

// ==========================
// SAVE TODOS
// ==========================
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ==========================
// FILTER TODOS
// ==========================
function filterTodos(filter) {
  switch (filter) {
    case "active":
      return todos.filter(todo => !todo.completed);
    case "completed":
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

// ==========================
// RENDER TODOS
// ==========================
function renderTodos() {
  displayTask.innerHTML = "";

  const filteredTodos = filterTodos(currentFilter);

  filteredTodos.forEach(todo => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    if (todo.completed) todoItem.classList.add("completed");

    // CHECKBOX
    const checkboxContainer = document.createElement("label");
    checkboxContainer.classList.add("checkbox-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.classList.add("todo-checkbox");
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const checkmark = document.createElement("span");
    checkmark.classList.add("checkmark");

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkmark);

    // TEXT
    const todoText = document.createElement("span");
    todoText.classList.add("todo-item-text");
    todoText.textContent = todo.text;

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    // APPEND
    todoItem.appendChild(checkboxContainer);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteBtn);

    displayTask.appendChild(todoItem);
  });

  updateItemsCount();
  checkEmptyState();
}

// ==========================
// TOGGLE TODO
// ==========================
function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  saveTodos();
  renderTodos();
}

// ==========================
// DELETE TODO
// ==========================
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);

  saveTodos();
  renderTodos();
}

// ==========================
// CLEAR COMPLETED
// ==========================
function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);

  saveTodos();
  renderTodos();
}

// ==========================
// UPDATE ITEM COUNT
// ==========================
function updateItemsCount() {
  const remaining = todos.filter(todo => !todo.completed).length;
  itemLeft.textContent = `${remaining} item${remaining !== 1 ? "s" : ""} left`;
}

// ==========================
// EMPTY STATE CHECK
// ==========================
function checkEmptyState() {
  const filteredTodos = filterTodos(currentFilter);

  if (filteredTodos.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

// ==========================
// FILTER BUTTON HANDLER
// ==========================
filters.forEach(filterBtn => {
  filterBtn.addEventListener("click", () => {
    // remove active
    filters.forEach(btn => btn.classList.remove("active"));

    // add active
    filterBtn.classList.add("active");

    currentFilter = filterBtn.dataset.filter;

    renderTodos();
  });
});

// ==========================
// EVENT LISTENERS
// ==========================
enterInputBtn.addEventListener("click", () => {
  addTodo(todoInput.value);
});

todoInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    addTodo(todoInput.value);
  }
});

clearCompletedBtn.addEventListener("click", clearCompleted);

// ==========================
// INIT
// ==========================
loadTodos();