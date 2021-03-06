// Gets the current user from the current-user endpoint
const getUser = async () => {
    const request = await fetch("/routes/currentUser");
    const response = await request.json();
    const currentUser = response.username;
    return currentUser;
};
// Gets the requests assigned to the current user
const getRequests = async () => {
    const currentUser = await getUser();
    const request = await fetch("/routes/requests");
    const response = await request.json();
    const queue = [];
    for (item in response) {
        const assignedToUser = await response[item].assignedto;
        const lineStatus = await response[item].status;
        if (assignedToUser === currentUser && lineStatus === "Pending") {
            let userRequest = {
                id: response[item].id,
                type: response[item].type,
                category: response[item].category,
                creationdate: response[item].creationdate.slice(0,10),
                requestsummary: response[item].requestsummary,
                assignedto: response[item].assignedto,
                createdby:response[item].createdby,
                status:response[item].status,
                datedue:response[item].duedate.slice(0,10),
                comments:response[item].comments,
            }
            queue.push(userRequest);
        };
    };
    return queue;
};
// Generates a table on the DOM of all the requests assigned to the user
const generateTable = async () => {
    const queue = await getRequests();
    if (queue.length > 0) {
    for (row in queue) {
        const newRow = document.createElement("tr")
        for (const [key, value] of Object.entries(queue[row])) {
            const newCell = document.createElement("td")
            newCell.textContent = value;
            newRow.append(newCell);
            document.getElementById('queue').append(newRow);
        };
        
        let rowID = queue[row].id;
        
        let updateButton = document.createElement("button")
        updateButton.id = `update${rowID}`;
        updateButton.innerHTML = '<i class="fas fa-tools fa-lg"></i>';
        updateButton.title = "Update Comments";
        updateButton.setAttribute("class","updateButton");
        
        let resolveButton = document.createElement("button")
        resolveButton.id = `resolve${rowID}`;
        resolveButton.tile = "Complete Request";
        resolveButton.innerHTML = '<i class="fas fa-check fa-lg"></i>';
        resolveButton.setAttribute("class","resolveButton");

        let rejectButton = document.createElement("button")
        rejectButton.id = `reject${rowID}`;
        rejectButton.title = "Reject Request"
        rejectButton.innerHTML = '<i class="fas fa-skull fa-lg"></i>';
        rejectButton.setAttribute("class","rejectButton");
        
        let tools = document.createElement("td")
        tools.append(resolveButton);
        tools.append(updateButton);
        tools.append(rejectButton);
        newRow.append(tools);

    };
    } else {
        const newRow = document.createElement("tr")
        const singleCell = document.createElement("td")
        singleCell.textContent = "Your Queue is empty";
        singleCell.colSpan = 11;
        newRow.append(singleCell);
        document.getElementById('queue').append(newRow);
    };
};
// Adds event listers to the buttons in the users queue that allow them to peform read, update and delete actions
const toolBox = async () => {
    await generateTable();
    const currentUser = await getUser();
    const request = await fetch("/routes/requests");
    const response = await request.json();
    let requestIdArray = [];
    for (item in response) {
        const assignedToUser = await response[item].assignedto;
        const status = await response[item].status;
        if (assignedToUser === currentUser && status === "Pending") {
            requestIdArray.push({
                id: await response[item].id,
                comments: await response[item].comments,
            });
        };
    };
   for (item in requestIdArray) { 

    (function (id,comments) {
        // Updates Comments in your queue
        document.getElementById(`update${id}`).addEventListener("click", async () => {
                const updateID = id;
                const updateComments = comments;
                console.log(`sending to update menu ${updateID}...`);
                document.getElementById("updateModal").style.display = "block";
                document.getElementById("updateid").value = updateID;
                document.getElementById("updatecomments").value = updateComments;
            });
            
         document.getElementById(`resolve${id}`).addEventListener("click", async () => {
                const resolveID = { id: id };
                console.log(`updating status of ${resolveID.id}...`);
                const request = await fetch("/update/status/resolved", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(resolveID)
                });
                const response = await request.text();
                if (response == "resolved") {
                    location.reload();
                };
            });

            document.getElementById(`reject${id}`).addEventListener("click", async () => {
                const rejectID = { id: id };
                console.log(`rejecting ${rejectID.id}...`);
                const request = await fetch("/update/status/rejected", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(rejectID)
                });
                const response = await request.text();
                if (response == "rejected") {
                    location.reload();
                };
            });

            document.getElementById("saveUpdate").addEventListener("click", event => {
                document.getElementById("updateModal").style.display = "none";
              });

              window.addEventListener("click", event => {
                if (event.target == document.getElementById("updateModal")) {
                    document.getElementById("updateModal").style.display = "none";
                }
              });
    }(requestIdArray[item].id,requestIdArray[item].comments));

    };
};
toolBox();

