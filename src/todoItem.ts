export class TodoItem {
  constructor(
    public id: number,
    public task: string,
    public complete: boolean = false
  ) {
    // no statements required
  }
  toggleComplete() {
    this.complete = !this.complete;
  }
  printDetails(): void {
    console.log(
      `${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`
    );
  }
}
