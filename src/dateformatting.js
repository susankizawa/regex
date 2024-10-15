export function setup() {
    const dateInput = document.getElementById('dateInput');
    const dateTable = document.getElementById('dateTable')

    dateInput.addEventListener('input', (ev) => {
        // Formats dateInput

        // Saves cursor position
        let cursorPos = ev.target.selectionStart;

        let formattedInput = formatDate(ev.target.value, 'YMD');

        // Sets date input to formatted input
        ev.target.value = formattedInput;

        // Checks if user used backspace or not
        let isBackspace = (ev?.data == null) ? true : false;

        // Finds and sets new cursor position
        let nextCursorPos = nextDigit(formattedInput, cursorPos, isBackspace);

        dateInput.setSelectionRange(nextCursorPos, nextCursorPos);

        // Formats date table formats

        for(let row = 1; row < dateTable.rows.length; row++){
            dateTable.rows[row].cells[1].innerHTML = formatDate(dateInput.value, dateTable.rows[row].cells[0].innerHTML);
        };
    });
}

function formatDate(dateString, format) {
    // Extracts digits
    const date = "" + dateString.replace(/\D/g, '');

    const match = date.match(/(\d{0,4})?(\d{0,2})?(\d{0,2})?/);

    let formattedDate;

    switch(format) {
        case 'DMY':
            formattedDate = [match[3],
                            match[2] ? "/" : "",
                            match[2],
                            match[1] ? "/" : "",
                            match[1]].join("");
            break;
        case 'YMD':
            formattedDate = [match[1],
                            match[2] ? "/" : "",
                            match[2],
                            match[3] ? "/" : "",
                            match[3]].join("");
            break;
        case 'MDY':
            formattedDate = [match[2],
                            match[3] ? "/" : "",
                            match[3],
                            match[1] ? "/" : "",
                            match[1]].join("");
            break;
        default:
            formattedDate = "";
    }

    return formattedDate;
}

function nextDigit(textInput, cursorPos, isBackspace) {
    // Returns current cursor position if the position that comes before the current one is a digit
    // 0| - Returns current cursor position
    // .| - Executes rest of the code
    if(/\d/.test(textInput[cursorPos - 1])) {
        return cursorPos;
    }

    if(isBackspace) {
        // If user used backspace returns current position subtracted by one
        return cursorPos - 1;
    }
    else {
        // If user didn't use backspace returns current position plus one
        return cursorPos + 1;
    }
}