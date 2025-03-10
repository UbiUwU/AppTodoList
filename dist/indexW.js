"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const jsonTodoCollection_1 = require("./jsonTodoCollection");
let todos = [
    new todoItem_1.TodoItem(1, "Buy Flowers"),
    new todoItem_1.TodoItem(2, "Get Shoes"),
    new todoItem_1.TodoItem(3, "Collect Tickets"),
    new todoItem_1.TodoItem(4, "Call Joe", true),
];
let collection = new jsonTodoCollection_1.JsonTodoCollection("Adam", todos);
let showCompleted = true;
// Función para mostrar la lista de tareas en la consola (opcional)
function displayTodoList() {
    console.log(`${collection.userName}'s Todo List ` +
        `(${collection.getItemCounts().incomplete} items to do)`);
    collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}
// Función para renderizar la lista de tareas en el HTML
function renderTodoList() {
    const todoListElement = document.getElementById("todo-list");
    if (todoListElement) {
        todoListElement.innerHTML = ""; // Limpiar la lista antes de renderizar
        collection.getTodoItems(showCompleted).forEach((item) => {
            var _a;
            const taskElement = document.createElement("div");
            taskElement.className = "task";
            taskElement.innerHTML = `
        <input type="checkbox" ${item.complete ? "checked" : ""} id="task-${item.id}">
        <label for="task-${item.id}">${item.task}</label>
      `;
            (_a = taskElement.querySelector("input")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", () => {
                collection.markComplete(item.id, !item.complete);
                renderTodoList(); // Volver a renderizar la lista después de marcar como completada
            });
            todoListElement.appendChild(taskElement);
        });
    }
}
// Función para agregar una nueva tarea
function addNewTask(task) {
    if (task) {
        collection.addTodo(task);
        renderTodoList(); // Volver a renderizar la lista después de agregar una tarea
    }
}
// Función para eliminar tareas completadas
function purgeCompletedTasks() {
    collection.removeComplete();
    renderTodoList(); // Volver a renderizar la lista después de eliminar tareas completadas
}
// Eventos del DOM
document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.getElementById("add-task");
    const toggleCompletedButton = document.getElementById("toggle-completed");
    const purgeCompletedButton = document.getElementById("purge-completed");
    // Renderizar la lista de tareas al cargar la página
    renderTodoList();
    // Agregar una nueva tarea
    addTaskButton === null || addTaskButton === void 0 ? void 0 : addTaskButton.addEventListener("click", () => {
        const task = prompt("Enter a new task:");
        if (task) {
            addNewTask(task);
        }
    });
    // Mostrar/ocultar tareas completadas
    toggleCompletedButton === null || toggleCompletedButton === void 0 ? void 0 : toggleCompletedButton.addEventListener("click", () => {
        showCompleted = !showCompleted;
        renderTodoList();
    });
    // Eliminar tareas completadas
    purgeCompletedButton === null || purgeCompletedButton === void 0 ? void 0 : purgeCompletedButton.addEventListener("click", () => {
        purgeCompletedTasks();
    });
});
