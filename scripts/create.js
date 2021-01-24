// Global Variables
const createBtn = document.getElementById("create");
const createModal = document.getElementById("createModal");
const span = document.getElementsByClassName("close")[0];

// Event Listeners
createBtn.addEventListener("click", event => {
    createModal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", event => {
  createModal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", event => {
  if (event.target == createModal) {
    createModal.style.display = "none";
  }
});

// Assigns Request ID based on # of requests in the table
const idCounter = async () => {
  const request = await fetch("/routes/requests");
  const response = await request.json();
  let count = 1;
  document.getElementById("projectid").style.visibility = "hidden";
  for (item in response) {
      count++;
  }
  document.getElementById("id").value= count;
  return count;
};
idCounter();

document.getElementById("type").addEventListener("change", async event => {
    if (document.getElementById("type").value == "Project Sub-Task") {
        document.getElementById("projectid").style.visibility = "visible";
        document.getElementById("projectid").value= "";
        const request = await fetch("/routes/requests");
        const response = await request.json();
        let count = 1;
        for (item in response) {
        count++; 
    }
    document.getElementById("id").value = document.getElementById("projectid").value;
    };
});

// Gets Username and Assigns it to "Created-By" Field
const creator = async () => {
    const request = await fetch("/routes/currentUser");
    const response = await request.json();
    const currentUser = response.username;
    document.getElementById("createdby").value = currentUser;
    return currentUser;
};
creator();

function todaysDate() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth()+1
    const yyyy = today.getFullYear();
    let date = "";
    if (mm < 10) {
    date = `${yyyy}-0${mm}-${dd}`;
    } else { 
    date = `${yyyy}-${mm}-${dd}`; 
    };
    document.getElementById("creationdate").value = date;
    return date;
}
todaysDate();

const listUsers = async () => {
    const request = await fetch("/routes/users");
    const users = await request.json();
  for (user in users) {
      let username = users[user].username;
      let option = document.createElement("option")
      option.textContent = username;
      document.getElementById("assignedto").append(option);
  }
};
listUsers()