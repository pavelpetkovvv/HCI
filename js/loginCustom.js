let user = class {
    constructor(email, password) {
      this.email = email;
      this.password = password;
    }
}

var rootUser1 = new user("root", "root");
var rootUser2 = new user("kristinajotova@gmail.com", "kristina123");
var rootUser3 = new user("pavelpetkovvv@gmail.com", "pavel123");
var rootUser4 = new user("john.spasov99@gmail.com", "ivan123");
var rootUser5 = new user("kalina6@abv.bg", "kalina123");

var accounts = [rootUser1, rootUser2, rootUser3, rootUser4, rootUser5];

function login1(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    //compare the entered details with all acounts
    for(var i = 0; i < accounts.length; i++){
        if(compareStrings(email, accounts[i].email)){
            if(compareStrings(password, accounts[i].password)){
                window.location.replace("../index_logged_in.html");
            }
        }
    }

    console.log("Login unsuccesful");

    //add message to be displayed to user

    //window.location.replace("../index_logged_in.html");
}

function logout1(){
    window.location.replace("./index.html");
}

function register(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var repeatPassword = document.getElementById('repeatPassword').value;

    //check validity of email (optional)
    //check if password matches criteria (define what criteria it sould match)
    //check if "I agree to terms" checkbox is checked

    if(compareStrings(password, repeatPassword)){
    newUser = new user(email, password); 
    accounts.push(newUser);
    window.location.replace("../index.html");
    }
    else{
        console.log("Repeat password doesn't match original password");
        //add message to be displayed to user
    }
}

function compareStrings(password, repeatPassword){
    if(password.length != repeatPassword.length){
        return false;
    }

    for(var i = 0; i < password.length; i++){
        if(password.charCodeAt(i) != repeatPassword.charCodeAt(i)){
            return false;
        }
    }

    return true;
}