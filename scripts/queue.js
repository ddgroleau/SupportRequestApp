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
        if (assignedToUser === currentUser) {
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
        };
        
        let rowID = queue[row].id;
        
        let updateButton = document.createElement("button")
        updateButton.id = `update${rowID}`;
        updateButton.textContent = "New Comment"
        updateButton.setAttribute("class","updateButton");
        
        let rejectButton = document.createElement("button")
        rejectButton.id = `reject${rowID}`;
        rejectButton.textContent = "Delete"
        rejectButton.setAttribute("class","rejectButton");
        document.getElementById('queue').append(newRow);
        
        let resolveButton = document.createElement("button")
        resolveButton.id = `resolve${rowID}`;
        resolveButton.textContent = "Complete"
        resolveButton.setAttribute("class","resolveButton");
        document.getElementById('queue').append(newRow);
        
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
        singleCell.colSpan = 10;
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
        if (assignedToUser === currentUser) {
            requestIdArray.push({
                id: await response[item].id,
                comments: await response[item].comments,
            });
        };
    };
   for (item in requestIdArray) {
       (function (id,comments) {
            
        document.getElementById(`update${id}`).addEventListener("click", async () => {
                const updateID = id;
                const updateComments = comments;
                console.log(`sending to update menu ${updateID}...`);
                document.getElementById("updateModal").style.display = "block";
                document.getElementById("updateid").value = updateID;
                document.getElementById("updatecomments").value = updateComments;
            });
            
        document.getElementById(`reject${id}`).addEventListener("click", () => {
                const rejectID = id;
                console.log(`deleting ${rejectID}...`);
             });
            
         document.getElementById(`resolve${id}`).addEventListener("click", () => {
                const resolveID = id;
                console.log(`updating status of ${resolveID}...`);
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

