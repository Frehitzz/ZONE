let todos = []; // FOR STORING TASKS AND NOTES
let todoIndex = null // TO TRACK WHAT TASK IS BEING EDITED


// DISPLAY THE MODAL
function addbutt(){
    const todoModal = document.querySelector('.todo-modal');

    todoModal.style.display = 'flex';
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
                    <input type='checkbox' class='task-checkb'>
                    ${item.task}
                </div>
                <div class='three-dot'>
                    <i class='fa-solid fa-ellipsis-vertical' onclick='editTask(${idx})'></i>
                </div>
            </div>
            <div class='notes-container2'>${item.note}</div>
        </div>
    `;
    // item.task = SHOW THE TASK TEXT
    // item.note = SHOW THE NOTE
    });             

}

function editTask(idx) {
    const todoModal = document.querySelector('.todo-modal');
    const mytodo = document.querySelector('.input-todo');
    const mynotes = document.querySelector('.notes');
    const mycheckb = document.querySelector('.checkb');

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


     