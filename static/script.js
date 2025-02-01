// Array to store application data
const applications = [];

function add_application() {
    const name = document.getElementById('name').value;
    const zipcode = document.getElementById('zipcode').value;
    const app_number = 0;
    const status = 'recieved';

    const application = {
        name: name,
        zipcode: zipcode,
        app_number: app_number,
        status: status
    };

    applications.push(application);

    // Send the application data to the server via POST request
    fetch('/api/add_application', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(application)
    })
        .then(response => response.json())
        .then(data => {
            display_return(data)
        })
        .catch(error => {
            console.error('Error adding application:', error);
        });
}

// Function to fetch and display an application's status
function check_status() {
    const number = document.getElementById('application_number_0').value;
    let send = {'app_number': number}

    fetch('/api/check_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(send)
    })
        .then(response => response.json())
        .then(data => {
            display_return(data);
        })
        .catch(error => {
            console.error('Error fetching application:', error);
        });
}

// Function to fetch, change, and display an application's status
function change_status() {
    const number = document.getElementById('application_number_1').value;
    const status = document.getElementById('new_status').value;
    let send = {'app_number': number, 'status': status}

    fetch('/api/change_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(send)
    })
        .then(response => response.json())
        .then(data => {
            display_return(data);
        })
        .catch(error => {
            console.error('Error fetching application:', error);
        });
}

function display_return(data)
{
    const ret = document.getElementById('return');
    ret.innerHTML = '';

    if (data.outcome == 'success')
    {
        ret.innerHTML = `
                        ${data.message}<br>
                        Name: ${data.name}<br>
                        Application Number: ${data.app_number}<br>
                        Status: ${data.status}
                        `;
    }
    else if (data.outcome == 'fail')
    {
        ret.innerHTML = `${data.message}`;
    }
}