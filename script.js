const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const completedTaskList = document.getElementById('completedTaskList');

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.classList.add('complete');
    completeButton.onclick = function() {
        taskList.removeChild(li);
        li.removeChild(deleteButton);
        li.removeChild(completeButton);
        li.classList.add('completed');
        completedTaskList.appendChild(li);
        saveTasks();
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = function() {
        taskList.removeChild(li);
        saveTasks();
    };

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    taskInput.value = '';
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    for (let i = 0; i < taskList.children.length; i++) {
        tasks.push(taskList.children[i].textContent.replace('CompleteDelete', '').trim());
    }

    const completedTasks = [];
    for (let i = 0; i < completedTaskList.children.length; i++) {
        completedTasks.push(completedTaskList.children[i].textContent.trim());
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks'));

    if (tasks) {
        tasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.classList.add('complete');
            completeButton.onclick = function() {
                taskList.removeChild(li);
                li.removeChild(deleteButton);
                li.removeChild(completeButton);
                li.classList.add('completed');
                completedTaskList.appendChild(li);
                saveTasks();
            };

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.onclick = function() {
                taskList.removeChild(li);
                saveTasks();
            };

            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    if (completedTasks) {
        completedTasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;
            li.classList.add('completed');
            completedTaskList.appendChild(li);
        });
    }
}

addTaskButton.onclick = addTask;
loadTasks();
