// DISPLAY THE MODAL
function addbutt(){
    const todoModal = document.querySelector('.todo-modal');

    todoModal.style.display = 'flex';
}

function savebutt(){
    //GET THE USER INPUT
    const mytodo = document.querySelector('.input-todo');
    const mynotes = document.querySelector('.notes');

    const usertodo = mytodo.value;
    const usernote = mynotes.value;

    Userinput(usertodo, usernote);

    //CLOSING THE MODAL AFTER ADDED A TASK
    cancelbutt();

}

function Userinput(task, note){
    //GET THE DIV ON HTML WHERE WE GON DISPLAY THE TASK
    const displaytodo = document.querySelector('.display-todo');
    //DISPLAYING THE TASK ON HTML
    displaytodo.innerHTML += "<div class='added-task'>" + "<div class='tasksonly'>" + "<div class='usertask-container'>" + "<input type='checkbox' class='task-checkb'>" + task + "</div>" + "<div class='three-dot'>" + "<i class='fa-solid fa-ellipsis-vertical' onclick='editTask()'></i>" + "</div>" + "</div>" + "<div class='notes-container'>"+ note + "</div>" + "</div>";
    // AFTER SAVING THE INPUT WILL BE CLEAR
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

function editTask(){
    addbutt();


    
}
     