import { TodoItem } from "./todoItem";

type ItemCounts = {
  total: number;
  incomplete: number;
};

export class TodoCollection {
  private nextId: number = 1;
  protected itemMap = new Map<number, TodoItem>();

  constructor(public userName: string, todoItems: TodoItem[] = []) {
    todoItems.forEach((item) => this.itemMap.set(item.id, item));
  }

  addTodo(task: string): number {
    while (this.itemMap.has(this.nextId)) {
      this.nextId++;
    }
    this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
    return this.nextId;
  }

  getTodoById(id: number): TodoItem {
    const item = this.itemMap.get(id);
    if (!item) {
      throw new Error(`TodoItem with id ${id} not found`);
    }
    return item;
  }

  getTodoItems(includeComplete: boolean): TodoItem[] {
    return [...this.itemMap.values()].filter(
      (item) => includeComplete || !item.complete
    );
  }

  markComplete(id: number) {
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

  getItemCounts(): ItemCounts {
    return {
      total: this.itemMap.size,
      incomplete: this.getTodoItems(false).length,
    };
  }
  deleteSelected(ids: number[]): void {
    this.itemMap.forEach((item, id) => {
      if (ids.includes(id)) {
        this.itemMap.delete(id);
      }
    });
  }

  getSelectedTasks(ids: number[]): TodoItem[] {
    return this.getTodoItems(true).filter(item => ids.includes(item.id));
  }
}
