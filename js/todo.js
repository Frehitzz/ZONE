let todos = []; // FOR STORING TASKS AND NOTES
let todoIndex = null // TO TRACK WHAT TASK IS BEING EDITED
let completedTodo = [];

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
    const mycheckb = document.querySelector('.task-checkb');
    const completeTask = document.querySelector('.task-completed');
    const chevron = document.querySelector('.chevron');

    if(mycheckb.checked){
        // MOVE THE TASK TO THE COMPLETED TASKS ARRAY
        const completedTodo = todos.splice(idx,1)[0];

        completeTask.innerHTML += `
        <div class='complete-task'>
            <div class='complete-only'>
                <div class='complete-task-container'>
                    <input type='checkbox' class='complete-task-checkb' onclick='doneTask(${idx})'>
                    ${completedTodo.task}
                </div>
                <div class='complete-three-dot'>
                    <i class='fa-solid fa-ellipsis-vertical' onclick='editTask(${idx})'></i>
                </div>
            </div>
            
            ${completedTodo.note ? `<div class='complete-notes-container2'>${completedTodo.note}</div>` : ""}
        </div>`;
    }

    renderTodos();
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
