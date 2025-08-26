// Global DOM element references to reduce repetition
const mycheckb = document.getElementById('checkbox');
const mybody = document.body;
const mysun = document.getElementById('sun');
const mymoon = document.getElementById('moon');
const mytitle = document.querySelector('.title');

// POMODORO TIMER elements
const pomotimer = document.querySelector('.pomodoro-timer');
const timerMinutes = document.getElementById('minutes');
const timerSeconds = document.getElementById('seconds');
const minLabel = document.getElementById('minuteLabel');
const secLabel = document.getElementById('secondLabel');
const progressbar = document.querySelector('.main-timer');
const timeDisplay = document.querySelector('.time-display');

// TIMER MODES
const pomo = document.querySelector('.pomotime');
const shorty = document.querySelector('.shortbreak');
const longy = document.querySelector('.longbreak');

// TIMER CONTROL BUTTONS - get them once and reuse
const allControl = document.querySelectorAll('.fa-forward, .fa-play, .fa-stop, .fa-pause');

//* TODO LIST
const todoContainer = document.querySelector('.todo-container');
const todoTop = document.querySelector('.todo-top');
const taskAdded = document.querySelectorAll('.added-task');

//* CALENDAR
const calendarContainer = document.querySelector('.calendar');




//* this check localstorage on page load and apply the chosen theme
function loadSavedtheme(){
    //? calling key and save it to another var
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark'){
        //? apply dark mode without triggering eventlisteer       
        mycheckb.checked = true;
        darkmode();
    }else{
        //? apply lightmode
        mycheckb.checked = false;
        lightmode();
    }
}

//* for darkmode color
function darkmode() {
    mysun.className = 'fa-regular fa-sun';
    mymoon.className = 'fa-solid fa-moon';

    //*SUN AND MOON LOGO CHANGE TO WHITE
    mysun.style.color = 'white';
    mymoon.style.color = 'white';

    //* ZONE LOGO
    mytitle.style.color = 'white';

    //* SWTICH TO DARKMODE
    mybody.classList.remove("lightmode");
    mybody.classList.add("darkmode");

    //* POMODORO TIMER
    pomotimer.style.border = '2px solid rgba(255, 255, 255, 0.1)';
    //? TIMER NUM
    timerMinutes.style.color = 'black';
    timerSeconds.style.color = 'black';
    //? lABEL
    minLabel.style.color = 'black';
    secLabel.style.color = 'black';

    progressbar.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    progressbar.style.backgroundColor =  'black';

    timeDisplay.style.backgroundColor = 'black';
    timeDisplay.style.border = '2px solid rgb(106, 134, 255)';

    pomo.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    shorty.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    longy.style.border = '1px solid rgba(255, 255, 255, 0.1)';

    pomo.style.color = 'rgba(255, 255, 255, 0.62)';
    shorty.style.color = 'rgba(255, 255, 255, 0.62)';
    longy.style.color = 'rgba(255, 255, 255, 0.62)';

    //* TIMER CONTROL BUTTONS
    allControl.forEach(icon =>{
        icon.style.color = 'rgba(255, 255, 255, 0.62)';
    });

    //* TODO LIST
    todoContainer.style.border = '2px solid rgba(255, 255, 255, 0.1)';
    todoContainer.style.backgroundColor = 'transparent';
    
    //? TASKS
    document.querySelectorAll('.added-task').forEach(mytask => {
        mytask.style.border = '2px solid rgba(255, 255, 255, 0.1)';
        mytask.style.backgroundColor = 'transparent';
        mytask.style.color = 'white';
    });

    //? NOTES
    document.querySelectorAll('.notes-container2').forEach(mynotes =>{
        mynotes.style.backgroundColor = 'rgba(255, 255, 255, 0.29)';
        mynotes.style.border = '3px solid rgba(255, 255, 255, 0.1)';
        mynotes.style.color = 'white'
    });

    //* CALENDAR
    calendarContainer.style.backgroundColor = 'transparent';
    calendarContainer.style.border = '2px solid rgba(255, 255, 255, 0.1)';
    
    const sessionCount = document.querySelector('.session-counter');
    if (sessionCount) sessionCount.style.backgroundColor = 'transparent';
    if (sessionCount) sessionCount.style.border = '2px solid rgba(255, 255, 255, 0.1)';
    if (sessionCount) sessionCount.style.color = 'white';

    const todayh1 = document.querySelector('.session-counter h1');
    if (todayh1) todayh1.style.color = 'lightgray';


}

//* for lightmode color
function lightmode() {
    //* SUN AND MOON LOGO
    mysun.className = 'fa-solid fa-sun';
    mymoon.className = 'fa-regular fa-moon';

    //*SUN AND MOON LOGO CHANGE TO BLACK
    mysun.style.color = 'black';
    mymoon.style.color = 'black';

    mytitle.style.color = 'black';

    //* SWITCH TO LIGHTMODE
    mybody.classList.remove("darkmode");
    mybody.classList.add("lightmode");

    //*POMODORO TIMER
    pomotimer.style.border = '';

    //* TIMER NUM
    timerMinutes.style.color = '';
    timerSeconds.style.color = '';

    //* lABEL
    minLabel.style.color = '';
    secLabel.style.color = '';

    progressbar.style.border = '';
    progressbar.style.backgroundColor =  '';
    timeDisplay.style.backgroundColor = '';
    timeDisplay.style.border = '';

    pomo.style.border = '';
    shorty.style.border = '';
    longy.style.border = '';

    pomo.style.color = '';
    shorty.style.color = '';
    longy.style.color = '';

    //* TIMER CONTROL BUTTONS
    allControl.forEach(icon =>{
        icon.style.color = 'rgb(255, 255, 255)';
    });

    //* TODO LIST
    todoContainer.style.border = '';
    todoContainer.style.backgroundColor = '';

    //? TASKS
    document.querySelectorAll('.added-task').forEach(mytask => {
        mytask.style.border = '';
        mytask.style.backgroundColor = '';
        mytask.style.color = '';
    });

    //? NOTES
    document.querySelectorAll('.notes-container2').forEach(mynotes =>{
        mynotes.style.backgroundColor = '';
        mynotes.style.border = '';
        mynotes.style.color = ''
    });

    //* CALENDAR
    calendarContainer.style.backgroundColor = '';
    calendarContainer.style.border = '';

    const sessionCount = document.querySelector('.session-counter');
    if (sessionCount) sessionCount.style.backgroundColor = '';
    if (sessionCount) sessionCount.style.border = '';
    if (sessionCount) sessionCount.style.color = '';
    
    const todayh1 = document.querySelector('.session-counter h1');
    if (todayh1) todayh1.style.color = '';


}

mycheckb.addEventListener('change', () => {
    if(mycheckb.checked){
        //* 'theme' is the key.
        localStorage.setItem('theme', 'dark');
        darkmode();
    }else{
        localStorage.setItem('theme', 'light');
        lightmode();
    }
});

//* load saved theme when the page reloads
document.addEventListener('DOMContentLoaded', loadSavedtheme);
//* call immediately when the script rnus after domcntnload
loadSavedtheme();




















