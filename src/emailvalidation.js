export function setup() {
    const loginButton = document.getElementById('loginButton');

    loginButton.onclick = validateEmail;
}

function validateEmail() {
    const email = document.getElementById('emailInput').value;

    const emailRegex = 	/^([\w\-]+\.)*[\w\-]+@([\w\-]+\.)+([\w\-]{2,3})$/
    // ^ - Start of the email
    // ([\w\-]+\.)*[\w\- ]+ - Matches the local part
    // @ - Matches the @ symbol
    // ([\w\- ]+\.)+ - Matches the domain part
    // ([\w\-]{2,3}) - Matches the top-level domain part
    // $ - End of the email

    if (emailRegex.test(email)) {
        attemptLogin();
    }
    else {
        showMessage(2);
    }
}

function attemptLogin() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    if(email == "batata@gmail.com" && password == "123") {
        showMessage(0);
    }
    else {
        showMessage(1);
    }
}

function showMessage(index) {
    const emailInvalidMessage = document.getElementById('emailInvalidMessage');
    const incorrectCredentialsMessage = document.getElementById('incorrectCredentialsMessage');
    const successLoginMessage = document.getElementById('successLoginMessage');

    hideMessages();    

    switch(index) {
        case 0:
            successLoginMessage.hidden = false;
            break;
        case 1:
            incorrectCredentialsMessage.hidden = false;
            break;
        case 2:
            emailInvalidMessage.hidden = false;
            break;
        default:
            console.log("Message not found");
    }
}

function hideMessages() {
    const emailInvalidMessage = document.getElementById('emailInvalidMessage');
    const incorrectCredentialsMessage = document.getElementById('incorrectCredentialsMessage');
    const successLoginMessage = document.getElementById('successLoginMessage');

    emailInvalidMessage.hidden = true;
    successLoginMessage.hidden = true;
    incorrectCredentialsMessage.hidden = true;
}