export function setup() {
    const signUpButton = document.getElementById('signUpButton');

    signUpButton.onclick = () => {
        const usernameInput = document.getElementById('usernameInput');
        const emptyUsernameMessage = document.getElementById('emptyUsernameMessage');

        hideMessages();

        if(usernameInput.value != "") {
            validatePassword();
        }
        else {
            emptyUsernameMessage.hidden = false;
        }
    }
}

function validatePassword() {
    const invalidLengthMessage = document.getElementById('invalidLengthMessage');
    const needsUppercaseMessage = document.getElementById('needsUppercaseMessage');
    const needsLowercaseMessage = document.getElementById('needsLowercaseMessage');
    const needsDigitMessage = document.getElementById('needsDigitMessage');
    const needsSpecialCharMessage = document.getElementById('needsSpecialCharMessage');
    const noSpacesMessage = document.getElementById('noSpacesMessage');
    const successSignUpMessage = document.getElementById('successSignUpMessage');

    const password = document.getElementById('passwordInput').value;

    // Checks if password is valid
    // Password must be at least 8 characters long and at most 16 characters long
    const validLength = /^.{8,16}$/.test(password);

    // Password must include at least one uppercase letter
    const hasUppercase = /[A-Z]+/.test(password);

    // Password must include at least one lowercase letter
    const hasLowercase = /[a-z]+/.test(password);

    // Password must include at least one digit
    const hasDigit = /[0-9]+/.test(password);

    // Password must include at least one special character
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    // Password cannot contain spaces
    const containsSpaces = /\s+/.test(password);

    const isValid = validLength && hasUppercase && hasLowercase && hasDigit && hasSpecialChar && !containsSpaces;

    if(isValid) {
        successSignUpMessage.hidden = false;
    }
    else {
        if(!validLength) {
            invalidLengthMessage.hidden = false;
        }
        if(!hasUppercase) {
            needsUppercaseMessage.hidden = false;
        }
        if(!hasLowercase) {
            needsLowercaseMessage.hidden = false;
        }
        if(!hasDigit) {
            needsDigitMessage.hidden = false;
        }
        if(!hasSpecialChar) {
            needsSpecialCharMessage.hidden = false;
        }
        if(containsSpaces) {
            noSpacesMessage.hidden = false;
        }
    }
}

function hideMessages() {
    const invalidLengthMessage = document.getElementById('invalidLengthMessage');
    const needsUppercaseMessage = document.getElementById('needsUppercaseMessage');
    const needsLowercaseMessage = document.getElementById('needsLowercaseMessage');
    const needsDigitMessage = document.getElementById('needsDigitMessage');
    const needsSpecialCharMessage = document.getElementById('needsSpecialCharMessage');
    const noSpacesMessage = document.getElementById('noSpacesMessage');
    const emptyUsernameMessage = document.getElementById('emptyUsernameMessage');
    const successSignUpMessage = document.getElementById('successSignUpMessage');
    
    invalidLengthMessage.hidden = true;
    needsUppercaseMessage.hidden = true;
    needsLowercaseMessage.hidden = true;
    needsDigitMessage.hidden = true;
    needsSpecialCharMessage.hidden = true;
    noSpacesMessage.hidden = true;
    emptyUsernameMessage.hidden = true;
    successSignUpMessage.hidden = true;
}