// Gets the current user from the current-user endpoint
const getUser = async () => {
    const request = await fetch("/routes/currentUser");
    const response = await request.json();
    const currentUser = response.username;
    return currentUser;
};
// Gets # of Pending Requests Assigned to User
const getAssigned = async () => {
    const currentUser = await getUser();
    const request = await fetch("/routes/requests");
    const response = await request.json();
    let count1 = 0;
    for (item in response) {
    
        if (response[item].assignedto == currentUser && response[item].status === "Pending") {
            count1++
        };
    };
    return count1;
};
// Gets # of Pending Requests Created by User
const getCreated = async () => {
    const currentUser = await getUser();
    const request = await fetch("/routes/requests");
    const response = await request.json();
    let count2 = 0;
    for (item in response) {
        if (response[item].createdby == currentUser && response[item].status === "Pending" ) {
            count2++
        };
    };
    return count2;
};
// Renders Chart
const createAssignedChart = async () => {
const numAssigned = await getAssigned(); 
const numCreated  = await getCreated();  
const currentUser = await getUser();
   const ctx = document.getElementById('chart1').getContext('2d');
    const chart = new Chart(ctx, {
        label: 'Chart 1',
        type: 'bar',
        data: {
            labels: ['Assigned vs. Created'],
            datasets: [{
                label: ['Assigned'],
                data: [numAssigned],
                backgroundColor: [
                    'green',
                 ],
                borderColor: [
                    'black',
                ],
                borderWidth: 1
            },
            {
                label: ['Created'],
                data: [numCreated],
                backgroundColor: [
                    
                    'yellow',
                 ],
                borderColor: [
                    'black',
                ],
                borderWidth: 1
            }]
        },
    options: {
        responsive: true,
        aspectRatio: 1,
        maintainAspectRatio: true,
     scales: {
         yAxes: [{
         ticks: {
            min: 0, 
         },
        }]
     },
        title: {
            display: true,
            text: `${currentUser}'s Number of Open Requests: Assigned-To and Created-By`
        },
        layout: {
            padding: {
                left: 20,
                right: 500,
                top: 30,
                bottom: 900
            }
        }
    }
});
};
createAssignedChart();

// Gets Today's Date
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
    return date;
}

// Gets # of Resolved or Rejected Requests Assigned to User due in 0-5 days
const getCompleted = async () => {
    const currentUser = await getUser();
    const request = await fetch("/routes/requests");
    const response = await request.json();
    let count1 = 0;
    for (item in response) {
        let dueDate = new Date(response[item].duedate.slice(0,10).replace(/-/g,"/"));
        let today = new Date(todaysDate().replace(/-/g,"/"));
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (response[item].assignedto == currentUser && (diffDays <= 5 && diffDays >= 0) && (response[item].status === "Resolved" || response[item].status === "Rejected")) {
                count1++
            };
    };
    return count1;
};

// Gets # of Pending Requests Assigned to User due in 0-5 days
const getPending = async () => {
    const currentUser = await getUser();
    const request = await fetch("/routes/requests");
    const response = await request.json();
    let count1 = 0;
    for (item in response) {
        let dueDate = new Date(response[item].duedate.slice(0,10).replace(/-/g,"/"));
        let today = new Date(todaysDate().replace(/-/g,"/"));
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (response[item].assignedto == currentUser && (diffDays <= 5 && diffDays >= 0) && (response[item].status === "Pending")) {
                count1++
            };
    };
    return count1;
};

// Renders Chart
const dueCurrentWeek = async () => {
    const numPending = await getPending(); 
    const numCompleted = await getCompleted();
    const currentUser = await getUser();
       const ctx = document.getElementById('chart2').getContext('2d');
        const chart = new Chart(ctx, {
            label: 'Chart 2',
            type: 'doughnut',
            data: {
                labels: ['Open','Completed'],
                datasets: [{
                    labels: ['Blank'],
                    data: [numPending, numCompleted],
                    backgroundColor: [
                        'yellow',
                        'green',
                     ],
                    borderColor: [
                        'black',
                        'black',
                    ],
                    borderWidth: 1
                }]
            },
        options: {
            responsive: true,
            aspectRatio: 1,
            maintainAspectRatio: true,
         scales: {
             yAxes: [{
             ticks: {
                min: 0, 
             },
            }]
         },
            title: {
                display: true,
                text: `${currentUser}'s Number of Requests Due within 5 Days: Open vs. Completed`
            },
            layout: {
                padding: {
                    left: 20,
                    right: 500,
                    top: 30,
                    bottom: 900
                }
            }
        }
    });
    };
    dueCurrentWeek();