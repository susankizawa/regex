const textInput = document.getElementById('textInput');
const regexInput = document.getElementById('regexInput');
const outputDiv = document.getElementById('output');

function updateOutput() {
    const text = textInput.value;
    const regexString = regexInput.value;
    try {
    const regex = new RegExp(regexString, 'g');
    const matches = text.match(regex);
    outputDiv.innerHTML = matches ? matches.join('<br>') : 'No matches found';
    } catch (error) {
    outputDiv.innerHTML = `Error: ${error.message}`;
    }
}

textInput.addEventListener('input', updateOutput);
regexInput.addEventListener('input', updateOutput);