// Login Functions
function authAlert(error) {
    let errorMessage = document.getElementById('authError');
    errorMessage.style.display = "";
    errorMessage.style.color = "red";
    errorMessage.innerText = error;
}

async function authenticateUser() {
    let username = document.getElementById('signinEmail').value
    let password = document.getElementById('signinPassword').value
    const response = await fetch(`/login/${username}/${password}`);
    user = await response.json();
    if (user.error) {
        authAlert(user.error);
    } else {
        localStorage.setItem('username', user.username);
        localStorage.setItem('isValidUser', true)
        window.location.href = "HTML/my-library.html";
    }
}

// Account Creation Functions
async function createAccount() {
    // Placeholder for saving user info to the Database
    let email = document.querySelector('#signupEmail').value;
    let disposable = await validateEmail(email);
    console.log(disposable)
    if (!disposable) {
        console.log('User Saved');
    } else {
        console.log('Nice Try')
    }
    // window.location.href = "../index.html"
}

// Make sure the user isn't using a disposable email using a 3rd party API
async function validateEmail(email) {
    const response = await fetch(`https://www.disify.com/api/email/${email}`);
    let isValid = await response.json();
    return isValid.disposable;
}

