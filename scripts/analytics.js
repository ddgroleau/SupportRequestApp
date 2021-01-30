// Gets the current user from the current-user endpoint
const getUser = async () => {
    const request = await fetch("/routes/currentUser");
    const response = await request.json();
    const currentUser = response.username;
    return currentUser;
};

const getAssigned = async () => {
    const currentUser = await getUser();
    const request = await fetch("/routes/requests");
    const response = await request.json();
    let count1 = 0;
    for (item in response) {
        if (response[item].assignedto == currentUser) {
            count1++
        };
    };
    return count1;
};

const getCreated = async () => {
    const currentUser = await getUser();
    const request = await fetch("/routes/requests");
    const response = await request.json();
    let count2 = 0;
    for (item in response) {
        if (response[item].createdby == currentUser) {
            count2++
        };
    };
    return count2;
};

const createAssignedChart = async () => {
const numAssigned = await getAssigned(); 
const numCreated  = await getCreated();  
const currentUser = await getUser();
   const ctx = document.getElementById('chart1').getContext('2d');
    const chart = new Chart(ctx, {
        label: `${currentUser}'s Requests`,
        type: 'bar',
        data: {
            labels: ['Assigned', 'Created'],
            datasets: [{
                label: false,
                data: [1,2],
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 0.5
            }]
        },
    options: {
        responsive: true,
        aspectRatio: 1,
        maintainAspectRatio: true,
     scales: {
         xAxes: [{
         ticks: {
            min: 0, 
         },
        }]
     },
        title: {
            display: true,
            text: 'Custom Chart Title'
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