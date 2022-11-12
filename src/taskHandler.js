export default class Task {
    constructor(name, desc, prio, project, dueDate, checked = false) {
        this.name = name;
        this.desc = desc
        this.prio = prio
        this.project = project
        this.dueDate = dueDate;
        this.checked = checked;
        const d = new Date();
        const createDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    }
    changeName(newName) {
        this.name = newName;
    }
    changeDesc(newDesc) {
        this.desc = newDesc;
    }
    changePrio(newPrio) {
        this.prio = newPrio;
    }
    changeChecked() {
        if (this.checked === true) {
            this.checked = false;
        } else {
            this.checked = true;
        }
    }
}