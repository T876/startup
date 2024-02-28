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

function onInit() {
    document.getElementById("username-display").innerText = "Welcome, " + localStorage.getItem('username')
}

onInit()