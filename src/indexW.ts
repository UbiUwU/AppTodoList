import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

let todos: TodoItem[] = [
  new TodoItem(1, "Buy Flowers"),
  new TodoItem(2, "Get Shoes"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true), 
];

let collection: TodoCollection = new TodoCollection("Adam", todos);

let showCompleted = true;
let tasksToDelete: number[] = [];

function renderTodoList(): void {
  const todoListElement = document.getElementById("todo-list");
  if (todoListElement) {
    todoListElement.innerHTML = "";

    collection.getTodoItems(showCompleted).forEach(item => {
      const taskElement = document.createElement("div");
      taskElement.className = "task";
      taskElement.innerHTML = `
        <input type="checkbox" id="task-${item.id}" ${item.complete ? "checked" : ""}>
        <label for="task-${item.id}" class="${item.complete ? "completed" : ""}">${item.task}</label>
      `;

      
      taskElement.querySelector("input")?.addEventListener("change", () => {
        collection.markComplete(item.id);
        renderTodoList();
      });

   
      if (item.complete) {
        const label = taskElement.querySelector("label");
        if (label) label.innerHTML += " (Tarea completada)";
      }

      taskElement.querySelector("input")?.addEventListener("click", (e) => {
        const checkbox = e.target as HTMLInputElement;
        if (checkbox.checked) {
          tasksToDelete.push(item.id);
        } else {
          tasksToDelete = tasksToDelete.filter(id => id !== item.id);
        }
      });

      todoListElement.appendChild(taskElement);
    });
  }
}

function addNewTask(): void {
  const task = prompt("Ingrese una nueva tarea:");
  if (task) {
    collection.addTodo(task);
    renderTodoList();
  }
}

function deleteSelectedTasks(): void {
  if (tasksToDelete.length > 0) {
    const confirmed = window.confirm("¿Seguro que deseas eliminar las tareas seleccionadas?");
    if (confirmed) {
      collection.deleteSelected(tasksToDelete);
      tasksToDelete = [];
      renderTodoList();
    }
  } else {
    alert("No hay tareas seleccionadas para eliminar.");
  }
}

function toggleCompleted(): void {
  showCompleted = !showCompleted;
  renderTodoList();
}

function toggleMarkCompletedButton() {
  const markCompletedButton = document.getElementById("mark-completed")!;
  if (markCompletedButton.classList.contains("normal-button")) {
    markCompletedButton.classList.remove("normal-button");
    markCompletedButton.classList.add("completed-button");
    markCompletedButton.innerHTML = "✔️ Finalizar Marcado";
  } else {
    markCompletedButton.classList.remove("completed-button");
    markCompletedButton.classList.add("normal-button");
    markCompletedButton.innerHTML = "✔️ Marcar Completadas";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-task")!.addEventListener("click", addNewTask);
  document.getElementById("toggle-completed")!.addEventListener("click", toggleCompleted);
  document.getElementById("mark-completed")!.addEventListener("click", toggleMarkCompletedButton);
  document.getElementById("delete-tasks")!.addEventListener("click", deleteSelectedTasks);

  renderTodoList();
});
