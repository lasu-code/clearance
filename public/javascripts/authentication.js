function opentab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabcontent.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// let users = [
//     {
//         firstname: "fawas",
//         surname: "kareem",
//         middlename: "olamilekan",
//         matricNo: "170115028"

//     },
//     {
//         firstname: "ridwan",
//         surname: "kareem",
//         middlename: "olatunji",
//         matricNo: "170115030"

//     },

//     {
//         firstname: "dammy",
//         surname: "bello",
//         middlename: "luvlyber",
//         matricNo: "170115040"

//     },
// ]

// for(1=0; i<users.length; i++){
//     if(Username == matricNo & password == surname);
//     console.log("you are a student")
    
// }