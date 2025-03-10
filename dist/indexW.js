import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";

let todos = [
    new TodoItem(1, "Buy Flowers"),
    new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"),
    new TodoItem(4, "Call Joe", true),
];
let collection = new TodoCollection("Adam", todos);
let showCompleted = true;
let tasksToDelete = [];
function renderTodoList() {
    const todoListElement = document.getElementById("todo-list");
    if (todoListElement) {
        todoListElement.innerHTML = "";
        collection.getTodoItems(showCompleted).forEach(item => {
            var _a, _b;
            const taskElement = document.createElement("div");
            taskElement.className = "task";
            taskElement.innerHTML = `
        <input type="checkbox" id="task-${item.id}" ${item.complete ? "checked" : ""}>
        <label for="task-${item.id}" class="${item.complete ? "completed" : ""}">${item.task}</label>
      `;
            (_a = taskElement.querySelector("input")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", () => {
                collection.markComplete(item.id);
                renderTodoList();
            });
            if (item.complete) {
                const label = taskElement.querySelector("label");
                if (label)
                    label.innerHTML += " (Tarea completada)";
            }
            (_b = taskElement.querySelector("input")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
                const checkbox = e.target;
                if (checkbox.checked) {
                    tasksToDelete.push(item.id);
                }
                else {
                    tasksToDelete = tasksToDelete.filter(id => id !== item.id);
                }
            });
            todoListElement.appendChild(taskElement);
        });
    }
}
function addNewTask() {
    const task = prompt("Ingrese una nueva tarea:");
    if (task) {
        collection.addTodo(task);
        renderTodoList();
    }
}
function deleteSelectedTasks() {
    if (tasksToDelete.length > 0) {
        const confirmed = window.confirm("¿Seguro que deseas eliminar las tareas seleccionadas?");
        if (confirmed) {
            collection.deleteSelected(tasksToDelete);
            tasksToDelete = [];
            renderTodoList();
        }
    }
    else {
        alert("No hay tareas seleccionadas para eliminar.");
    }
}
function toggleCompleted() {
    showCompleted = !showCompleted;
    renderTodoList();
}
function toggleMarkCompletedButton() {
    const markCompletedButton = document.getElementById("mark-completed");
    if (markCompletedButton.classList.contains("normal-button")) {
        markCompletedButton.classList.remove("normal-button");
        markCompletedButton.classList.add("completed-button");
        markCompletedButton.innerHTML = "✔️ Finalizar Marcado";
    }
    else {
        markCompletedButton.classList.remove("completed-button");
        markCompletedButton.classList.add("normal-button");
        markCompletedButton.innerHTML = "✔️ Marcar Completadas";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("add-task").addEventListener("click", addNewTask);
    document.getElementById("toggle-completed").addEventListener("click", toggleCompleted);
    document.getElementById("mark-completed").addEventListener("click", toggleMarkCompletedButton);
    document.getElementById("delete-tasks").addEventListener("click", deleteSelectedTasks);
    renderTodoList(); 
});
