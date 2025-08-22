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

            //* COMPARING IF THE DATE DAY AND YEAR IS SAME AS THE today var on top
            let isToday = (day === todayDate && month === todayMonth && year === todayYear);
            let tdClass = '';

            if(isToday){
                if(mysession >= 4){
                    tdClass = 'date-today-high';
                }else if (mysession >= 2){
                    tdClass = 'date-today-mid';
                }else if (mysession >= 1){
                    tdClass = 'date-today-low';
                }else{
                    tdClass = 'date-today';
                }
            }
            /*
            ? add the day number on table cell
            
            ? If isToday is true (meaning the cell represents today’s date),
            ? the code adds class="date-today" to the <td> element; otherwise, 
            ? it leaves the <td> without any extra class.
            */
            calendarHTML += `<td${tdClass ? ` class="${tdClass}"` : ''}>${day}</td>`;
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
    
    //* calling our function of displaying dates and give the year and month a value
    myCalendar(mydate.getFullYear(), mydate.getMonth());
    
});

localStorage.setItem('sessioncount', sessioncount);
// Now update the calendar:
if (typeof myCalendar === 'function') {
    document.querySelector('.calendar').innerHTML =
        `<h1 class="display-month">${months[new Date().getMonth()]}</h1>` +
        myCalendar(new Date().getFullYear(), new Date().getMonth());
}


