// This file exists to create a table dynamically, as well as hold any necessary helper methods

/*generateDyanmicTable takes two parameters, data and callback 
data parameter is required and it is JSON file containing data, 
--FORMATING GUIDE TODO BECAUSE LIABLE FOR CHANGE--
callback parameter is not required, it is a function that should execute any required 
functions on the table after table creation such as implementing jquery tablesorter*/
function generateDynamicTable(data, callback) {
    const table = document.createElement('table');
    let columns = 0;
    headers = data.headers;

    // Add headers
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(headerText));
        tr.appendChild(th);
        columns++;
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    // Add rows
    const tbody = document.createElement('tbody');
    data.spells.forEach(rowData => {
        const tr = document.createElement('tr');
        for (i = 0; i < columns; i++) { //TODO add overloaded sort method from other JS Files
            const td = document.createElement('td');
            td.appendChild(sort(rowData[headers[i]])); 
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    table.className = "table table-dark";
    table.id = "targetTable"

    const tableContainer = document.getElementById('table-container');
    tableContainer.appendChild(table);

    if (typeof callback === 'function') {
        callback();
    }
}
