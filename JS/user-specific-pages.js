function onInit() {
    if(localStorage.getItem('isValidUser') === 'true') {
        console.log('User Authorized to Access this page')
    } else {
        window.location.href = "../index.html"
    }
}

onInit()