export class TodoItem {
    constructor(id, task, complete = false) {
        this.id = id;
        this.task = task;
        this.complete = complete;
        // no statements required
    }
    toggleComplete() {
        this.complete = !this.complete;
    }
    printDetails() {
        console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`);
    }
}
