var todos = [];

const loadFromStorage = () => todos = JSON.parse(localStorage.getItem('todos'));

const updateStorage = () => localStorage.setItem('todos', JSON.stringify(todos));

const getTime = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`
}

const getDate = () => {
    const date = new Date();
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
}

const createToDo = desc => {
    todos.unshift({
        id: Math.random(),
        date: getDate(),
        time: getTime(),
        desc: desc,
        checked: false
    });
    updateStorage();
}

const removeToDo = id => {
    for(let i = 0; i < todos.length; i++)
        if(todos[i].id == Number(id))
            todos.splice(i, 1);
    updateStorage();
    renderHTML();
}

const getHTML = (todo) => {
    return `
        <div class="list-item" data-id="${todo.id}">
            <p class="date">${todo.date} <span>${todo.time}</span></p>
            <p>To Do: ${todo.desc}</p>
            <input type="checkbox" class="check" ${todo.checked ? 'checked' : ''}>
            <button class="del">&#10005;</button>
        </div>
    `
}

const renderHTML = () => {
    let app = document.querySelector('.list');
    app.innerHTML = '';
    if(todos.length == 0)
        app.innerHTML = '<h1>Empty</h1>';
    else
        todos.forEach(todo => app.innerHTML += getHTML(todo));
}

const check = id => {
    for(let i = 0; i < todos.length; i++)
        if(todos[i].id == Number(id))
            todos[i].checked = !todos[i].checked;
    updateStorage();
    renderHTML();
}

const addEvents = () => {
    const dels = document.querySelectorAll('.del');
    const checks = document.querySelectorAll('.check');
    for(let i = 0; i < dels.length; i++){
        dels[i].addEventListener('click', e => {
            removeToDo(e.target.parentElement.getAttribute('data-id'));
            addEvents();
        });
        checks[i].addEventListener('click', e => {
            check(e.target.parentElement.getAttribute('data-id'));
            addEvents();
        })
    }
}

window.onload = () => {
    loadFromStorage();
    renderHTML();
    addEvents();
}

document.querySelector('#add').addEventListener('click', (e) => {
    let todo_input = document.querySelector('#desc'); 
    if(todo_input.value == ''){
        return
    }
    createToDo(todo_input.value);
    todo_input.value = '';
    renderHTML();
    addEvents();
    e.preventDefault();
});