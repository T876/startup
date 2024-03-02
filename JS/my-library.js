let Images = JSON.parse(localStorage.getItem('myImages'));

function populateImages() {
    let gallery = document.querySelector('.row');
    console.log(Images)
    for (image in Images.Images)  {
        console.log(image)
        // Create the parent Div
        let newImg = document.createElement('div');
        newImg.classList = "col gal-column"
        console.log(Images.Images[image])

        // Create the Div content
        let imgImage = document.createElement('img');
        imgImage.src = Images.Images[image].picture;
        let imgDiv = document.createElement('div');
        imgDiv.classlist = 'info-container';
        let imgSpan = document.createElement('span');
        imgSpan.classList = 'name';
        imgSpan.innerText = Images.Images[image].name
        imgDiv.appendChild(imgSpan)

        // Append the content to the div
        newImg.appendChild(imgImage);
        newImg.appendChild(imgDiv);
        document.querySelector('.row').append(newImg);
        console.log(newImg);
    }
}

function onInit() {
    populateImages();
}

onInit();