const userRegisterForm = document.getElementById('userRegisterForm');
const nameInput = userRegisterForm['name'];
const passwordInput = userRegisterForm['password'];
const emailInput = userRegisterForm['email'];
const submitButton = userRegisterForm['submit'];

window.onload = () => {
    
    submitButton.disabled = true;
    nameInput.addEventListener('keyup', checkUserInput);
    passwordInput.addEventListener('keyup', checkUserInput);
    emailInput.addEventListener('keyup', checkUserInput);
    
}

const users = JSON.parse(localStorage.getItem('userDetails')) || [];

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;
    if (checkUser(email)) {
        alert('User already exists');
        window.location.href = 'login.html';
        return;
    } else {
        const user = {
            name,
            email,
            password
        };
        users.push(user);
        localStorage.setItem('userDetails', JSON.stringify(users));
        alert('User registered successfully');
        window.location.href = 'login.html';
    }
});


const checkUser = (email) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return true;
        }
    }
    return false;
}

const checkUserInput = () => {
    if (nameInput.value.length > 0 && passwordInput.value.length > 0 && emailInput.value.length > 0) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}


    
