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

        dateInput.setSelectionRange(nextCursorPos + 1, nextCursorPos + 1);

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
    if(isBackspace) {
        // If backspace was used, gets the position of the first digit that comes before the current cursor position
        for (let i = cursorPos - 1; i > 0; i--) {
            if(/\d/.test(textInput[i])) {
                return i;
            }
        }
    }
    else {
        // If backspace was not used, gets the position of the first digit that comes after the current cursor position
        for (let i = cursorPos - 1; i < textInput.length; i++) {
            if(/\d/.test(textInput[i])) {
                return i;
            }
        }
    }

    return cursorPos;
}