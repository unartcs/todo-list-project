import Todo from "./todoHandler"
import Projects from "./projectHandler"
import { findIndex } from "lodash"

export default function handleDOM() {
    const allTasksButton = document.querySelector('.all-tasks-button')
    const todayTasksButton = document.querySelector('.today-tasks-button')
    const weekTasksButton = document.querySelector('.week-tasks-button')
    const addProjectButton = document.querySelector('.new-project-button')
    const projectForm = document.querySelector('.new-project-form')
    const projectListDOM = document.querySelector('.navbar-lower-ul')
    const contentBox = document.querySelector('.content-box')
    const projectTitleDOM = document.querySelector('.project-title')
    const addTaskButton = document.querySelector('.add-task-button')
    const taskForm = document.querySelector('.new-task-form')
    const submitTaskButton = document.querySelector('.submit-task-button')
    const taskListDOM = document.querySelector('.task-list')
    let projectButtonPressed = false;
    let projects = new Projects('Default')
    let projectIndex = 0;
    ///Here I will read a clickable DOM that will create a new project
    createExamples()
    addProjectButton.addEventListener('click', function (e) {
        if (projectButtonPressed === false) {
            projectButtonPressed = true;
            projectForm.style.visibility = 'visible';
            addProject();
        }
    })
    function addProject() {
        const submitProjectButton = document.querySelector('.submit-project-button')
        submitProjectButton.addEventListener('click', function (e) {
            e.preventDefault();
            let projectName = document.forms['add-project-form']['project-name'].value
            if (projectName != '') {
                let project = projects.newProject(projectName)
                projectButtonPressed = false
                updateProjectList(project);
            }
        })
    }
    function updateProjectList(project) {
        projectButtonPressed = true
        const projectListLi = document.querySelectorAll('.navbar-lower-ul > li')
        projectListLi.forEach((li => {
            li.remove()
        }))
        projects.allProjects.forEach(project => {
            let proj = document.createElement('li')
            projectListDOM.appendChild(proj).innerHTML = project.name
        })
        //////////The PROBLEM IS HERE//////////////
        ////////This was inside the above foreach and it caused for multiple tasks to be made///
        /////The below doesnt work though I have to make the buttons clickable
        projectListLi.forEach(li => {
            li.addEventListener('click', function (e) {
                ////Change the right side of the page here
                taskForm.style.visibility = 'collapse';
                projectTitleDOM.innerHTML = proj.innerHTML
                console.log(projects.allProjects)
                updateTaskList(project)
                // console.log(project)
            })
        })
    
        // console.log(project.tasks)
        // console.log(projects.getTasks)

        addTaskButton.addEventListener('click', function (e) {
            e.preventDefault();
            taskForm.style.visibility = 'visible';
            let currentProjectName = projectTitleDOM.innerHTML
            let currentProjectObject = projects.getProjectName(currentProjectName)
            projectIndex = projects.allProjects.findIndex(object => {
                return object.name === currentProjectName;
            });
            console.log(projects.allProjects[projectIndex])
            newTask(projects.allProjects[projectIndex]);
        })
        // function taskButtonListener(currentProject) {

        // }
        // projectListLi.forEach((li => {
        //     li.addEventListener('click', function (e) {
        //         console.log('a')
        //     })
        // }))
    }
    function newTask(project) {
        submitTaskButton.addEventListener('click', function (e) {
            console.log(project)
            e.preventDefault();
            addTheTask(project)
        })
        function addTheTask(project) {
            console.log('Adding the task')
            let taskName = document.forms['add-task-form']['task-name'].value
            let taskPriority = document.forms['add-task-form']['priority'].value
            let taskDesc = ''
            let task = new Todo(taskName, taskDesc, taskPriority)
            project.tasks.push(task)
            updateTaskList(project)
        }

    }
    function updateTaskList(project) {
        const tasksLi = document.querySelectorAll('.task-list > li')
        tasksLi.forEach(task => {
            task.remove()
        })
        project.tasks.forEach(item => {
            let taskItem = document.createElement('li')
            taskListDOM.appendChild(taskItem).innerHTML = `${item.title}. priority: ${item.prio}`
            // console.log(project)
        })
    }

    function createExamples() {
        const projectExamples = ['House', 'School', 'Work']
        const todoExamples = {
            'House': ['Do the Dishes', 'Laundry', 'Clean the toilet'],
            'School': ['Do homework', 'Call my teacher'],
            'Work': ['Get to work at 8AM', 'Go to a meeting at 3PM', 'Go to an interview']
        }
        projectExamples.forEach(project => {
            let newProject = projects.newProject(project)
            todoExamples[project].forEach(item => {
                let task = new Todo(item)
                // console.log(newProject)
                newProject.tasks.push(task)
            })
        })
        updateProjectList()
    }
}