let sessioncount = 0;

function resetAllstyle(){
    const Allmodes = document.querySelectorAll('.pomotime, .shortbreak, .longbreak');
    
    //GO TO EACH DIV 
    Allmodes.forEach(mode => {
        mode.classList.remove('clicked-mode');
    });
    
}

function changeMinutesWithAnimation(newMinutes, newSeconds) {
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    
    // Add fade-out effect
    minutesElement.classList.add('fade-out');
    secondsElement.classList.add('fade-out');
    
    // After fade-out completes, change the text and fade-in
    setTimeout(() => {
        minutesElement.textContent = newMinutes;
        secondsElement.textContent = newSeconds;

        minutesElement.classList.remove('fade-out');
        minutesElement.classList.add('fade-in');

        secondsElement.classList.remove('fade-out');
        secondsElement.classList.add('fade-in');
        
        // Remove fade-in class after animation
        setTimeout(() => {
            minutesElement.classList.remove('fade-in');
            secondsElement.classList.remove('fade-in');
        }, 600);
    }, 450); //transition duration
}

//TYPES OF TIMER
function to_pomo(){
    // Stop any playing sound when switching modes
    stopsound();
    
    // Stop running timer when switch modes
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        
        // Change button icon back to play with smooth transition
        const playIcon = document.querySelector('.start-butt i');
        playIcon.style.transition = 'all 0.3s ease-in-out';
        playIcon.className = 'fa-solid fa-play';
    }
    
    resetAllstyle();
    //FOR ANIMATION
    changeMinutesWithAnimation("25","00");

    //ADDING BACKGROUND COLOR WEHEN CLICKED
    const pomotime = document.querySelector('.pomotime');
    pomotime.classList.add('clicked-mode');
}

function to_shortb(){
    // Stop any playing sound when switching modes
    stopsound();
    
    // Stop running timer when switch modes
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        
        // Change button icon back to play with smooth transition
        const playIcon = document.querySelector('.start-butt i');
        playIcon.style.transition = 'all 0.3s ease-in-out';
        playIcon.className = 'fa-solid fa-play';
    }
    
    resetAllstyle();
    changeMinutesWithAnimation("05", "00");

    const shortb = document.querySelector('.shortbreak');
    shortb.classList.add('clicked-mode');
}

function to_longb(){
    // Stop any playing sound when switching modes
    stopsound();
    
    // Stop running timer when switch modes
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        
        // Change button icon back to play with smooth transition
        const playIcon = document.querySelector('.start-butt i');
        playIcon.style.transition = 'all 0.3s ease-in-out';
        playIcon.className = 'fa-solid fa-play';
    }
    
    resetAllstyle();
    changeMinutesWithAnimation("15", "00");

    const longb = document.querySelector('.longbreak');
    longb.classList.add('clicked-mode');
}

let timerInterval = null; //counter
let isRunning = false; // check if the timer is running 

function startbutt(){
    //for pausing the counter
    if (isRunning) {
        // If timer is running, pause it
        stopsound(); // Stop any playing sound when pausing
        clearInterval(timerInterval);
        isRunning = false;

        // Change button icon back to play with smooth transition
        const playIcon = document.querySelector('.start-butt i');
        playIcon.style.transition = 'all 0.3s ease-in-out';
        playIcon.className = 'fa-solid fa-play';
        return;

    }
    
    //current time from display
    const minutes = parseInt(document.getElementById("minutes").textContent);
    const seconds = parseInt(document.getElementById("seconds").textContent);
    
    // getting the seconds
    let totalSeconds = (minutes * 60) + seconds;
    
    // Start the countdown
    isRunning = true;
    
    // Change button icon to pause with smooth transition
    const playIcon = document.querySelector('.start-butt i');
    playIcon.style.transition = 'all 0.3s ease-in-out';
    playIcon.className = 'fa-solid fa-pause';

    //setInterval() = run code repeatedly
    timerInterval = setInterval(() => {
        totalSeconds--;
        
        // Convert back to minutes and seconds
        const displayMinutes = Math.floor(totalSeconds / 60);
        const displaySeconds = totalSeconds % 60;
        
        // make the minutes and sexonds have 2 digit each 
        const formattedMinutes = displayMinutes.toString().padStart(2, '0');
        const formattedSeconds = displaySeconds.toString().padStart(2, '0');
        
        // Update the display
        document.getElementById("minutes").textContent = formattedMinutes;
        document.getElementById("seconds").textContent = formattedSeconds;
        
        // Check if timer finished
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            // Change button back to play with smooth transition
            playIcon.style.transition = 'all 0.3s ease-in-out';
            playIcon.className = 'fa-solid fa-play';
             
            playsound();
            // Timer finished - you can add notification here
            alert("Time's up!");
            stopsound(); // Stop sound when user clicks OK on alert
            
            // Auto-progress: Pomodoro → Short Break or Long Break
            const activeMode = document.querySelector('.clicked-mode');
            if (activeMode.classList.contains('pomotime')) {
                sessioncount++;
                console.log("Completed Pomodoro sessions:", sessioncount);
                
                // After 4 Pomodoro sessions, go to long break
                if (sessioncount % 4 === 0) {
                    alert("Great job! You've completed 4 Pomodoro sessions. Time for a long break!");
                    setTimeout(() => {
                        to_longb(); // Switch to long break
                        setTimeout(() => {
                            startbutt(); // Auto-start the long break timer
                        }, 500);
                    }, 1000);
                } else {
                    // Less than 4 sessions, go to short break
                    setTimeout(() => {
                        to_shortb(); // Switch to short break
                        setTimeout(() => {
                            startbutt(); // Auto-start the short break timer
                        }, 500);
                    }, 1000);
                }
            } else if (activeMode.classList.contains('shortbreak')) {
                // After short break, go back to Pomodoro
                alert("Short break completed! Ready for next Pomodoro session.");
                setTimeout(() => {
                    to_pomo(); // Switch back to Pomodoro (ready to start)
                }, 1000);
            } else if (activeMode.classList.contains('longbreak')) {
                // After long break, reset session count and go back to Pomodoro
                sessioncount = 0; // Reset the cycle
                alert("Long break completed! Starting fresh Pomodoro cycle.");
                setTimeout(() => {
                    to_pomo(); // Switch back to Pomodoro (ready to start)
                }, 1000);
            }
        }
    }, 1000); // Run every 1 second
}

// Stop button functionality
function stopbutt(){
    // Stop any playing sound
    stopsound();
    
    clearInterval(timerInterval);
    isRunning = false;
    
    // Change button back to play with smooth transition
    const playIcon = document.querySelector('.start-butt i');
    playIcon.style.transition = 'all 0.3s ease-in-out';
    playIcon.className = 'fa-solid fa-play';
    
    // Reset to original time based on active mode
    const activeMode = document.querySelector('.clicked-mode');
    if (activeMode.classList.contains('pomotime')) {
        changeMinutesWithAnimation("25", "00");
    } else if (activeMode.classList.contains('shortbreak')) {
        changeMinutesWithAnimation("05", "00");
    } else if (activeMode.classList.contains('longbreak')) {
        changeMinutesWithAnimation("15", "00");
    }
}

// Skip button functionality
function skipbutt(){
    // Stop any playing sound first
    stopsound();
    
    if (isRunning) {
        // Stop current timer
        clearInterval(timerInterval);
        isRunning = false;
        
        // Change button back to play with smooth transition
        const playIcon = document.querySelector('.start-butt i');
        playIcon.style.transition = 'all 0.3s ease-in-out';
        playIcon.className = 'fa-solid fa-play';
        
        // Check current mode and skip to next
        const activeMode = document.querySelector('.clicked-mode');
        if (activeMode.classList.contains('pomotime')) {
            sessioncount++;
            console.log("Skipped Pomodoro sessions:", sessioncount);
            
            // After 4 Pomodoro sessions (including skipped), go to long break
            if (sessioncount % 4 === 0) {
                alert("Pomodoro skipped! You've completed 4 sessions - starting long break...");
                setTimeout(() => {
                    to_longb(); // Switch to long break
                    setTimeout(() => {
                        startbutt(); // Auto-start the long break timer
                    }, 500);
                }, 1000);
            } else {
                // Less than 4 sessions, go to short break
                alert("Pomodoro skipped! Starting short break...");
                setTimeout(() => {
                    to_shortb(); // Switch to short break
                    setTimeout(() => {
                        startbutt(); // Auto-start the short break timer
                    }, 500);
                }, 1000);
            }
        } else if (activeMode.classList.contains('shortbreak')) {
            // Skip Short Break → go back to Pomodoro
            alert("Short break skipped! Ready for next Pomodoro session.");
            setTimeout(() => {
                to_pomo(); // Switch back to Pomodoro
            }, 1000);
        } else if (activeMode.classList.contains('longbreak')) {
            // Skip Long Break → reset session count and go back to Pomodoro  
            sessioncount = 0; // Reset the cycle
            alert("Long break skipped! Starting fresh Pomodoro cycle.");
            setTimeout(() => {
                to_pomo(); // Switch back to Pomodoro
            }, 1000);
        }
    } else {
        // If timer not running, just show current time remaining
        alert("Timer is not running. Click start to begin countdown.");
    }
}

function playsound(){
    const sound = document.getElementById("audio");
    
    // Reset audio to beginning
    sound.currentTime = 0;
    
    // Remove muted attribute and set volume
    sound.muted = false;
    sound.volume = 0.5; // Set volume to 50%
    
    // Play the sound with error handling
    sound.play().then(() => {
        console.log("Sound played successfully");
    }).catch((error) => {
        console.log("Error playing sound:", error);
        // Fallback: try to play after user interaction
        document.addEventListener('click', function playOnClick() {
            sound.play();
            document.removeEventListener('click', playOnClick);
        });
    });
}

function stopsound(){
    const sound = document.getElementById("audio");
    
    // Make sure sound exists
    if (sound) {
        // Pause the sound and reset to beginning
        sound.pause();
        sound.currentTime = 0;
        sound.muted = true; // Also mute it to be extra sure
        
        console.log("Sound stopped and muted");
    } else {
        console.log("Audio element not found");
    }
}