//находим элементы на странице
const form = document.querySelector('#form');
const input = document.querySelector('#taskInput');
const btn = document.querySelector('.btn');
const list = document.querySelector('.list-group-item')
const taskList = document.querySelector('#taskList');
const empty = document.querySelector('#empty');

let tasks = [];

const datenow = new Date();
let options = {
    month: 'long',
    day: 'numeric',
}

const num = datenow.toLocaleString('ru-RU', options)

date.innerText = 'Мой день, ' + `${num}`

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach(function(task) {
    //формируем cssClass
    const cssClass = task.done ? 'list-group-item done-style': 'list-group-item';


    //формируем разметку для новой задачи
    const taskHTML = `
    <li id="${task.id}" class="${cssClass}" id="">
    <div class="item-group">
    <input type="checkbox" data-action="done" class="done">
    </input>
    <span class="task-title">
    ${task.text}
    </span>
    </div>
    <button type="button" data-action="delete" class="delete">
    <i class="bi bi-x" id="arrow"></i>
    </button>
    </li> `;

    //добавляем задачу на страницу
    taskList.insertAdjacentHTML('beforeend', taskHTML)
})

checkEmptyList ()


form.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', doneTask);


function addTask (event) {
    //отменяем отправку формы
    event.preventDefault();

    //вытаскиваем текст
    const taskText = input.value;

    //описываем задачу в виде объекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    //добавляем задачу в массив с задачей
    tasks.push(newTask);
    saveToLocalStorage()

    //формируем cssClass
    const cssClass = newTask.done ? 'list-group-item done-style': 'list-group-item';


    //формируем разметку для новой задачи
    const taskHTML = `
    <li id="${newTask.id}" class="${cssClass}" id="">
    <div class="item-group">
    <input type="checkbox" data-action="done" class="done">
    </input>
    <span class="task-title">
    ${newTask.text}
    </span>
    </div>
    <button type="button" data-action="delete" class="delete">
    <i class="bi bi-x" id="arrow"></i>
    </button>
    </li> `;

    //добавляем задачу на страницу
    taskList.insertAdjacentHTML('beforeend', taskHTML)
    //очищаем поле ваода
    input.value = ''
    //сохраняем фокус
    input.focus()

    checkEmptyList ()
}


function deleteTask (event) {
    if (event.target.dataset.action === 'delete') {


        const pareNode = event.target.closest('.list-group-item')

        const id = Number(pareNode.id);

        //находим индекс задачи в массиве
        const index = tasks.findIndex(function(task) {
            if (task.id === id) {
                return true
            }
        })
        //удаляем элемент из массива с задачей
        tasks.splice(index,
            1)

        pareNode.style.transition = '0.2s'

        saveToLocalStorage()
        pareNode.remove()
    }
    checkEmptyList ()
}

function doneTask (event) {
    if (event.target.dataset.action === 'done') {

        const pareNode = event.target.closest('.list-group-item')


        //определяем id задачи
        const id = Number (pareNode.id);

        const task = tasks.find(function(task) {
            if (task.id === id) {
                return true
            }
        })

        task.done = !task.done
        saveToLocalStorage()

        pareNode.classList.toggle('done-style')
        pareNode.style.transition = '0.2s'
    }
}


function checkEmptyList () {
    if (tasks.length === 0) {
        const emptyListHTML = `<li class="list-group-item" id="empty">
        <span class="description"> Список дел пуст </h3>
        </li>`;
        taskList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#empty')
        emptyListEl ? emptyListEl.remove(): null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
