export function setup() {
    const extractButton = document.getElementById('extractButton');

    extractButton.onclick = updateOutput;
}

function updateOutput() {
    const textInput = document.getElementById('textInput');
    const outputDiv = document.getElementById('output');

    const text = textInput.value;

    try {
        // Creates a new RegExp object
        const regex = /#\w+/g;

        // Gets matches in test string
        const matches = text.match(regex);

        // Prints matches to output and "No matches found" if not matches are found
        outputDiv.innerHTML = matches ? matches.join('<br>') : 'No matches found';
    } catch (error) {
        // Prints error if something goes wrong
        outputDiv.innerHTML = `Error: ${error.message}`;
    }
}

