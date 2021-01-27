//Modal Control for Search Modal
document.getElementById("searchRequest").addEventListener("click", event => {
    document.getElementById("searchModal").style.display = "block";
    
});

document.getElementById("closeSearch").addEventListener("click", event => {
    document.getElementById("searchModal").style.display = "none";
    document.getElementById("searchtable").innerText = "";
    document.getElementById("searchid").value = "";
    document.getElementById("searchassignee").value = "";
    document.getElementById("searchcreator").value = "";
  });

  window.addEventListener("click", event => {
    if (event.target == document.getElementById("searchModal")) {
        document.getElementById("searchModal").style.display = "none";
        document.getElementById("searchtable").innerText = "";
        document.getElementById("searchid").value = "";
        document.getElementById("searchassignee").value = "";
        document.getElementById("searchcreator").value = "";
    }
  });
  // End Modal Control

  // Builds Search Result Table Header
  function createTableHeader() {
    const firstRow = document.createElement("tr")
    const columns = {
    requestId: "Request ID",
    type: "Type",
    category: "Category",
    creationdate: "Creation Date",
    requestsummary: "Request Summary",
    duedate: "Date Due",
    comments: "Comments",
    status: "Status",
    assignedto: "Assigned To",
    createdby: "Created By"
    };
    for (const [key, value] of Object.entries(columns)) {
      const cell = document.createElement("th")
      cell.textContent = value
      firstRow.append(cell);
      document.getElementById('searchtable').append(firstRow);
    };
  };

  // Builds Search Result Table Row if no results
  function noValue() {
    const noValueRow = document.createElement("tr")
    const noValueCell = document.createElement("td")
    noValueCell.colSpan = 10;
    noValueCell.textContent = "No Results."
    noValueRow.id = "novalue";
    noValueRow.append(noValueCell);
    document.getElementById('searchtable').append(noValueRow);
  };
  
// Event Listener if search by ID
function searchByID(elementID,btnID) {
  document.getElementById(btnID).addEventListener("click", async () => {
    document.getElementById("searchtable").innerText = "";
      const request = await fetch("/routes/requests");
      const response = await request.json();
      const searchID = document.getElementById(elementID).value;
        if (searchID.length > 0) {
          createTableHeader();
          noValue();
            for (item in response) {
              if (response[item].id.toString().includes(searchID)) {
                const noValue = document.getElementById("novalue");
                  if (noValue) {
                    document.getElementById('searchtable').removeChild(noValue)
                  };
                  const newRow = document.createElement("tr")
                  for (const [key, value] of Object.entries(response[item])) {
                    if (key === "creationdate" || key === "duedate") {
                      const newCell = document.createElement("td")
                      newCell.textContent = value.slice(0, 10);
                      newRow.append(newCell);
                      document.getElementById('searchtable').append(newRow);
                    } else {
                      const newCell = document.createElement("td")
                      newCell.textContent = value
                      newRow.append(newCell);
                      document.getElementById('searchtable').append(newRow);
                      };
                  };
              };
            };
        };
      document.getElementById("searchid").value = "";
    });
  }  
  
  // Event Listener if search by Creator
function searchByCreator(elementID,btnID) {
  document.getElementById(btnID).addEventListener("click", async () => {
    document.getElementById("searchtable").innerText = "";
      const request = await fetch("/routes/requests");
      const response = await request.json();
      const searchID = document.getElementById(elementID).value;
        if (searchID.length > 0) {
          createTableHeader();
          noValue();
            for (item in response) {
              if (response[item].createdby.toString().includes(searchID)) {
                const noValue = document.getElementById("novalue");
                  if (noValue) {
                    document.getElementById('searchtable').removeChild(noValue)
                  };
                  const newRow = document.createElement("tr")
                  for (const [key, value] of Object.entries(response[item])) {
                    if (key === "creationdate" || key === "duedate") {
                      const newCell = document.createElement("td")
                      newCell.textContent = value.slice(0, 10);
                      newRow.append(newCell);
                      document.getElementById('searchtable').append(newRow);
                    } else {
                      const newCell = document.createElement("td")
                      newCell.textContent = value
                      newRow.append(newCell);
                      document.getElementById('searchtable').append(newRow);
                      };
                  };
              };
            };
        };
      document.getElementById("searchid").value = "";
    });
  }  

  // Event Listener if search by Assignee
function searchByAssignee(elementID,btnID) {
  document.getElementById(btnID).addEventListener("click", async () => {
    document.getElementById("searchtable").innerText = "";
      const request = await fetch("/routes/requests");
      const response = await request.json();
      const searchID = document.getElementById(elementID).value;
        if (searchID.length > 0) {
          createTableHeader();
          noValue();
            for (item in response) {
              if (response[item].assignedto.toString().includes(searchID)) {
                const noValue = document.getElementById("novalue");
                  if (noValue) {
                    document.getElementById('searchtable').removeChild(noValue)
                  };
                  const newRow = document.createElement("tr")
                  for (const [key, value] of Object.entries(response[item])) {
                    if (key === "creationdate" || key === "duedate") {
                      const newCell = document.createElement("td")
                      newCell.textContent = value.slice(0, 10);
                      newRow.append(newCell);
                      document.getElementById('searchtable').append(newRow);
                    } else {
                      const newCell = document.createElement("td")
                      newCell.textContent = value
                      newRow.append(newCell);
                      document.getElementById('searchtable').append(newRow);
                      };
                  };
              };
            };
        };
      document.getElementById("searchid").value = "";
    });
  }  
  
  searchByID("searchid","searchidBtn");
  searchByCreator("searchcreator","searchcreatorbtn");
  searchByAssignee("searchassignee","searchassigneebtn");