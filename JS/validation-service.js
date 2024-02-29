// Get valid users
// TODO: Replace this with a function that queries the db with the username and password they entered
// TODO: Part 2 - May also just include this functionality in the isValidUser() function
let validUsers = {
    "JohnDoe": {
        "username": "JohnDoe",
        "email": "john@gmail.com",
        "password": "abc123",
    }
};
if(!localStorage.getItem("validUsers")){
    localStorage.setItem("validUsers", JSON.stringify(validUsers))
}



// Login Functions
function throwAuthError(error) {
    let errorMessage = document.getElementById('authError');
    errorMessage.style.display = "";
    errorMessage.innerText = error;
}

function isValidUser(username, password) {
    var users = JSON.parse(localStorage.getItem("validUsers"))
    if(users[username]){
        if(users[username]['password'] === password){
            return true
        }
        else {
            return false;
        };
    } else {
        return false;
    };
}

function authenticateUser() {
    let username = document.getElementById('signinEmail').value
    let password = document.getElementById('signinPassword').value
    if(isValidUser(username, password)){
        localStorage.setItem('username', username);
        localStorage.setItem('isValidUser', true)
        window.location.href = "HTML/my-library.html";
    } else {
        throwAuthError('Incorrect Username/Password Combination')
    }
}

// Account Creation Functions
async function createAccount() {
    // Placeholder for saving user info to the Database
    validUsers[document.querySelector('#signupUsername').value] = {
        "username": document.querySelector('#signupUsername').value,
        "email": document.querySelector('#signupEmail').value,
        "password": document.querySelector('#signupPassword').value,
    }
    localStorage.setItem("validUsers", JSON.stringify(validUsers))
    console.log('User Saved')
    window.location.href = "../index.html"
}

