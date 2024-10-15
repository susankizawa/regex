export function setup() {
    const phoneInput = document.getElementById('phoneInput');

    phoneInput.addEventListener('input', ev => {
        // Saves cursor position
        let cursorPos = ev.target.selectionStart;

        let formattedInput = formatPhoneNumber(ev.target.value);

        // Sets phone number input to formatted input
        ev.target.value = formattedInput;

        // Checks if user used backspace or not
        let isBackspace = (ev?.data == null) ? true : false;

        // Finds and sets new cursor position
        let nextCursorPos = nextDigit(formattedInput, cursorPos, isBackspace);
        // If the current cursor position is in the +55 part, puts the cursor after because 
        // that part is supposed to be fixed because phone numbers from other countries is 
        // beyond the scope of this project
        if(nextCursorPos < 3) {
            nextCursorPos = 3;
        }

        phoneInput.setSelectionRange(nextCursorPos, nextCursorPos);
    });
}

function formatPhoneNumber(phoneNumberString) {
    // Extract phone number digits and apply regex
    // Also makes sure the input is treated as a string with "" + at the start
    const digits = "" + phoneNumberString.replace(/\D/g, '');

    const match = digits.match(/(5{0,2})?(\d{0,2})?(\d{0,5})?(\d{0,4})?/);

    return ["+", 
            "55",
            match[2] ? " " : "", 
            match[2],
            match[3] ? " " : "", 
            match[3], 
            match[4] ? "-" : "", 
            match[4]].join("");
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