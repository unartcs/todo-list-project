import Todo from "./todoHandler"
import Project from "./projectHandler"

export default function handleDOM() {
    const todoArray = []
    const projectArray = []
    const formDOM = document.querySelector('.add_todo_form')
    const formAddButton = document.querySelector('.add_todo_form > .submit-button')
    const projectAddButton = document.querySelector('.add_todo_form > .add-project-button')
    const todoList = document.querySelector('.todo-list')
    reteriveProjectList()
    formAddButton.addEventListener('click', function (e) {
        let title = document.forms['add_todo_form']['title'].value
        let desc = document.forms['add_todo_form']['desc'].value
        let prio = document.forms['add_todo_form']['priority'].value
        let projectName = document.forms['add_todo_form']['projects'].value
        if (title != '') {
            e.preventDefault();
            const newTodo = new Todo(title, desc, prio, projectName)
            const newProject = new Project(projectName)
            todoArray.push(newTodo)
            updateTodoList()
        }

    })
    projectAddButton.addEventListener('click', function (e) {
        const project = prompt('Enter Project Name: ')
        projectArray.push(project)
        reteriveProjectList()

    })


    function updateTodoList() {
        const todoArrayLi = document.querySelectorAll('.todo-list > li')
        todoArrayLi.forEach((todo => {
            todo.remove();
        }))
        todoArray.forEach((todoItem, index) => {
            let title = document.createElement('li')
            title.classList.add(`todo-${index}`)
            let desc = document.createElement('p')
            let prio = document.createElement('h1')
            let deleteButton = document.createElement('button')
            let todoDOM = todoList.appendChild(title)
            todoDOM.innerHTML = todoItem.title
            todoDOM.appendChild(desc).innerHTML = todoItem.desc
            todoDOM.appendChild(prio).innerHTML = todoItem.prio
            todoDOM.appendChild(deleteButton).innerHTML = 'Delete'
            console.log(todoItem)
        })
        console.log(todoArray)
        const deleteButton = document.querySelectorAll('button')

        deleteButton.forEach(button => {
            button.addEventListener('click', function (e) {
                if (button.innerHTML === 'Delete') {
                    console.log(e)
                    let buttonParent = button.parentElement
                    buttonParent.remove();
                    console.log(buttonParent.classList.value)
                    let index = buttonParent.classList.value.replace('todo-','')
                    todoArray.splice(index,1)
                }
            })
        })

    }
    function reteriveProjectList() {
        const projectListDOM = document.getElementById('projects')
        const projectArrayList = document.querySelectorAll('#projects > option')
        //Creating default project
        let defaultProject = document.createElement('option')
        projectListDOM.appendChild(defaultProject).innerHTML = 'default';
        defaultProject.value = 'default'
        projectArrayList.forEach((project => {
            project.remove();
        }))
        projectArray.forEach(project => {
            let name = document.createElement('option')
            projectListDOM.appendChild(name).innerHTML = project;
            name.value = project
        })
    }

}

