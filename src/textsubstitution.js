export function setup() {
    const searchInput = document.getElementById('searchInput');
    const substitutionInput = document.getElementById('substitutionInput');
    const textInput = document.getElementById('textInput');

    searchInput.addEventListener('input', replaceText);
    substitutionInput.addEventListener('input', replaceText);
    textInput.addEventListener('input', replaceText);
}

function replaceText() {
    const text = textInput.value;
    const output = document.getElementById('output');
    let searchTerm = searchInput.value;
    let substitutionText = substitutionInput.value;

    searchTerm = searchTerm.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); // Escape special regex characters

    const regex = new RegExp(`(${searchTerm})`, "g");

    output.innerHTML = text;

    output.innerHTML = output.innerHTML.replace(regex, `<span class="highlight">${substitutionText}</span>`);
}