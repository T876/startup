let myImagesPrimer = {
    "Owner" : localStorage.getItem('username'),
    "Images" : {}
}
if(!localStorage.getItem('myImages')) {
    localStorage.setItem('myImages', JSON.stringify(myImagesPrimer));
};

// Simulate websocket data - Likes coming through from other users
function randomLikes() {
    let likes = document.querySelectorAll('.likes');
    let randRange = (min, max) => {return Math.floor(Math.random() * (max - min) + min)}
    if(likes[0]) {
        setInterval(() => {
            let randIndex = randRange(0, likes.length);
            let newLikesNum = parseInt(likes[randIndex].innerText.match(/\d+/));
            newLikesNum++;
            likes[randIndex].innerText = newLikesNum + " Likes";
          }, 3000);
    }
}

function likePicture(picture) {
    var pictureClassList = picture.classList;
    if (!pictureClassList[3]) {
        picture.innerText = (parseInt(picture.innerText.match(/\d+/)) + 1) + " Likes" ;
        picture.classList.remove("btn-primary");
        picture.classList.add("btn-disabled");
        picture.classList.add("liked");
    }
}

function addPicture(picture) {
    let pictureUrl = picture.parentElement.parentElement.querySelector('img').src;
    let pictureName = picture.parentElement.parentElement.querySelector('.info-container .name').innerText;
    let userPics = JSON.parse(localStorage.getItem('myImages'));
    userPics.Images[pictureName] = {
        "name" : pictureName,
        "picture" : pictureUrl
    };
    localStorage.setItem('myImages', JSON.stringify(userPics));
    console.log(JSON.parse(localStorage.getItem('myImages')));
    picture.classList.remove("btn-secondary");
    picture.classList.add("btn-disabled");
    picture.classList.add("liked");
}


function onInit() {
    if(localStorage.getItem('isValidUser') === 'true') {
        console.log('User Authorized to Access this page')
    } else {
        window.location.href = "../index.html"
    }
    randomLikes()
}



onInit()