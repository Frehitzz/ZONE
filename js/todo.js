let todos = []; // FOR STORING TASKS AND NOTES
let todoIndex = null // TO TRACK WHAT TASK IS BEING EDITED
let completedTodo; // Temporary variable for task being moved to completed state
let completedTodos = [] // Array to store and manage completed tasks

// DISPLAY THE MODAL
function addbutt(){
    const todoModal = document.querySelector('.todo-modal');
    todoModal.style.display = 'flex';

    const deleteBtn = document.querySelector('.delete-button');
    deleteBtn.style.display = "none";
}

function savebutt(){
    //GET THE USER INPUT
    // INPUT CLASS FOR OUR TASK NAME
    const mytodo = document.querySelector('.input-todo');
    // CLASS OF OUR TEXTARE
    const mynotes = document.querySelector('.notes');

    // GETTING USER INPUT TASK NAME
    const usertodo = mytodo.value;
    // GETTING USER NOTES
    const usernote = mynotes.value;

    // IF THE TODOS ARE NOT EMPTY
    if(todoIndex !== null){
        // "task" and "note" are only label
        // THIS CODE IS FOR DISPLAYING THE SELECTED TASK INFO ABOUT NOTES AND TASK
        todos[todoIndex] = {task: usertodo, note: usernote};
        // IF YOU EDIT AND PUT NEW AND CHOOSE CANCEL THE INFO YOU PUT WILL NOT GON SAVE
        todoIndex = null;
    }else{
        // THIS FOR DISPALYING THE NEW TASK 
        todos.push({task: usertodo, note: usernote});
    }

    renderTodos(); // UPDATE THE DISPLAY
    cancelbutt(); //CLOSING THE MODAL AFTER ADDED A TASK

}

function renderTodos(){
    // DIV FOR ADDED TASK
    const displaytodo = document.querySelector('.display-todo');
    displaytodo.innerHTML = "";


    // foreach TO LOOP THROUGH EVERY TODO TASK 
    todos.forEach((item,idx) => {  
    displaytodo.innerHTML += `
        <div class='added-task'>
            <div class='tasksonly'>
                <div class='usertask-container'>
                    <input type='checkbox' class='task-checkb' onclick='doneTask(${idx})'>
                    ${item.task}
                </div>
                <div class='three-dot'>
                    <i class='fa-solid fa-ellipsis-vertical' onclick='editTask(${idx})'></i>
                </div>
            </div>
            
            ${item.note ? `<div class='notes-container2'>${item.note}</div>` : ""}
        </div>
    `;
    // item.task = SHOW THE TASK TEXT
    // item.note = SHOW THE NOTE

    // ${item.note ? `<div class='notes-container2'>${item.note}</div>` : ""}
    // If there’s a note, show it. If not, don’t show anything.

    });      
    

}

function renderCompletedTask(){
    // the div on ouur html wehre we store the compeleted task
    const completeTask = document.querySelector('.task-completed');

    completeTask.innerHTML = "";
    
    /* 
    COMPLETED TODOS ARRAY ON TOP
    - EACH COMPLETED TASK GET ITS OWN INDEX
    - this allows to undoDone(idx) to know exactly whick task
    is to move back on avtive task

    */
    completedTodos.forEach((task, idx) =>{
        completeTask.innerHTML += `
        <div class='complete-task'>
            <div class='complete-only'>
                <div class='complete-task-container'>
                    <input type='checkbox' class='complete-task-checkb' checked onclick='undoDone(${idx})''>
                    <p>${task.task}</p>
                </div>
                <div class='complete-three-dot'>
                    <i class='fa-solid fa-ellipsis-vertical' onclick='editTask(${idx})'></i>
                </div>
            </div>
            
            ${task.note ? `<div class='complete-notes-container2'>${task.note}</div>` : ""}
        </div>`;
    });
}

function editTask(idx) {
    const todoModal = document.querySelector('.todo-modal');
    const mytodo = document.querySelector('.input-todo');
    const mynotes = document.querySelector('.notes');
    const mycheckb = document.querySelector('.checkb');

    //SHOWING THE DELETEBBUTTON WHEN EDITING
    const deleteBtn = document.querySelector('.delete-button');
    deleteBtn.style.display = "block";

    // Fill modal with selected task/note
    mytodo.value = todos[idx].task;
    mynotes.value = todos[idx].note;

    // Show notes textarea if note exists
    if (todos[idx].note) {
        mynotes.style.display = 'block';
        mycheckb.checked = true;
    } else {
        mynotes.style.display = 'none';
        mycheckb.checked = false;
    }

    todoIndex = idx; // Set which task is being edited
    todoModal.style.display = 'flex';

}


// HIDE THE MODAL
function cancelbutt(){
    // HIDING THE MODAL
    const todoModal = document.querySelector('.todo-modal');
    todoModal.style.display = 'none';

    const deleteBtn = document.querySelector('.delete-button');
    deleteBtn.style.display = "none";


    // CLEARING THE INPUT 
    const mytodo = document.querySelector('.input-todo');
    const mynotes = document.querySelector('.notes');
    const mycheckb = document.querySelector('.checkb');

    mytodo.value = "";
    mynotes.value = "";

    // HIDES TEXT AREA AND UNCHECKED THE SLIDER/CHECKB
    mynotes.style.display = 'none';
    mycheckb.checked = false; 

    
}

// TO SHOW TEXTAREA 
function showNotes(){
    const mycheckb = document.querySelector('.checkb');
    const mynotes = document.querySelector('.notes');
    const notesDisplay = getComputedStyle(mynotes).display;

    if(notesDisplay === "none"){
        mynotes.style.display = 'block';
    }else if(notesDisplay === "block"){
        mynotes.style.display = 'none';
        mycheckb.checked = false;
    }

}

function deleteTask(idx){
    todos.splice(idx, 1); // REMOVE 1 ITEM AT A POSITION IDX
    renderTodos(); // DISPLAY THE OR UPDATE THE LIST
    cancelbutt();   // CLOSE THE MODAL AND CLEAR FIELDS
}

function doneTask(idx){
    // GETTING THE EVERY ADDED TASK, THE [IDX] IS TO CHOOSE WHAT THE USER CLICKED 
    // Find the specific task container at position [idx]
    const taskElement = document.querySelectorAll('.added-task')[idx];

    // Get the checkbox inside this specific task container
    const mycheckb = taskElement.querySelector('.task-checkb');
    
    // the div on ouur html wehre we store the compeleted task
    const completeTask = document.querySelector('.task-completed');

    if(mycheckb.checked){

        // CHECKING ANIMATION
        taskElement.classList.add('task-checking');

        setTimeout(() =>{

            taskElement.classList.add('task-disappearing');

            setTimeout(() =>{
        /*
            idx : the position of the array where to start removing items
            1 : how many items to remove.
            [0] : take the removed array and get that first array from
            the item that removed.
        */
            const completedTodo = todos.splice(idx,1)[0];

            // MARK THIS AS COMPLETED
            // means jsut for data tracking
            completedTodo.completed = true;  
            
            // ADD IT TO THE COMPLETED TASK ARRAY
            completedTodos.push(completedTodo);
            // SO THE FLOW IS THIS:
            // todos -> completedTodo -> completedTOdos

            renderCompletedTask();
            renderTodos();

            }, 300); // MATCH WITH THE ANIMATION DURATION

        },100); // TO WAIT THE CHECK ANIAMTION TO COMPELTE
    }
}   

function undoDone(idx){
    const taskToMove = completedTodos[idx];
    
    // IF THE USER CHOOSE THIS OR UNCHECKED
    if(taskToMove){

        // IT REMOVES THE TASK FROM COMPLETED TASK 
        completedTodos.splice(idx,1);

        // THEN PUSH AGAIN IT ON ACTIVE TASK
        todos.push({
            task: taskToMove.task,
            note: taskToMove.note,
            completed: false
        });

        renderCompletedTask();
        renderTodos();

    }
}

function showCompleted() {
    const chevron = document.getElementById('chevron');
    const completedSection = document.querySelector('.task-completed');
    
    if (completedSection.style.display === 'none' || completedSection.style.display === '') {
        completedSection.style.display = 'flex';
        chevron.innerHTML = '▶';
    }else{
        completedSection.style.display = 'none';
        chevron.innerHTML = '▼';
    }
}
