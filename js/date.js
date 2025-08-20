//* USES A DOMCONTENT LOADED TO PERFECTLY DISPLAY THE MONTH
document.addEventListener('DOMContentLoaded', function(){

    //* THE CLASS WHERE WE STORE THE MONTH ON HTML
    const displayMonth = document.querySelector('.display-month');

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
        //? start using tbody and first row for displaying dates
        calendarHTML += '</tr></thead><tbody><tr>';

        //* Empty cells before the first day
        for (let i = 0; i < firstDay; i++) {
            //? DISPLAY EMPTY 
            calendarHTML += '<td></td>';
        }

        // Fill in the days
        for (let day = 1; day <= daysInMonth; day++) {
            if ((firstDay + day - 1) % 7 === 0 && day !== 1) {
                calendarHTML += '</tr><tr>';
            }
            calendarHTML += `<td>${day}</td>`;
        }

        // Empty cells after the last day
        const lastDay = (firstDay + daysInMonth) % 7;
        if (lastDay !== 0) {
            for (let i = lastDay; i < 7; i++) {
                calendarHTML += '<td></td>';
            }
        }

        calendarHTML += '</tr></tbody></table>';
        return calendarHTML;
    }

    // Insert the calendar below the month name
    calendarDiv.innerHTML = `<h1 class="display-month">${months[mydate.getMonth()]}</h1>` +
    myCalendar(mydate.getFullYear(), mydate.getMonth());
    
});
