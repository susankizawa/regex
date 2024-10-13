export function setup() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', highlightText);
}

function highlightText() {
    const paragraphs = document.querySelectorAll("#textHighlighterText p");
    let searchTerm = searchInput.value;

    searchTerm = searchTerm.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); // Escape special regex characters

    const regex = new RegExp(`(${searchTerm})`, "gi"); // Case-insensitive search

    // Loop through each paragraph and apply the highlight
    paragraphs.forEach(paragraph => {
        paragraph.innerHTML = paragraph.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1'); // Remove previous highlights
        paragraph.innerHTML = paragraph.innerHTML.replace(regex, '<span class="highlight">$1</span>'); // Adds new highlights
    });
}