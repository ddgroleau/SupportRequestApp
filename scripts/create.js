// Modal Control - Create
const createBtn = document.getElementById("create");
const createModal = document.getElementById("createModal");
const span = document.getElementsByClassName("close")[0];

createBtn.addEventListener("click", event => {
    createModal.style.display = "block";
});

span.addEventListener("click", event => {
  createModal.style.display = "none";
});

window.addEventListener("click", event => {
  if (event.target == createModal) {
    createModal.style.display = "none";
  }
});
// End Modal Control - Create

// Event Listener To Allow User to Input Parent Project for Type: Project Subtask or Assign Request ID
document.getElementById("type").addEventListener("change", event => {
  const projectid = document.getElementById('projectid');
  const projectidlabel = document.getElementById('projectidlabel');
  const id = document.getElementById("id");
  if (document.getElementById("type").value === 'Project Subtask') {
    projectid.style.visibility = "visible";
    projectidlabel.style.visibility = "visible";
  } else {
    projectid.style.visibility = "hidden";
    projectidlabel.style.visibility = "hidden";
    // Assigns Request ID based on # of requests in the table
    const idCounter = async () => {
      const id = document.getElementById("id");
      const projectid = document.getElementById('projectid');
      const request = await fetch("/routes/requests");
      const response = await request.json();
      projectid.style.visibility = "hidden";
      if (response.length > 0) {
      let lastID = parseFloat(response[response.length-1].id);
      id.value = lastID + 1
      } else {
        id.value = 1001;
      }
    };
    idCounter();
      };
});

// Event Lister for Project ID Input
document.getElementById('projectid').addEventListener("change", async event => {
const projectid = document.getElementById('projectid').value;
document.getElementById('id').value = projectid;
const request = await fetch("/routes/requests");
const response = await request.json();
let yourProjectID = [];
for (item in response) {
  const idChecker = await response[item].id.toString().includes(projectid);
  if (idChecker == true) {
    yourProjectID.push(response[item].id);
    let projIDToNum = yourProjectID.map(i => parseFloat(i));
    let lastTask = Math.max(...projIDToNum)
    document.getElementById('id').value = (lastTask + 0.1).toString();
  };
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
// Gets Date
function todaysDate() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth()+1
    const yyyy = today.getFullYear();
    let date = "";
    if (mm < 10 && dd < 10) {
    date = `${yyyy}-0${mm}-0${dd}`;
    } else if (dd < 10) {
    date = `${yyyy}-${mm}-0${dd}`;
    } else if (mm < 10) {
      date = `${yyyy}-0${mm}-${dd}`;
    } else { 
    date = `${yyyy}-${mm}-${dd}`; 
    };
    document.getElementById("creationdate").value = date;
    document.getElementById("duedate").value = date;
    return date;
}
todaysDate();
// Gets Users
const listUsers = async () => {
    const request = await fetch("/routes/users");
    const users = await request.json();
    let def = document.createElement("option")
    def.textContent = "Choose a User";
    document.getElementById("assignedto").append(def);
  for (user in users) {
      let username = users[user].username;
      let option = document.createElement("option")
      option.textContent = username;
      document.getElementById("assignedto").append(option);
  }
};
listUsers()

function displayErr() {
if (document.getElementById('alertmsg').textContent == 'Looks like there was an error. Please check your entries and try again.') {
  createModal.style.display = "block";
  document.getElementById("alertmsg-container").style.visibility = "visible";
}
};
displayErr();