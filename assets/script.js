const currentHour = dayjs().hour();
const businessHourStart = 9;
const businessHourEnd = 22;

//
function initialisePage(){
    setCurrentDay();
    timeTable();
}

//
function setCurrentDay() {
    const currentDayStr = dayjs().format('dddd, MMMM, DD');
    const currentDayEl = $('#currentDay');
    currentDayEl.text(currentDayStr);
}

//
function createRow(rowHour) {
    let newRow = $('<div>').addClass('row time-block');

    let hourCol = $('<div>').addClass('col-2 hour').text(formatHourNumber(rowHour));
    //let textCol = $('<textarea>').addClass('col-9 textarea').attr({'placeholder':'Type New Event','id': rowHour}).text(getEventText(rowHour));
    let textCol = $(`<textarea class="col-9 textarea" placeholder="Type New Event" id="${rowHour}">${getEventText(rowHour)}</textarea>`);  
    let saveCol = $('<button>').addClass('col-1 saveBtn').text('Save');

    $(saveCol).on('click', () => {
        localStorage.setItem(rowHour, textCol.val());
      });

    addTimeColor(rowHour,textCol);

    newRow.append(hourCol, textCol, saveCol);
    return newRow;
}

//
function getEventText (id) {
    return localStorage.getItem(id);
}

// This function adds a color class to a text row, color of the event depends on the past, present or future.
function addTimeColor(hourRow, textRow) {
    if (hourRow === currentHour) {
        return textRow.addClass('present');
    } else if (hourRow < currentHour) { 
        return textRow.addClass('past');
    } else {
        return textRow.addClass('future');
}}

//
function timeTable() {
    for (let i = businessHourStart; i <= businessHourEnd; i++) {
        let row = createRow(i); 
        $('#timetable').append(row);
}}

//
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

//
initialisePage()