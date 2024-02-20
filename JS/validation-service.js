let validUsers = {
    "john@gmail.com": {
        password: 'abc123'
    }
};

function throwAuthError(error) {
    errorMessage = document.getElementById('authError');
    errorMessage.style.display = "";
    errorMessage.innerText = error;
}

function authenticateUser() {
    let username = document.getElementById('signinEmail').value
    let password = document.getElementById('signinPassword').value
    if(validUsers[username]){
        if(validUsers[username].password === password){
           console.log(window.location.href)
        }
        else {
            throwAuthError('Incorrect Password');
            return false;
        };
    } else {
        throwAuthError('Incorrect Password');
        return true;
    };
}
