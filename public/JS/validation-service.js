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
    let currentUsers = JSON.parse(localStorage.getItem('validUsers'))
    currentUsers[document.querySelector('#signupUsername').value] = {
        "username": document.querySelector('#signupUsername').value,
        "email": document.querySelector('#signupEmail').value,
        "password": document.querySelector('#signupPassword').value,
    }
    localStorage.setItem("validUsers", JSON.stringify(currentUsers))
    console.log('User Saved')
    window.location.href = "../index.html"
}

