import { add, get } from "lodash";
import mainFunction from "./createExamples.js"
import mainLogic from './logic.js'

let activeProject = '';
let taskFormActive = false;
let projectFormActive = false;
const clickableProjects = [];
const clickableTasks = [];
const clickableDeleteButtons = [];
let projectList = [];

export default function domController() {
    const mainDOM = document.querySelector('.navbar-container'),
        projectNavbar = document.querySelector('.navbar-lower-ul'),
        projectTitle = document.querySelector('.project-title'),
        tasksDOM = document.querySelector('.task-list'),
        addTaskButton = document.querySelector('.add-task-button'),
        taskLi = document.querySelectorAll('.task-list > li')
    // const mainFunct = mainFunction();
    function updateProjectLi(projectsArray) {
        projectList = projectsArray
        const projectUL = document.querySelectorAll('.navbar-container > .navbar-lower-ul > li')
        projectUL.forEach(li => {
            li.remove();
        })
        projectsArray.forEach(project => {
            console.log(project)
            if (project.name != '') {
                const p = document.createElement('li')
                p.innerHTML = project.name +  ` (${project.taskAmount})`
                projectNavbar.appendChild(p)
                clickableProjects.push(p)
            }
            else { return }
        })
        clickableProjects.forEach(project => {
            project.addEventListener('click', function () {
                console.log(project.innerHTML)
                updateTasksLi(project.innerHTML)
                activeProject = project.innerHTML
                ///Change right side of the page here
            })
        })

    }
    function updateTasksLi(projectName) {
        //Will happen whewn I click a project
        //Or when I add a new task to any project
        const tasksChilds = document.querySelectorAll('.task-list > div')
        // taskList = document.querySelectorAll('.task-list > li')
        tasksChilds.forEach(item => {
            item.remove()
        })
        const getProjectName = projectList.filter(p => p.name === projectName)
        projectTitle.innerHTML = projectName
        getProjectName.forEach(project => {
            project.tasks.forEach(task => {
                const taskDiv = document.createElement('div')
                const taskLi = document.createElement('li')
                const taskDelButton = document.createElement('button')
                const taskDate = document.createElement('span')
                taskLi.innerHTML = task.name
                taskDelButton.innerHTML = 'X'
                taskDate.innerHTML = task.dueDate
                tasksDOM.appendChild(taskDiv)
                taskDiv.appendChild(taskLi)
                taskDiv.appendChild(taskDelButton)
                taskDiv.appendChild(taskDate)
                clickableDeleteButtons.push(taskDelButton)
                clickableTasks.push(taskLi)
                switch (task.prio) {
                    case 'low':
                        taskLi.style.backgroundColor = 'yellow';
                        break;
                    case 'med':
                        taskLi.style.backgroundColor = 'orange';
                        break;
                    case 'high':
                        taskLi.style.backgroundColor = 'red';
                        break;
                }
                if (task.checked === true) {
                    taskLi.style.opacity = '0.52'
                    taskLi.style.textDecoration = 'line-through'
                }
            })

        })
        clickableTasks.forEach(li => {
            li.addEventListener('click', function (e) {
                // console.log(li.innerHTML)
                if (activeProject === '' || activeProject === undefined) {
                    activeProject = projectList[projectList.length - 1].name
                }
                const result = projectList.filter(item => item.name === activeProject)
                const index = projectList.findIndex(obj => {
                    return obj.name === activeProject
                })
                const taskName = projectList[index].tasks.filter(item => item.name === li.innerHTML)
                const taskIndex = projectList[index].tasks.findIndex(item => {
                    return item.name === li.innerHTML
                })
                const currentTask = projectList[index].tasks[taskIndex]
                if (currentTask.checked === false) {
                    currentTask.checked = true;
                }
                else { currentTask.checked = false; }
                updateTasksLi(activeProject)
            })
        })
        clickableDeleteButtons.forEach(button => {
            ////need to find a way to find the project when I click the delete button
            button.addEventListener('click', function (e) {
                if (activeProject === '' || activeProject === undefined) {
                    activeProject = projectList[projectList.length - 1].name
                }
                const result = projectList.filter(item => item.name === activeProject)
                const index = projectList.findIndex(obj => {
                    return obj.name === activeProject
                })
                const taskName = button.previousElementSibling;
                const taskIndex = projectList[index].tasks.findIndex(item => {
                    return item.name === taskName.innerHTML
                })
                console.log(projectList[index].tasks)
                projectList[index].tasks.splice(taskIndex, 1)
                updateTasksLi(activeProject);
            })
        })
    }

    return {
        updateProjectLi: updateProjectLi,
        updateTasksLi: updateTasksLi
    }
}

function listenersFunction() {
    const mainLogicFunc = mainLogic();
    const addTaskButton = document.querySelector('.add-task-button')
    const addTaskForm = document.querySelector('.new-task-form')
    const submitTaskButton = document.querySelector('.submit-task-button')
    const addProjectButton = document.querySelector('.new-project-button')
    const addProjectForm = document.querySelector('.new-project-form')
    const submitProjectButton = document.querySelector('.submit-project-button')
    const sortByDate = document.querySelector('.task-date')
    addTaskButton.addEventListener('click', function (e) {
        taskFormActive = true;
        addTaskForm.style.visibility = 'visible'
        console.log(activeProject)
        if (activeProject === '' || activeProject === undefined) {
            activeProject = projectList[projectList.length - 1].name
        }
    })
    submitTaskButton.addEventListener('click', function (e) {
        e.preventDefault();
        let taskName = document.forms['add-task-form']['task-name'].value
        let taskDesc = document.forms['add-task-form']['task-desc'].value
        let taskPrio = document.forms['add-task-form']['priority'].value
        taskFormActive = false;
        addTaskForm.style.visibility = 'collapse'
        mainLogicFunc.createNewTask(taskName, taskDesc, taskPrio, activeProject)
    })
    addProjectButton.addEventListener('click', function (e) {
        taskFormActive = true;
        addProjectForm.style.visibility = 'visible'
        console.log('add project form activated')
    })
    submitProjectButton.addEventListener('click', function (e) {
        e.preventDefault();
        let projectName = document.forms['add-project-form']['project-name'].value
        if (projectName != '') {
            addProjectForm.style.visibility = 'collapse'
            taskFormActive = false;
            mainLogicFunc.createNewProject(projectName)
            console.log('add project: ' + projectName)
        }
        else {
            return //project name is empty 
        }


    })



}

listenersFunction();