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
    const dueDates = ['05/25/2023', '01/13/2023', '02/22/2022', '11/11/2022', '01/02/2023',
        '03/03/2023', '11/11/2023', '06/06/2023', '06/14/2022', '03/30/2023', '06/02/2023',
        '02/22/2023', '02/15/2023', '04/04/2023', '06/10/2023', '06/25/2023'
    ]
    const dueDatesT = ['10','55','24','99','12','155','203']
    let projectListCopy = []
    // function generateSamples() {
    //     projectSamples.forEach(project => {
    //         taskSamples[project].forEach(task => {
    //             createExampleProject(task, project)
    //         })
    //     })
    //     return updateDOM()
    // }
    function generateSamples() {
        let i = 0;
        projectSamples.forEach(project => {
            taskSamples[project].forEach(task => {
                i++
                createExampleProject(task, project, dueDates[i])
            })
        })
        return updateDOM()
    }

    function createExampleProject(taskName, projectName, dueDate) {
        const result = projectList.filter(item => item.name === projectName)
        const index = projectList.findIndex(obj => {
            return obj.name === projectName
        })
        if (result != '') {
            // console.log(`${projectName} found`)
            const task = createExampleTask(taskName, 'desc here', 'high', projectName, dueDate);
            projectList[index].tasks.push(task)
            return
            //Other dom stuff like updating the task list
            //And also update the number of tasks on the project(project.tasks.length)
        } else {
            const newProject = new Project(projectName)
            //DOm stuff? like updating the project list
            projectList.push(newProject)
            return createExampleProject(taskName, projectName, dueDate)
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

    function createExampleTask(name, desc, prio, project, dueDate) {
        const newTask = new Task(name, desc, prio, project, dueDate)
        return newTask;
    }
    return {
        generateSamples: generateSamples,
        updateLogicList: updateLogicList,
    }
}
