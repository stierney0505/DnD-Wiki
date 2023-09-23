// This file exists to create a table dynamically, as well as hold any necessary helper methods

/*generateDyanmicTable takes two parameters, data and callback 
data parameter is required and it is JSON file containing data, 
--FORMATING GUIDE TODO BECAUSE LIABLE FOR CHANGE--
callback parameter is not required, it is a function that should execute any required 
functions on the table after table creation such as implementing jquery tablesorter*/
function generateDynamicTable(headerPath, dataPath, callback, headersID) {
    return new Promise((resolve, reject) => {
        let headers, data;
        Promise.all([ //Ensures that the functions waits until it has the data from the fetch calls
            fetch(headerPath).then(response => response.json()),
            fetch(dataPath).then(response => response.json())
        ]).then(results => {
            headers = results[0];
            headers = headers[headersID];
            data = results[1];
            data = data[Object.keys(data)[0]];

            const table = document.createElement('table');
            let columns = 0;

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

            for (let rowData in data) {
                rowData = data[rowData];
                const tr = document.createElement('tr');
                for (i = 0; i < columns; i++) { //TODO add overloaded sort method from other JS Files
                    const td = document.createElement('td');
                    td.appendChild(sort(rowData[headers[i]], headers[i]));
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }

            table.appendChild(tbody);
            table.className = "table table-dark";
            table.id = "targetTable"

            const tableContainer = document.getElementById('table-container');
            tableContainer.appendChild(table);

            if (typeof callback === 'function') {
                callback();
            }

            activateTable();
            resolve();
        }).catch(error => reject(error));
    });
}


/*This function will take a url for the data file (dataPath), the name of the header that will be checked in the 
modification of the table (headerName), and the value that should be in the column specified by the header (colValue)*/
function modifyTable(dataPath, headerName, colValue) {
    let table = document.getElementById("targetTable");
    let newValues = {};
    let names = [];
    Promise.all([ //Ensures that the functions waits until it has the data from the fetch calls
        fetch(dataPath).then(response => response.json())
    ]).then(results => {
        let data = results[0];
        data = data[Object.keys(data)[0]];

        for (let rowData in data) {
            rowData = data[rowData];
            if (rowData[headerName].includes(colValue)) {
                newValues[rowData["Name"]] = rowData;
                names.push(rowData["Name"]); //The names should always be appear first in the json files, so using rowData[0] should get the names
            }
        }

        let i = 1;
        let row;
        while (i < table.rows.length) { //This will run until the remaining rows in the table is equal to i indicating that all the rows have been checked  
            row = table.rows[i]
            if (!names.includes(row.querySelector("td").innerText)) //If the value of in the row does not exist in the names array remove the value
                row.remove();
            else { //otherwise if if exists move on the the next value by incrementing i and remove the value from newValues array
                i++;
                delete newValues[row.querySelector("td").innerText];
            }
        }


        if (Object.keys(newValues).length > 0) {
            let columns = table.rows[0].cells.length;


            let headers = [];
            for (let j = 0; j < columns; j++)
                headers.push(table.rows[0].cells[j].innerText);


            const tbody = table.getElementsByTagName("tbody")[0];

            for (let rowData in newValues) {
                rowData = newValues[rowData];
                const tr = document.createElement('tr');
                for (i = 0; i < columns; i++) { //TODO add overloaded sort method from other JS Files
                    const td = document.createElement('td');
                    td.appendChild(sort(rowData[headers[i]], headers[i]));
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
        }
        $("#targetTable").trigger("update");
    });
}
