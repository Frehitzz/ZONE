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

    //GET THE DIV ON HTML WHERE WE GON DISPLAY THE TASK
    const displaytodo = document.querySelector('.display-todo');
    //DISPLAYING THE TASK ON HTML
    displaytodo.innerHTML += "<div class='added-task'>" + usertodo + mynotes + "</div>";

    // AFTER SAVING THE INPUT WILL BE CLEAR
    mytodo.value = "";

    //CLOSING THE MODAL AFTER ADDED A TASK
    cancelbutt();
}

// HIDE THE MODAL
function cancelbutt(){
    const todoModal = document.querySelector('.todo-modal');
    todoModal.style.display = 'none';
}

// TO SHOW TEXTAREA 
function showNotes(){
    const mynotes = document.querySelector('.notes');
    const notesDisplay = getComputedStyle(mynotes).display;

    if(notesDisplay === "none"){
        mynotes.style.display = 'block';
    }else{
        mynotes.style.display = 'none';
    }
    
}