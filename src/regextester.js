export function setup() {
    const textInput = document.getElementById('textInput');
    const regexInput = document.getElementById('regexInput');
    const flagInput = document.getElementById('flagInput');

    regexInput.addEventListener('input', updateOutput);
    flagInput.addEventListener('input', updateOutput);
    textInput.addEventListener('input', updateOutput);
}

function updateOutput() {
    const outputDiv = document.getElementById('output');

    // Gets regex pattern, flags and test string 
    const regexString = regexInput.value;
    const text = textInput.value;
    const flags = flagInput.value;

    try {
        // Creates a new RegExp object
        const regex = new RegExp(regexString, flags);

        // Gets matches in test string
        const matches = text.match(regex);

        // Prints matches to output and "No matches found" if not matches are found
        outputDiv.innerHTML = matches ? matches.join('<br>') : 'No matches found';
    } catch (error) {
        // Prints error if something goes wrong
        outputDiv.innerHTML = `Error: ${error.message}`;
    }
}

