var username = document.getElementById("username");
var password = document.getElementById("password");
var btn = document.getElementById("btn");
var text = document.getElementById("text");
var user = "admin";
var pwd = "12345";

function validate(redirect){
//check if credentials match if success 
    if(username.value===user && password.value===pwd){
        redirect("./main.html");
    }
    //if failed
    else{
        username.style.border="3px solid red";
        password.style.border = "3px solid red";
        clear(username,password);
    }
}

//callback function for success
function redirect(url){
    window.location.href = url;
}
//callback function for failure
function clear(username,password) {
    username.value="";
    password.value = "";
}   
