let Images = JSON.parse(localStorage.getItem('myImages'));

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

function onInit() {
    populateImages();

    if(localStorage.getItem('isValidUser') === 'true') {
        console.log('User Authorized to Access this page')
    } else {
        window.location.href = "../index.html"
    }
    
}

onInit();