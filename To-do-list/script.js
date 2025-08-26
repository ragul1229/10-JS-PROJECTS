// Load tasks from localStorage when page loads
window.onload = () => {
  loadTasks();
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = { text: taskText, completed: false };
  saveTask(task);
  renderTasks();

  taskInput.value = "";
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasks();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleTask(index);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("task-buttons");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.background = "red";
    deleteBtn.onclick = () => deleteTask(index);

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonsDiv);
    taskList.appendChild(li);
  });

  updateStats();
}

function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function editTask(index) {
  const tasks = getTasks();
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function updateStats() {
  const tasks = getTasks();
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;

  document.getElementById("totalCount").textContent = total;
  document.getElementById("completedCount").textContent = completed;
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  renderTasks();
}
