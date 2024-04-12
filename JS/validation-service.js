// Login Functions
function authAlert(error) {
    let errorMessage = document.getElementById('authError');
    errorMessage.style.display = "";
    errorMessage.style.color = "red";
    errorMessage.innerText = error;
}

async function authenticateUser() {
    let username = document.getElementById('signinUsername').value
    let password = document.getElementById('signinPassword').value
    const response = await fetch(`/login/${username}/${password}`);
    let user = await response.json();
    if (user.isAuthenticated) {
        // TODO: Replace this with a auth cookie, authenticate using the cookie on all pages that the user shouldn't access w/o logging in
        localStorage.setItem('username', user.username);
        localStorage.setItem('isValidUser', true)
        window.location.href = "HTML/my-library.html";
    } else {
        authAlert("Incorrect username and password");
    }   
}

// Account Creation Functions
async function createAccount() {
    // Placeholder for saving user info to the Database
    let username = document.querySelector('#signupUsername').value;
    let email = document.querySelector('#signupEmail').value;
    let password = document.querySelector('#signupPassword').value;

    // Make sure the user isn't using a disposable email
    let disposable = await validateEmail(email);
    if (disposable) {
        console.log('nice try');
        return;
    }
    
    const response = await fetch(`/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        }),
    })
    
    if (response.ok) {
        window.location.href = "../index.html"
    } else {
        const body = await response.json();
        authAlert(body.error);
    }
}

// Make sure the user isn't using a disposable email using a 3rd party API
async function validateEmail(email) {
    const response = await fetch(`https://www.disify.com/api/email/${email}`);
    let isValid = await response.json();
    return isValid.disposable;
}

async function logout() {
    // TODO: Hit the logout endpoint, clear the cookies
}