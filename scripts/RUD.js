const getRequests = async (currentUser) => {
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
    const generateTable = () => {
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
        updateButton.textContent = "Update"
        updateButton.setAttribute("class","updateButton");
        let deleteButton = document.createElement("button")
        deleteButton.id = `delete${rowID}`;
        deleteButton.textContent = "Delete"
        deleteButton.setAttribute("class","deleteButton");
        document.getElementById('queue').append(newRow);
        let tools = document.createElement("td")
        tools.append(updateButton)
        tools.append(deleteButton)
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
generateTable();
};

const getUser = async () => {
    const request = await fetch("/routes/currentUser");
    const response = await request.json();
    const currentUser = response.username;
    await getRequests(currentUser);
    return currentUser;
};

const toolBox = async () => {
    const currentUser = await getUser();
    const request = await fetch("/routes/requests");
    const response = await request.json();
    let requestIdArray = [];
    for (item in response) {
        const assignedToUser = await response[item].assignedto;
        if (assignedToUser === currentUser) {
            requestIdArray.push(await response[item].id);
        };
    };
   for (item in requestIdArray) {
       (function (id) {
            document.getElementById(`update${id}`).addEventListener("click", () => {
                const updateID = id;
                console.log(updateID);
    });
    document.getElementById(`delete${id}`).addEventListener("click", () => {
        const deleteID = id;
        console.log(deleteID);
});
    }(requestIdArray[item]));
    };
};
toolBox();

