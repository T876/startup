

function searchImages() {
    var input, filter, table, tableData, name, i, txtValue;
    input = document.getElementById('img-search-bar');
    filter = input.value.toUpperCase();
    table = document.getElementById("image-gallery");
    tableData = table.getElementsByClassName('gal-column');

    for (i = 0; i < tableData.length; i++) {
        name = tableData[i].getElementsByClassName("name")[0];
        txtValue = name.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tableData[i].style.display = "";
        } else {
            tableData[i].style.display = "none";
        }
      }
}

// Simulate websocket data - Likes coming through from other users
function randomLikes() {
    let likes = document.querySelectorAll('.likes');
    let randRange = (min, max) => {return Math.floor(Math.random() * (max - min) + min)}
    setInterval(() => {
        let randIndex = randRange(0, likes.length);
        let newLikesNum = parseInt(likes[randIndex].innerText.match(/\d+/));
        newLikesNum++;
        likes[randIndex].innerText = newLikesNum + " Likes";
      }, 3000);
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

function uploadPhoto() {
    // Simulate uploading a photo through the my images page
}

function onInit() {
    document.getElementById("username-display").innerText = "Welcome, " + localStorage.getItem('username')
    randomLikes()
}

onInit()