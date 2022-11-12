import { findIndex } from "lodash";

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
}
export default class Projects {
    constructor() {
        this.projects = []
    }
    newProject(name) {
        let proj = new Project(name)
        this.projects.push(proj)
        return proj;
    }
    get allProjects() {
        return this.projects;
    }
    getProjectName(value) {
        const result = this.allProjects.filter(function (projectName) {
            if (projectName.name === value) {
                return projectName
            }
        })
        return result
    }
    getIndex(value) {
        let index = projects.allProjects.findIndex(object => {
            return object.name === currentProjectName;
          });
    }
    get numberOfProjects() {
        return this.projects.length;
    }
    get getTasks() {
        return this.projects.tasks;
    }
}