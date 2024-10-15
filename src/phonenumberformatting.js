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

        phoneInput.setSelectionRange(nextCursorPos + 1, nextCursorPos + 1);
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