const mycheckb = document.getElementById('checkbox');

function loadSavedtheme(){
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark'){
        mycheckb.checked = true;
        darkmode();
    }else{
        mycheckb.checked = false;
        lightmode();
    }
}

function darkmode() {
    const mybody = document.body;
    const mysun = document.getElementById('sun');
    const mymoon = document.getElementById('moon');
    const mytitle = document.querySelector('.title');

    //* POMODORO TIMER
    const pomotimer = document.querySelector('.pomodoro-timer');
    const timerMinutes = document.getElementById('minutes');
    const timerSeconds = document.getElementById('seconds');
    const minLabel = document.getElementById('minuteLabel');
    const secLabel = document.getElementById('secondLabel');
    const progressbar = document.querySelector('.main-timer');
    const timeDisplay = document.querySelector('.time-display');
    //? TIMER MODE
    const pomo = document.querySelector('.pomotime');
    const shorty = document.querySelector('.shortbreak');
    const longy = document.querySelector('.longbreak');
    
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
    const allControl = document.querySelectorAll('.fa-forward, .fa-play, .fa-stop, .fa-pause');
    allControl.forEach(icon =>{
        icon.style.color = 'rgba(255, 255, 255, 0.62)';
    });
}


function lightmode() {
    const mybody = document.body;
    const mysun = document.getElementById('sun');
    const mymoon = document.getElementById('moon');
    const mytitle = document.querySelector('.title');

    //* POMODORO TIMER
    const pomotimer = document.querySelector('.pomodoro-timer');
    const timerMinutes = document.getElementById('minutes');
    const timerSeconds = document.getElementById('seconds');
    const minLabel = document.getElementById('minuteLabel');
    const secLabel = document.getElementById('secondLabel');
    const progressbar = document.querySelector('.main-timer');
    const timeDisplay = document.querySelector('.time-display');
    //? TIMER MODE
    const pomo = document.querySelector('.pomotime');
    const shorty = document.querySelector('.shortbreak');
    const longy = document.querySelector('.longbreak');
    
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
    const allControl = document.querySelectorAll('.fa-forward, .fa-play, .fa-stop, .fa-pause');
    allControl.forEach(icon =>{
        icon.style.color = 'rgb(255, 255, 255)';
    });
}

mycheckb.addEventListener('change', () => {
    if(mycheckb.checked){
        localStorage.setItem('theme', 'dark');
        darkmode();
    }else{
        localStorage.setItem('theme', 'light');
        lightmode();
    }
});

document.addEventListener('DOMContentLoaded', loadSavedtheme);

loadSavedtheme();




















