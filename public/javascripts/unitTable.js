unction newElement() {
    var name = document.createElement("li");
    var matric = document.createElement("li");
    var startDate = document.createElement("li");

    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You didn't add a Todo Item!");
    } else {
      document.getElementById("help-box").style.display="none";
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";
    hideLi();
    checked();
  }