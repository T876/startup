let validUsers = {
    "john@gmail.com": {
        password: 'abc123'
    }
};

function throwAuthError(error) {
    let errorMessage = document.getElementById('authError');
    errorMessage.style.display = "";
    errorMessage.innerText = error;
}

function isValidUser(username, password) {
    if(validUsers[username]){
        if(validUsers[username].password === password){
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
        window.location.href = "./HTML/my-library.html";
    } else {
        throwAuthError('Incorrect Username/Password Combination')
    }
}

function onInit() {
    localStorage.setItem('isValidUser', false)
}

onInit()