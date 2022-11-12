import mainFunction from "./createExamples.js"
import Task from './taskHandler.js'
import Project from './projectHandler.js'
import domController from './domManipulator.js'

let projectList = [];

export default function mainLogic() {
    ///const projectList = localStorage list
    const mainFunct = mainFunction();
    const domControllerFunct = domController();
    projectList = mainFunct.updateLogicList();
    function createNewTask(name, desc, prio, project, dueDate) {
        const newTask = new Task(name, desc, prio, project, dueDate)
        addTaskToProject(project, newTask)
    }
    function createNewProject(projectName) {
        const result = projectList.filter(item => item.name === projectName)
        const index = projectList.findIndex(obj => {
            return obj.name === projectName
        })
        console.log(index)
        if (index == -1 && projectName != '' && projectName != undefined) {
            const newProject = new Project(projectName)
            projectList.push(newProject)
            domControllerFunct.updateProjectLi(projectList)
        }
        else { //"Project name already exists"
            console.log('project name exists')
            return
        }
    }
    function addTaskToProject(projectName, task) {
        const result = projectList.filter(item => item.name === projectName)
        const index = projectList.findIndex(obj => {
            return obj.name === projectName
        })
        if (task != '' || task != undefined) {
            console.log(projectList[index].tasks)
            projectList[index].tasks.push(task)
            domControllerFunct.updateProjectLi(projectList);
            domControllerFunct.updateTasksLi(projectName)
        }
    }
    mainFunct.generateSamples();
    const testProject = createNewProject('Test')
    const testTask = createNewTask('Random', 'Do random stuff', 'med', 'Test','11/12/2022')
    return {
        createNewTask: createNewTask,
        createNewProject: createNewProject,
    }
}