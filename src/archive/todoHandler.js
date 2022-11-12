export default class Todo {
    constructor(title, desc, prio, project) {
        this.title = title;
        this.desc = desc;
        this.prio = prio;
        this.project = project;
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        this.createDate = dateTime
    }
    changeTitle(newTitle) {
        this.title = newTitle
    }
    changeDesc(newDesc) {
        this.desc = newDesc;
    }
    changePrio(newPrio) {
        this.prio = newPrio;
    }
    changeProject(newProject) {
        this.project = newProject;
    }
}



