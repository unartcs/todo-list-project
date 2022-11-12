export default class Project {
    constructor(name) {
        this.name = name
        this.tasks = []
    }
    get taskAmount() {
        return this.tasks.length;
        ///Need to change this to task amount that isnt "checked"
    }
    get taskList() {
        return this.tasks;
    }
    set addTask(newTask) {
        this.tasks.push(newTask)
    }
}