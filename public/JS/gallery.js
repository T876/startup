// Define global variables
let currentUser = {}
let socket = {};

// Initialization functions
async function getCurrentUser() {
    let response = await fetch('/secure/currentUser')
    if (!response.ok){
        window.location.href = '/index.html'
    
    }
    currentUser = await response.json()
}

async function initPictures() {
    const response = await fetch('/secure/pictures');
    let allImages = await response.json()
    // TODO: This is bad practice, make a separate list for images to display so we aren't editing the original response

    const userImages = currentUser.savedImages;

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
        likeButton.innerText = "0 Likes";
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

function initializeWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    console.log(protocol);
    console.log(window.location.host)
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    console.log(protocol);

    socket.onmessage = async (event) => {
        let regexJsonDetector = /\{.*\}/;
        console.log(event.data.match(regexJsonDetector))
        if (event.data.match(regexJsonDetector)) {
            applyLikes(JSON.parse(event.data));
        }
        console.log('received: ', event.data);
    }
}


// User Interaction Functions

async function addPicture(picture) {
    console.log(picture.parentElement.parentElement);
    let pictureUrl = picture.parentElement.parentElement.querySelector('img').src;
    let pictureName = picture.parentElement.parentElement.querySelector('.name').innerText;
    let requestBody = {
        "name" : pictureName,
        "picture" : pictureUrl
    };

    const response = await fetch(`/secure/addImage/${currentUser.username}`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    picture.classList.remove("btn-secondary");
    picture.classList.add("btn-disabled");
    picture.classList.add("liked");
    location.reload();
}

function likePicture(picture) {
    // Send the like over the websocket
    var pictureName = picture.parentElement.parentElement.querySelector('div').querySelector('.name').innerText;
    socket.send(pictureName);

    // Disable the button
    var pictureClassList = picture.classList;
    if (!pictureClassList[3]) {
        picture.classList.remove("btn-primary");
        picture.classList.add("btn-disabled");
        picture.classList.add("liked");
    }
}

function applyLikes (likes) {
    let likeNums = document.querySelectorAll('.likes');
    // console.log(likeNums);
    for (let index in likeNums) {
        let picture = likeNums[index];
        let picElement = picture.parentElement;
        if (picElement) {
            let picName = picElement.parentElement.querySelector('div').querySelector('.name').innerText;
            for (i in likes) {
                // console.log(i);
                if (i === picName) {
                    picture.innerText = likes[i] + " Likes";
                }
            }
        }
    }

}

// Simulate websocket data as other users like pictures


async function onInit() {
    await getCurrentUser()
    document.getElementById('username-display').innerText = currentUser.username;
    await initPictures();
    initializeWebSocket();
    
}

onInit();