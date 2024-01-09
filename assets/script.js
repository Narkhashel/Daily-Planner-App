const currentHour = dayjs().hour();
const businessHourStart = 9;
const businessHourEnd = 22;

// Function to call for create timetable rows and current time.
function initialisePage(){
    setCurrentDay();
    timeTable();
}

// This functins sets time format and dispaly it at the top of the page. 
function setCurrentDay() {
    const currentDayStr = dayjs().format('dddd, MMMM, DD');
    const currentDayEl = $('#currentDay');
    currentDayEl.text(currentDayStr);
}

// This function creates all the rows and associated columns in it. 
function createRow(rowHour) {
    //Seperte row 
    let newRow = $('<div>').addClass('row time-block');
    // This variable create a column and calls for a function to display correct hour in it. 
    let hourCol = $('<div>').addClass('col-2 hour').text(formatHourNumber(rowHour));
    // Create textfield to put user events, create id based on parameter and then uses function to retrive text from a localStorage, based on that id.
    let textCol = $('<textarea>').addClass('col-9 textarea').attr({'placeholder':'Type New Event','id': rowHour}).text(getEventText(rowHour)); 
    // Creates button to save current textfield input to a localStorage   
    let saveCol = $('<button>').addClass('col-1 saveBtn').text('Save');

    //Event click assign to a 'Save' button, uses rowHour as a refrence id and then save textarea input to a localStorage
    $(saveCol).on('click', () => {
        localStorage.setItem(rowHour, textCol.val());
      });
    // Calls for a function to add specific color to a textarea field based on the comparison to a current time. 
    addTimeColor(rowHour,textCol);
    
    newRow.append(hourCol, textCol, saveCol);
    return newRow;
}

// Function to retrive item from a localStorage
function getEventText (id) {
    return localStorage.getItem(id);
}

// This function adds a color class to a text row, color of the event depends on the past, present or future compared to a currentHour.
function addTimeColor(hourRow, textRow) {
    if (hourRow === currentHour) {
        return textRow.addClass('present');
    } else if (hourRow < currentHour) { 
        return textRow.addClass('past');
    } else {
        return textRow.addClass('future');
}}

// Function to loop over opening and closing numbers and use them as parameter to create rows using createRow function.
function timeTable() {
    for (let i = businessHourStart; i <= businessHourEnd; i++) {
        let row = createRow(i); 
        $('#timetable').append(row);
}}

// A function that compares numbers and changes them accordingly to a corresponding hour displays it in hourCol.
function formatHourNumber(hourNumber) {
    var hourString = "";
    if (hourNumber > 12) {
        hourNumber = hourNumber - 12;
        hourString = hourNumber.toString();
        hourString = hourString + "PM";
    } else if (hourNumber == 12) {
        hourString = "12PM";
    } else if (hourNumber == 0) {
        hourString = "12AM";
    } else {
        hourString = hourNumber.toString();
        hourString = hourString + "AM";
    }
    return hourString;
}

// Runninng this function create all app elements.
initialisePage()