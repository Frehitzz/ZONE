let sessioncount = 0;
let soundPlaying = false; // Add flag to track sound state
let totalTimerSeconds = 0;



function resetAllstyle(){
    const Allmodes = document.querySelectorAll('.pomotime, .shortbreak, .longbreak');
    
    //GO TO EACH DIV 
    Allmodes.forEach(mode => {
        mode.classList.remove('clicked-mode');
    });
}

function progressbar(currentseconds,totalSeconds){
    const progress = (totalSeconds - currentseconds) / totalSeconds * 360;
    const maintTimer = document.querySelector('.main-timer');
    maintTimer.style.setProperty('--progress',`${progress}deg`);
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
    //FOR ANIMATION - Set to 25 minutes for Pomodoro
    changeMinutesWithAnimation("25", "00");

    //RESET THE PROGRESBAR WHEN CLICKED THIS MODE
    progressbar(1500,1500);

    //ADDING BACKGROUND COLOR WHEN CLICKED
    const pomotime = document.querySelector('.pomotime');
    pomotime.classList.add('clicked-mode');
}

function to_shortb(){
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

    //RESET THE PROGRESBAR WHEN CLICKED THIS MODE
    progressbar(300,300);

    const shortb = document.querySelector('.shortbreak');
    shortb.classList.add('clicked-mode');
}

function to_longb(){
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

     //RESET THE PROGRESBAR WHEN CLICKED THIS MODE
    progressbar(900,900);

    const longb = document.querySelector('.longbreak');
    longb.classList.add('clicked-mode');
}

let timerInterval = null; // COUNTDOWN
let isRunning = false; // SET IT TO FALSE BECAUSE THE DEFAULT COUNTDOWN IS NOT RUNNING

function startbutt(){
    // WHEN YOU CLICK AGAIN IT WILL PAUSE THE COUNTDOWN
    if (isRunning) { // CHECK IF THE TIMER IS RUNNING 
        stopsound(); // STOP SOUNDS WHEN PAUSING 
        clearInterval(timerInterval); // STOP THE COUNTDOWN
        isRunning = false; // SET TO FALSE BECAUSE ITS NOT RUNNING RN

        // CHANGE THE BUTTON TO START BUTTON
        const playIcon = document.querySelector('.start-butt i');
        playIcon.style.transition = 'all 0.3s ease-in-out';
        playIcon.className = 'fa-solid fa-play';
        return; // STOP THE FUNCTION
    }
    
    //GETTING THE TIMER DISPLAY ON HTML AND MAKE IT A NUMBER
    const minutes = parseInt(document.getElementById("minutes").textContent);
    const seconds = parseInt(document.getElementById("seconds").textContent);
    
    // GETTING THE SECONDS
    // 60 = IS THE NUMBER OF SECONDS IN 1MINUTE
    let totalSeconds = (minutes * 60) + seconds;
    //totalTimerSeconds = you can see on the top, it tracks total timer duration for prog bar
    totalTimerSeconds = totalSeconds;
    
    // SET TO TRUE, TO START THE COUNTDOWN
    isRunning = true;
    
    // AFTER THE COUNTDOWN IS RUNNING CHANGE THE START BUTTON TO PAUSE
    const playIcon = document.querySelector('.start-butt i');
    playIcon.style.transition = 'all 0.3s ease-in-out';
    playIcon.className = 'fa-solid fa-pause';

    //setInterval() = run code repeatedly
    timerInterval = setInterval(() => {
        totalSeconds--;
        
        //UPDATE PROGRESS BAR
        progressbar(totalSeconds, totalTimerSeconds);

        // CONVERT THE SECONDS TO MINUTES
        const displayMinutes = Math.floor(totalSeconds / 60);

        // GET THE REMAINING AND SET IT TO SECONDS
        const displaySeconds = totalSeconds % 60;
        
        // MAKE THE TIMER HAVE A 2 DIGITS
        // CORRECT: 05:00
        //WRONG: 5:35 
        const formattedMinutes = displayMinutes.toString().padStart(2, '0');
        const formattedSeconds = displaySeconds.toString().padStart(2, '0');
        
        // Update the display
        document.getElementById("minutes").textContent = formattedMinutes;
        document.getElementById("seconds").textContent = formattedSeconds;
        
        // CHECK IF TIMER IS FINISHES
        if (totalSeconds <= 0) {
            // STOP THE COUNTDOWN
            clearInterval(timerInterval);
            isRunning = false;
            
            // CHANGE BUTTON BACK TO PLAY WITH TRANSITION
            playIcon.style.transition = 'all 0.3s ease-in-out';
            playIcon.className = 'fa-solid fa-play';
             
            // Timer finished - play sound first
            playsound();
            
            // Show alert after a brief delay to allow sound to start
            setTimeout(() => {
                alert("Time's up!");
                // Stop sound when user dismisses alert
                stopsound();
                
                // AUTO PROGRESS: IF POMODORO FINISHED GO AUTOMATIC TO SHORT 
                // GET WHO IS THE ACTIVE OF WHO IS HAVE THE .CLICKED-MODE
                const activeMode = document.querySelector('.clicked-mode');

                // IF THE SELECTED MODE IS POMOTIME
                if (activeMode.classList.contains('pomotime')) {
                    sessioncount++; // ADD THE SESSION 
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
            }, 500); // Small delay to let sound start playing
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
        // UPDATE PROGRESS BAR
        progressbar(1500,1500);
    } else if (activeMode.classList.contains('shortbreak')) {
        changeMinutesWithAnimation("05", "00");
        // UPDATE PROGRESS BAR
        progressbar(300, 300);
    } else if (activeMode.classList.contains('longbreak')) {
        changeMinutesWithAnimation("15", "00");
        // UPDATE PROGRESS BAR
        progressbar(900, 900);
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
    
    if (!sound) {
        console.log("Audio element not found!");
        return;
    }
    
    console.log("Attempting to play sound...");
    soundPlaying = true;
    
    // Reset audio to beginning
    sound.currentTime = 0;
    
    // Remove muted attribute and set volume
    sound.muted = false;
    sound.volume = 0.8;
    sound.loop = true; // Loop the sound until manually stopped
    
    // Try to play immediately first
    const playPromise = sound.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("Sound played successfully!");
        }).catch((error) => {
            console.log("Autoplay prevented. Error:", error);
            
            // Create a more aggressive fallback
            const playFallback = () => {
                if (soundPlaying) { // Only play if we still want the sound
                    console.log("Trying fallback sound play...");
                    sound.play().then(() => {
                        console.log("Fallback sound played!");
                    }).catch(() => {
                        console.log("Fallback also failed");
                        // Try one more time with a different approach
                        setTimeout(() => {
                            if (soundPlaying) {
                                sound.play().catch(() => console.log("Final attempt failed"));
                            }
                        }, 100);
                    });
                }
            };
            
            // Add event listeners for user interaction
            document.addEventListener('click', playFallback, { once: true });
            document.addEventListener('keydown', playFallback, { once: true });
            document.addEventListener('touchstart', playFallback, { once: true });
        });
    }
}

function stopsound(){
    const sound = document.getElementById("audio");
    soundPlaying = false;
    
    if (sound) {
        // Pause the sound and reset
        sound.pause();
        sound.currentTime = 0;
        sound.loop = false;
        sound.muted = true;
        
        console.log("Sound stopped and muted");
    } else {
        console.log("Audio element not found");
    }
}