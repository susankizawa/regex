export function setup() {
    const cpfInput = document.getElementById('cpfInput');

    cpfInput.addEventListener('input', ev => {
        // Saves cursor position
        let cursorPos = ev.target.selectionStart;

        let formattedInput = formatCpfNumber(ev.target.value);

        // Sets cpf number input to formatted input
        ev.target.value = formattedInput;

        // Checks if user used backspace or not
        let isBackspace = (ev?.data == null) ? true : false;

        // Finds and sets new cursor position
        let nextCursorPos = nextDigit(formattedInput, cursorPos, isBackspace);

        cpfInput.setSelectionRange(nextCursorPos, nextCursorPos);
    });
}

function formatCpfNumber(cpfString) {
    // Extract cpf digits and apply regex
    // Also makes sure the input is treated as a string with "" + at the start
    const digits = "" + cpfString.replace(/\D/g, '');

    const match = digits.match(/(\d{0,3})?(\d{0,3})?(\d{0,3})?(\d{0,2})?/);

    return [match[1],
            match[2] ? "." : "", 
            match[2],
            match[3] ? "." : "", 
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