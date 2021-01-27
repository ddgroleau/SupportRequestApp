// Saving DOM Elements to Variables
const userEmail = document.getElementById("useremail");
const newEmailBtn = document.getElementById("newemailbtn");
const newPasswordBtn = document.getElementById("newpasswordbtn");
const newEmailInput = document.getElementById("newemail");
const newPasswordInput = document.getElementById("newpassword");
const confirmNewPassInput = document.getElementById("confirmnewpassword");
const confirmPassLabel = document.getElementById("confirmlabel");
const newPasswordLabel = document.getElementById("passwordlabel");
const saveEmailBtn = document.getElementById("saveemail");
const savePasswordBtn = document.getElementById("savepassword");

newEmailBtn.addEventListener("click", event => {
    newEmailBtn.style.visibility = "hidden";
    newEmailInput.style.visibility = "visible";
    saveEmailBtn.style.visibility = "visible";
});

newPasswordBtn.addEventListener("click", event => {
    newPasswordBtn.style.visibility = "hidden";
    newPasswordLabel.style.visibility = "visible";
    newPasswordInput.style.visibility = "visible";
    confirmNewPassInput.style.visibility = "visible";
    confirmPassLabel.style.visibility = "visible";
    savePasswordBtn.style.visibility = "visible";
});

saveEmailBtn.addEventListener("click", event => {
   console.log(`sending email changes to server`);
   newEmailInput.style.visibility = "hidden";
    saveEmailBtn.style.visibility = "hidden";
    newEmailBtn.style.visibility = "visible";
});

savePasswordBtn.addEventListener("click", event => {
    console.log(`sending password changes to server`);
    newPasswordLabel.style.visibility = "hidden";
    newPasswordInput.style.visibility = "hidden";
    confirmNewPassInput.style.visibility = "hidden";
    confirmPassLabel.style.visibility = "hidden";
    savePasswordBtn.style.visibility = "hidden";
    newPasswordBtn.style.visibility = "visible";
});