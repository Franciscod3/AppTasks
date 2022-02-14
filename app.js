document.getElementById('formTask').addEventListener('submit', saveTask);

getTask();

function saveTask(e){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    //Creating object called task
    const task = {
        title,
        description
    };

    //If in local storage it doesn't find a key called 'totalTasks' it will create an array called 'totalTasks', push the object 'task' and put it into the parsed localStorage. If it has already found a 'totalTasks' key, it will create a variable with the name 'totalTasks' and save the total tasks parsed to an array of objects, then it will save the Task object in the array and re-introduce the object parsed to JSON to localStorage.

    if (localStorage.getItem('totalTasks') === null) {
        let totalTasks = [];
        totalTasks.push(task);
        localStorage.setItem('totalTasks', JSON.stringify(totalTasks));
    } else {
        let totalTasks = JSON.parse(localStorage.getItem('totalTasks'));
        totalTasks.push(task);
        localStorage.setItem('totalTasks', JSON.stringify(totalTasks));
    }
    
    getTask();

    document.getElementById('formTask').reset();
    //Method that limits the default behavior of the event,it is to prevent the page from being refreshed by default after clicking the Submit button
    e.preventDefault();
}

function getTask() {
    let totalTasks = JSON.parse(localStorage.getItem('totalTasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for(let i = 0; i < totalTasks.length; i++){
        let title = totalTasks[i].title;
        let description = totalTasks[i].description;

        tasksView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <p>${title} - ${description}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')">Delete</a>
            </div>
        </div>`
    };
}

function deleteTask(title) {
    let totalTasks = JSON.parse(localStorage.getItem('totalTasks'));
    for(i = 0; i < totalTasks.length; i++){
        if (totalTasks[i].title == title) {
            totalTasks.splice(i, 1);
        }
    }
    localStorage.setItem('totalTasks',JSON.stringify(totalTasks));
    getTask();
}
    