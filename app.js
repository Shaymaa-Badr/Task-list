// Define UI Vars
const form = document.querySelector("#task-form"),
  taskInput = document.querySelector("#task"),
  taskList = document.querySelector(".collection"),
  clearBtn = document.querySelector(".clear-tasks"),
  filter = document.querySelector("#filter");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);

  // Remove task list
  taskList.addEventListener("click", removeTask);

  // Clear tasks
  clearBtn.addEventListener("click", clearTasks);

  // Filter Tasks
  filter.addEventListener("keyup", filterTasks);
}
function getTasks() {
  let tasks;
  // Check the LS
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // loop tasks
  tasks.forEach((task) => {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create a text node & append to li
    li.appendChild(document.createTextNode(task));

    // create a link element
    const link = document.createElement("a");

    // Add class to the link
    link.className = "delete-item secondary-content";

    // Add icon
    link.innerHTML = '<i class="fa fa-times"></i>';

    // Append the link to li
    li.appendChild(link);

    // Append li to taskList
    taskList.appendChild(li);
  });
}

function addTask(e) {
  //
  if (taskInput.value === "") {
    alert("Add a task");
  }
  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create a text node & append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // create a link element
  const link = document.createElement("a");

  // Add class to the link
  link.className = "delete-item secondary-content";

  // Add icon
  link.innerHTML = '<i class="fa fa-times"></i>';

  // Append the link to li
  li.appendChild(link);

  // Append li to taskList
  taskList.appendChild(li);

  // Store tasks in LS
  storeTasksInLocalStorage(taskInput.value);
  // Clear input
  taskInput.value = "";

  e.preventDefault();
}
// Store tasks in LS function
function storeTasksInLocalStorage(task) {
  let tasks;
  // Check the LS
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task function
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  // Check the LS
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Clear tasks
function clearTasks() {
  // taskList.innerHTML = "";

  // or --FASTER--
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear LS
  clearLocalStorage();
}
function clearLocalStorage() {
  localStorage.clear();
}
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
