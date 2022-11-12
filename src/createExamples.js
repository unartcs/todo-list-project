import Task from './taskHandler.js'
import Project from './projectHandler.js'
import domController from './domManipulator.js'
import mainLogic from './logic.js'

export default function mainFunction() {
    const domFunct = domController()
    const projectList = []
    const projectSamples = ['House', 'Work', 'School', 'Family']
    const taskSamples = {

        'House': ['Do the Dishes', 'Do the Laundry', 'Wash the car', 'Clean the toilet'],
        'Work': ['Wake up at 8AM', 'Meeting on Thursday', 'Interview at 5PM'],
        'School': ['Prepare for the finals', 'Talk to my English teacher', 'Do the group Project'],
        'Family': ['Son birthday on the 15th', 'Make X-mas decorations', 'Make BlackFriday list', 'Create X-mas wishlist']
    }
    let projectListCopy = []
    function generateSamples() {
        projectSamples.forEach(project => {
            taskSamples[project].forEach(task => {
                createExampleProject(task, project)
            })
        })
        return updateDOM()
    }

    function createExampleProject(taskName, projectName) {
        const result = projectList.filter(item => item.name === projectName)
        const index = projectList.findIndex(obj => {
            return obj.name === projectName
        })
        if (result != '') {
            // console.log(`${projectName} found`)
            const task = createExampleTask(taskName, 'desc here', 'high', projectName);
            projectList[index].tasks.push(task)
            return
            //Other dom stuff like updating the task list
            //And also update the number of tasks on the project(project.tasks.length)
        } else {
            const newProject = new Project(projectName)
            //DOm stuff? like updating the project list
            projectList.push(newProject)
            return createExampleProject(taskName, projectName)
        }
    }

    function updateDOM() {
        domFunct.updateProjectLi(projectList)
    }
    function updateLocalStorage() {
        //localStorage.add/update(projectList)
    }
    function updateLogicList() {
        // console.log('a')
        projectListCopy = projectList
        return projectListCopy
    }

    function createExampleTask(name, desc, prio, project) {
        const newTask = new Task(name, desc, prio, project)
        return newTask;
    }
    return { 
        generateSamples: generateSamples,
        updateLogicList: updateLogicList,
    }
}
