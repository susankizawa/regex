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

        cpfInput.setSelectionRange(nextCursorPos + 1, nextCursorPos + 1);
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