import { TodoItem } from "./todoItem.js";
export class TodoCollection {
    constructor(userName, todoItems = []) {
        this.userName = userName;
        this.nextId = 1;
        this.itemMap = new Map();
        todoItems.forEach((item) => this.itemMap.set(item.id, item));
    }
    addTodo(task) {
        while (this.itemMap.has(this.nextId)) {
            this.nextId++;
        }
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    }
    getTodoById(id) {
        const item = this.itemMap.get(id);
        if (!item) {
            throw new Error(`TodoItem with id ${id} not found`);
        }
        return item;
    }
    getTodoItems(includeComplete) {
        return [...this.itemMap.values()].filter((item) => includeComplete || !item.complete);
    }
    markComplete(id) {
        const task = this.getTodoItems(true).find(item => item.id === id);
        if (task) {
            task.toggleComplete();
        }
    }
    removeComplete() {
        this.itemMap.forEach((item) => {
            if (item.complete) {
                this.itemMap.delete(item.id);
            }
        });
    }
    getItemCounts() {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length,
        };
    }
    deleteSelected(ids) {
        this.itemMap.forEach((item, id) => {
            if (ids.includes(id)) {
                this.itemMap.delete(id);
            }
        });
    }
    getSelectedTasks(ids) {
        return this.getTodoItems(true).filter(item => ids.includes(item.id));
    }
}
