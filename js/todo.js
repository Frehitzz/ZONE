function addbutt(){
    const todoModal = document.querySelector('.todo-modal');

    todoModal.style.display = 'flex';
}

function cancelbutt(){
    const todoModal = document.querySelector('.todo-modal');
    todoModal.style.display = 'none';
}

function showNotes(){
    const mynotes = document.querySelector('.notes');
    const notesDisplay = getComputedStyle(mynotes).display;

    if(notesDisplay === "none"){
        mynotes.style.display = 'block';
    }else{
        mynotes.style.display = 'none';
    }
    
}