function loadPage(page, hasScript = false) {
    fetch(`pages/${page}.html`)
    .then(response => response.text())
    .then(data => {
        // Sets left-content to selected page content
        document.getElementById('left-content').innerHTML = data;
        
        // Imports page javascript, if it has a script
        if (hasScript) {
            import(`../src/${page}.js`)
            .then((module) => { module.setup() });
        }

        // Unsets previous active menu items
        let menuItems = document.querySelectorAll('.right-menu menu li');
        menuItems.forEach(item => {
            item.classList.remove('active');
        });

        // Sets selected menu item as active
        document.getElementById(page).parentElement.classList.add('active');
    })
    .catch(error => {
        document.getElementById('content').innerHTML = '<p>Error loading page.</p>';
    });
}

// Loads this page by default
loadPage('helloworld');

document.getElementById('home').onclick = () => {
    loadPage('helloworld');
}

document.getElementById('regextester').onclick = () => {
    loadPage('regextester', true);
}

document.getElementById('texthighlighter').onclick = () => {
    loadPage('texthighlighter', true);
}

document.getElementById('textsubstitution').onclick = () => {
    loadPage('textsubstitution', true);
}