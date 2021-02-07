// Saving DOM Elements to Variables
const userEmail = document.getElementById("useremail");
const newEmailBtn = document.getElementById("newemailbtn");
const newPasswordBtn = document.getElementById("newpasswordbtn");
const newEmailInput = document.getElementById("newemail");
const newEmailLabel = document.getElementById("emaillabel");
const newPasswordInput = document.getElementById("newpassword");
const confirmNewPassInput = document.getElementById("confirmnewpassword");
const confirmPassLabel = document.getElementById("confirmlabel");
const newPasswordLabel = document.getElementById("passwordlabel");
const saveEmailBtn = document.getElementById("saveemail");
const savePasswordBtn = document.getElementById("savepassword");
const passwordReqs = document.getElementById("passwordreqs");
const username = document.getElementById("username");
const email = document.getElementById("email");

// Gets User Data and assigns it to DOM element
const currentUser = async () => {
    const request = await fetch("/routes/currentUser");
    const response = await request.json();
    let user = {
        username: response.username,
        email: response.email,
    };
    email.innerHTML = user.email;
    username.innerHTML = user.username;
};
currentUser();

// Event Listeners for Update Profile UI
newEmailBtn.addEventListener("click", event => {
    newEmailBtn.style.visibility = "hidden";
    newEmailInput.style.visibility = "visible";
    newEmailLabel.style.visibility = "visible";
    saveEmailBtn.style.visibility = "visible";
});

newPasswordBtn.addEventListener("click", event => {
    newPasswordBtn.style.visibility = "hidden";
    newPasswordLabel.style.visibility = "visible";
    newPasswordInput.style.visibility = "visible";
    confirmNewPassInput.style.visibility = "visible";
    confirmPassLabel.style.visibility = "visible";
    savePasswordBtn.style.visibility = "visible";
    passwordReqs.style.visibility = "visible";
});

saveEmailBtn.addEventListener("click", event => {
    if (!newEmailInput.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        alert("Check new Email Address");
    } else {
   console.log(`sending email changes to server`);
   newEmailLabel.style.visibility = "hidden";
   newEmailInput.style.visibility = "hidden";
    saveEmailBtn.style.visibility = "hidden";
    newEmailBtn.style.visibility = "visible";
    saveNewEmail(newEmailInput.value);
    }
});

savePasswordBtn.addEventListener("click", event => {
    if (newPasswordInput.value === confirmNewPassInput.value) {
    console.log(`sending password changes to server`);
    newPasswordLabel.style.visibility = "hidden";
    newPasswordInput.style.visibility = "hidden";
    confirmNewPassInput.style.visibility = "hidden";
    confirmPassLabel.style.visibility = "hidden";
    savePasswordBtn.style.visibility = "hidden";
    passwordReqs.style.visibility = "hidden";
    newPasswordBtn.style.visibility = "visible";
    saveNewPassword(newPasswordInput.value);
    } else {
        alert("Your passwords must match.")
    }
});
// End Update Profile UI

async function saveNewPassword(newPass) {
    const newPassword = { password: newPass } 
    const updatePassAPI = "/routes/currentUser/update/password";
    const request = await fetch(updatePassAPI, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newPassword)
});
const response = await request.json();
document.getElementById("displayAlert").textContent = response.serverAlert;
};

async function saveNewEmail(newEmail) {
    const changeEmail = { email: newEmail }
    const updateEmailAPI = "/routes/currentUser/update/email";
    const request = await fetch(updateEmailAPI, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(changeEmail)
});
const response = await request.json();
document.getElementById("displayAlert").textContent = response.serverAlert;
};