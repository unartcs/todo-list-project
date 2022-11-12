export default class Project {
    constructor(name) {
        this.name = name
        this.tasks = []
    }
    get taskAmount() {
        return this.tasks.length;
    }
    get taskList() {
        return this.tasks;
    }
    set addTask(newTask) {
        this.tasks.push(newTask)
    }
}