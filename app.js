const signUp = (e) => {
    let userRegisterForm = document.getElementById('userRegisterForm'),
        name = userRegisterForm['name'].value,
        email = userRegisterForm['email'].value,
        pwd = userRegisterForm['password'].value,
        isLoggedIn = false;

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist = formData.length && JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() == email.toLowerCase()); 

    if(!exist){
        formData.push({ name,email, pwd, isLoggedIn });
        localStorage.setItem('formData', JSON.stringify(formData));
        alert("Registered Successfully\nPlease Login");
        location.href = "./login.html";
    }
    else{
        alert("Ooopppssss... Duplicate found!!!\nYou have already signed up\nPlease Sign In");
        location.href = "./login.html";

    }
    e.preventDefault();
}

function signIn(e) {
    let userLoginForm = document.getElementById("userLoginForm"),
        email = userLoginForm['email'].value, 
        pwd = userLoginForm['password'].value;
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = formData.length && JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() == email);
    if (!exist) {
        alert("User doesn't exist \n Please Register!!");
        location.href = "./index.html";
        console.log("Parent If")
    }
    else {
        console.log("parent else")
        if (JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd)) {
            console.log("child If")
            let index = formData.findIndex(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd);
            formData[index].isLoggedIn = true;
            localStorage.setItem('formData', JSON.stringify(formData));
            location.replace("./dashboard.html?" + index);
        }
        else {
            console.log("child else")
            alert("Email or password is invalid!!!!");
        }
    }
    e.preventDefault();
}


function logout(e) {
    let formData = JSON.parse(localStorage.getItem('formData'));
    let index = formData.findIndex(data => data.isLoggedIn == true);
    formData[index].isLoggedIn = false;
    localStorage.setItem('formData', JSON.stringify(formData));
    location.href = "./login.html";
    e.preventDefault();
}

function displayUserDetails(index) {
    let formData = JSON.parse(localStorage.getItem('formData'));
    let userDetails = formData[index];
    // check if user is logged in
    if (userDetails.isLoggedIn) {
        document.getElementById('userName').innerText = "Welcome " + userDetails.name;
        document.getElementById('userEmail').innerHTML = "Email: " + userDetails.email;
    }
    else {
        alert("Please Sign In");
        location.href = "./login.html";
    }
}

















