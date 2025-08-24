const mysession = Number(localStorage.getItem('sessioncount')) || 0;

//* USES A DOMCONTENT LOADED TO PERFECTLY DISPLAY THE MONTH
document.addEventListener('DOMContentLoaded', function(){

    //* TO GET THE CURRENT DAY  BUT THIS IS FOR ADDING A STYLE ON THE CURRENT DAY
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear =today.getFullYear();


    //* THE CLASS WHERE WE STORE THE MONTH ON HTML
    const displayMonth = document.querySelector('.display-month');

    //* CONTAINER FOR CALENDAR
    const calendarDiv = document.querySelector('.calendar');

    //* SET A DATE
    const mydate = new Date();

    //* CREATE AN ARRAY FOR ALL OF THE MONTHS IN ONE YEAR
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    //* CHANGE THE DISPLAY USING TEXTCONTENT
    //* STORE THE MYDATE.GETMONTH ON THE ARRAY OF MONTHS ON 1 YEAR
    displayMonth.textContent = months[mydate.getMonth()];

    function getSessionClass(session) {
    if (session >= 8) {
        return 'date-today-8';
    } else if (session >= 7) {
        return 'date-today-7';
    } else if (session >= 6) {
        return 'date-today-6';
    } else if (session >= 5) {
        return 'date-today-5';
    } else if (session >= 4) {
        return 'date-today-4';
    } else if (session >= 3) {
        return 'date-today-3';
    } else if (session >= 2) {
        return 'date-today-2';
    } else if (session >= 1) {
        return 'date-today-1';
    } else {
        return 'date-today'; // no session
    }
}

    function getSessionBgColor(session) {
    if (session >= 8) {
        return '#01eeff';
    } else if (session >= 7) {
        return '#23d3ffe0';
    } else if (session >= 6) {       
        return '#23d3ffc0';
    } else if (session >= 5) {
        return '#23d3ffa0';
    } else if (session >= 4) {
        return '#23d3ff80';
    } else if (session >= 3) {
        return '#23d3ff60';
    } else if (session >= 2) {
        return '#23d3ff40';
    } else if (session >= 1) {
        return '#23d3ff20';
    } else {
        return ''; // No background
    }
}     


    function myCalendar(year, month){
        //* GET THE DAY OF THE WEEK FOR THE 1ST OF THE MONTH
        //* O-SNUDAY, 6-SATURDAY
        //! find out which day of the week the 1st day of any month is.
        const firstDay = new Date(year, month, 1).getDay();

        //* GET THE TOTAL NUMBER OF DAYS IN THE CURRENT MONTH
        //?? MONTH + 1, MOVES THE INDEX AT 1 SO THE FIRST MONTH IS JJANUARY MOVES
        //?? AT INDEX 1 SO IT CAN SHOW THE EXACT NUMBERS OF MONTHS
        //?? WITHOUT MONTH + 1 = JANUARY INDEX 0
        //?? WITH MONTH + 1 = JANARY INDEX 1
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        //* STORE THE TABLE,THEAD AND TR ON calendarHTML
        let calendarHTML = '<table class="calendar-table"><thead><tr>';

        //* daysOfWeek is an array and have a value of every days of week
        const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        //* PUT EACH DAYS OF WEEK ON <TH> 
        //? WHY WE USE 'LET DAY OF DAYSOFWEEK'
        //? DAY = A SINGE VALUE FROM THAT ARRAY(daysOfWeek) EACH TIME THE LOOP RUNS
        for (let day of daysOfWeek) {
            calendarHTML += `<th>${day}</th>`;
        }

        //? AFTER THE LOOP IT CLOSES THE /tr,/thead and
        //? start using tbody and tr, first row for displaying dates
        calendarHTML += '</tr></thead><tbody><tr>';

        //* Empty cells before the first day
        for (let i = 0; i < firstDay; i++) {
            //? DISPLAY EMPTY 
            calendarHTML += '<td></td>';
        }

        //* DISPLAY THE DAYS
        /*
        ? day=1 - start the day as 1.

        ?day <=daysInMonth - make sure the day will not exceed
        ? -> of the totalNUm of days in current month.

        ? day++ just add the days until it reach the total NUm of days

        */ 
        for (let day = 1; day <= daysInMonth; day++) {
            //* CHECKS IF WE NEED TO START A NEW ROW ON TABLE
            /*
            ? (firstDay + day - 1): put a date number on calendar
            ? (% 7 === 0): start of a new week every 7 cells
            ? (day !== 1): prevents closing and opening a row before the first day
            */ 
            if ((firstDay + day - 1) % 7 === 0 && day !== 1) {

                //? </tr> = CLOSE THE ROW FOR THE EMPTY CELLS BEFORE THE 1ST DAY
                calendarHTML += '</tr><tr>';
            }

            // Get this cell's date key
            const cellDate = new Date(year, month, day);
            const cellKey = getDateKey(cellDate);

            // Always get session count for this date from localStorage
            let session = Number(localStorage.getItem('session-' + cellKey)) || 0;
            let tdClass = '';
            let tdId = '';

            // If this is today, use current sessioncount
            let isToday = (day === todayDate && month === todayMonth && year === todayYear);
            if (isToday) {
                session = Number(localStorage.getItem('sessioncount')) || 0;
                tdId = ' id="today-cell"';
            }

            tdClass = getSessionClass(session);

            calendarHTML += `<td${tdClass ? ` class="${tdClass}"` : ''}${tdId}><div>${day}</div></td>`;
        }

        //* Empty cells after the last day
        //* CALCULATE WHICH DAY OF THE WEEK the last date of the month falls on
        //? firstday: is the weekday index of the 1st day the 0=sunday 6=saturday
        //? daysInMOnth: is the total number  of days in the month
        //? if you add them: it gives the position after the last date: %7 make it to a weekday(0-6)
        //! IN SUMMARRY: CHECKS IF THE LAST WEEK OF THE MONTH IS "INCOMPLETE"
        //! IF THERE ARE INCOMPLETE:
        //! calendarHTML += '<td></td>';
        //! IT ADDS EMPTY EMPTY CELLS
        const lastDay = (firstDay + daysInMonth) % 7;

        //? checks if the last day of the month is not saturday which means the row is not complt
        if (lastDay !== 0) {

            //? ADD EMPTY CELLS TO FILL THE REST OF THE LAST ROW
            for (let i = lastDay; i < 7; i++) {
                calendarHTML += '<td></td>';
            }
        }

        //* close the table and its remaining open element
        calendarHTML += '</tr></tbody></table>';

        //* used a return to let this calendarHTML used outide of theh function
        return calendarHTML;
    }

    //* Insert the calendar below the month nam 
    calendarDiv.innerHTML = `<h1 class="display-month">${months[mydate.getMonth()]}</h1>` +
        myCalendar(mydate.getFullYear(), mydate.getMonth());

    // Helper to get date string in YYYY-MM-DD
    function getDateKey(dateObj) {
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, '0');
        const d = String(dateObj.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    // On load, check if sessioncount is for today, else reset only the global sessioncount
    const todayKey = getDateKey(today);
    const lastSessionDate = localStorage.getItem('last-session-date');
    if (lastSessionDate !== todayKey) {
        // Before resetting, save yesterday's sessioncount to its date key
        if (lastSessionDate) {
            const prevSession = Number(localStorage.getItem('sessioncount')) || 0;
            localStorage.setItem('session-' + lastSessionDate, prevSession);
            localStorage.setItem('bgcolor-' + lastSessionDate, getSessionBgColor(prevSession));
        }
        // New day: reset sessioncount for today
        localStorage.setItem('sessioncount', 0);
        localStorage.setItem('last-session-date', todayKey);
    }

    // Function to update today's cell class and save session/bgcolor for today
    function updateTodayCellClass() {
        const session = Number(localStorage.getItem('sessioncount')) || 0;
        const todayCell = document.getElementById('today-cell');
        if (todayCell) {
            todayCell.className = getSessionClass(session);
            // Store the session/bgcolor for today (per-date)
            const bgColor = getSessionBgColor(session);
            localStorage.setItem('session-' + todayKey, session);
            localStorage.setItem('bgcolor-' + todayKey, bgColor);
            // Apply the background color directly (for immediate effect)
            const div = todayCell.querySelector('div');
            if (div) {
                div.style.background = bgColor;
            }
        }
    }

    // After rendering, apply background color for all cells based on localStorage
    function applyBgColorsToCalendar() {
        const table = document.querySelector('.calendar-table');
        if (!table) return;
        // Loop through all days in this month
        const year = mydate.getFullYear();
        const month = mydate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const cellDate = new Date(year, month, day);
            const cellKey = getDateKey(cellDate);
            const bgColor = localStorage.getItem('bgcolor-' + cellKey);
            // Find the cell for this day (skip today, already handled)
            if (!(day === todayDate && month === todayMonth && year === todayYear)) {
                // Find the cell by text content
                const tdList = table.querySelectorAll('td');
                tdList.forEach(td => {
                    if (td.textContent.trim() == day) {
                        const div = td.querySelector('div');
                        if (div && bgColor) {
                            div.style.background = bgColor;
                        }
                    }
                });
            }
        }
    }

    // Function to reset session count for a new day
    function resetSessionCountIfNewDay() {
        const todayKey = getDateKey(new Date());
        const lastSessionDate = localStorage.getItem('last-session-date');
        if (lastSessionDate !== todayKey) {
            // New day: reset sessioncount for today
            localStorage.setItem('sessioncount', 0);
            localStorage.setItem('last-session-date', todayKey);
        }
    }

    // Listen for storage changes (from other tabs/windows)
    window.addEventListener('storage', function(e) {
        if (e.key === 'sessioncount') {
            updateTodayCellClass();
            applyBgColorsToCalendar();
        }
    });

    // Override localStorage.setItem to dispatch a custom event for sessioncount changes
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        if (key === 'sessioncount') {
            // Also update the per-date session key for today
            const todayKey = getDateKey(new Date());
            originalSetItem.call(this, 'session-' + todayKey, value);
            originalSetItem.call(this, 'bgcolor-' + todayKey, getSessionBgColor(Number(value)));
            window.dispatchEvent(new Event('sessioncount-changed'));
        }
    };

    // Listen for custom event in this tab
    window.addEventListener('sessioncount-changed', function() {
        updateTodayCellClass();
        applyBgColorsToCalendar();
    });

    // Optionally, if sessioncount can change in this tab, observe it and update
    // You can call updateTodayCellClass() after changing sessioncount elsewhere in your code

    // On first load, update today's cell class and save today's session/bgcolor
    updateTodayCellClass();
    applyBgColorsToCalendar();

});


