let currentUser = {}
async function getCurrentUser() {
    let response = await fetch('/secure/currentUser')
    if (!response.ok){
        window.location.href = '/index.html'
    
    }
    currentUser = await response.json()
}

async function initPictures() {
    const response = await fetch('/pictures');
    let allImages = await response.json()
    // TODO: This is bad practice, make a separate list for images to display so we aren't editing the original response

    const response2 = await fetch(`/pictures/${localStorage.getItem('username')}`);
    const userImages = await response2.json();

    // If a picture has already been added to a user's library, don't show it here
    for (img in userImages) {
        imageIndex = parseInt(img);
        userImage = userImages[imageIndex]
        for (i in allImages){
            let imageIndex2 = parseInt(i);
            allImage = allImages[i];
            if (userImage.name == allImage.name) {
                allImages.splice(imageIndex2, 1);
            }
        }
    }

    for (img in allImages)  {
        
        imageIndex = parseInt(img);
        image = allImages[imageIndex];
        // Create the parent Div
        let newImg = document.createElement('div');
        newImg.classList = "col gal-column"

        // Create the Div content
        let imgImage = document.createElement('img');
        imgImage.src = image.picture;
        let imgTitleDiv = document.createElement('div');
        imgTitleDiv.classlist = 'info-container';
        let imgSpan = document.createElement('span');
        imgSpan.classList = 'name';
        imgSpan.innerText = image.name;
        imgTitleDiv.appendChild(imgSpan);

        // Create the like and add image buttons
        let buttonsContainer = document.createElement('div');
        buttonsContainer.classList = 'likes-container';
        let likeButton = document.createElement('button');
        likeButton.onclick = function() {likePicture(this)};
        likeButton.classList = "btn btn-primary likes";
        likeButton.innerText = "36 Likes";
        let addPictureButton = document.createElement('button')
        addPictureButton.onclick = function() {addPicture(this)};
        addPictureButton.classList = "btn btn-secondary";
        addPictureButton.innerText = "+";
        buttonsContainer.appendChild(likeButton);
        buttonsContainer.appendChild(addPictureButton);

        // Append the content to the div
        newImg.appendChild(imgImage);
        newImg.appendChild(imgTitleDiv);
        newImg.appendChild(buttonsContainer);
        document.querySelector('.row').append(newImg);
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

async function addPicture(picture) {
    console.log(picture.parentElement.parentElement);
    let pictureUrl = picture.parentElement.parentElement.querySelector('img').src;
    let pictureName = picture.parentElement.parentElement.querySelector('.name').innerText;
    let requestBody = {
        "name" : pictureName,
        "picture" : pictureUrl
    };

    const response = await fetch(`/addImage/${localStorage.getItem('username')}`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    const successful = await response.json();

    if (successful) {
        picture.classList.remove("btn-secondary");
        picture.classList.add("btn-disabled");
        picture.classList.add("liked");
    };
}

// Simulate websocket data as other users like pictures
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

async function onInit() {
    await getCurrentUser()
    initPictures()
    randomLikes()
}

onInit();