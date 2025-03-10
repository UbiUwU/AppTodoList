import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import { JsonTodoCollection } from "./jsonTodoCollection";

let todos: TodoItem[] = [
  new TodoItem(1, "Buy Flowers"),
  new TodoItem(2, "Get Shoes"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true),
];

let collection: TodoCollection = new JsonTodoCollection("Adam", todos);
let showCompleted = true;

// Función para mostrar la lista de tareas en la consola (opcional)
function displayTodoList(): void {
  console.log(
    `${collection.userName}'s Todo List ` +
      `(${collection.getItemCounts().incomplete} items to do)`
  );
  collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}

// Función para renderizar la lista de tareas en el HTML
function renderTodoList(): void {
  const todoListElement = document.getElementById("todo-list");
  if (todoListElement) {
    todoListElement.innerHTML = ""; // Limpiar la lista antes de renderizar

    collection.getTodoItems(showCompleted).forEach((item) => {
      const taskElement = document.createElement("div");
      taskElement.className = "task";
      taskElement.innerHTML = `
        <input type="checkbox" ${item.complete ? "checked" : ""} id="task-${item.id}">
        <label for="task-${item.id}">${item.task}</label>
      `;
      taskElement.querySelector("input")?.addEventListener("change", () => {
        collection.markComplete(item.id, !item.complete);
        renderTodoList(); // Volver a renderizar la lista después de marcar como completada
      });
      todoListElement.appendChild(taskElement);
    });
  }
}

// Función para agregar una nueva tarea
function addNewTask(task: string): void {
  if (task) {
    collection.addTodo(task);
    renderTodoList(); // Volver a renderizar la lista después de agregar una tarea
  }
}

// Función para eliminar tareas completadas
function purgeCompletedTasks(): void {
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
  addTaskButton?.addEventListener("click", () => {
    const task = prompt("Enter a new task:");
    if (task) {
      addNewTask(task);
    }
  });

  // Mostrar/ocultar tareas completadas
  toggleCompletedButton?.addEventListener("click", () => {
    showCompleted = !showCompleted;
    renderTodoList();
  });

  // Eliminar tareas completadas
  purgeCompletedButton?.addEventListener("click", () => {
    purgeCompletedTasks();
  });
});