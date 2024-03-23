// TODO - Get the logged in user

let currentUser = {}
async function getCurrentUser() {
    let response = await fetch('/secure/currentUser')
    if (!response.ok){
        window.location.href = '/index.html'
    
    }
    currentUser = await response.json()
}


let Images = JSON.parse(localStorage.getItem('myImages')); // TODO: get the images from the logged in user

async function populateImages() {
    const response = await fetch(`/pictures/${localStorage.getItem('username')}`);
    const userImages = await response.json();
    console.log(userImages);
    for (img in userImages)  {
        imageIndex = parseInt(img);
        image = userImages[imageIndex];
        // Create the parent Div
        let newImg = document.createElement('div');
        newImg.classList = "col gal-column"

        // Create the Div content
        let imgImage = document.createElement('img');
        imgImage.src = image.picture;
        let imgDiv = document.createElement('div');
        imgDiv.classlist = 'info-container';
        let imgSpan = document.createElement('span');
        imgSpan.classList = 'name';
        imgSpan.innerText = image.name
        imgDiv.appendChild(imgSpan)

        // Append the content to the div
        newImg.appendChild(imgImage);
        newImg.appendChild(imgDiv);
        document.querySelector('.row').append(newImg);
    }
}

async function onInit() {
    populateImages();
    await getCurrentUser();
    console.log(currentUser);

}

onInit();