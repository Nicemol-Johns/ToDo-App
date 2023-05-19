function getData(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            var response = JSON.parse(this.responseText);
            const tableBody = document.getElementById('table-body');

            for(var i=0;i<20;i++){
                
                //create row
                const row = document.createElement('tr');

                // create first column
                const rowNumber = document.createElement('th');
                rowNumber.setAttribute('scope', 'row');
                rowNumber.textContent = response[i].id; // 
                
                //create second column
                const task = document.createElement('td');
                task.setAttribute('colspan', '2');
                task.textContent = response[i].title;
      
                //create third column
                const statusColumn = document.createElement('td');
                statusColumn.className = "inner-column"
                //create checkbox
                const status = document.createElement('INPUT');
                //add checkbox to column three
                statusColumn.appendChild(status)
                status.setAttribute("type","checkbox");
                status.className = "checkboxStyle"
                //check if the status is completed if yes then disable the checkbox
                function check(currentStat){
                    if(currentStat == true){
                        status.disabled = true;
                        status.classList.add("selected-row");
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                status.checked = check(response[i].completed);
      
                // Append columns to the row
                row.appendChild(rowNumber);
                row.appendChild(task);
                row.appendChild(statusColumn);
      
                // Append the row to the table body
                tableBody.appendChild(row);

            }

        }
        var count = 0;
        //get all the checkboxes
        const table = document.querySelector('.outer-table');
        const checkboxes = table.querySelectorAll('.inner-column input[type="checkbox"]');
        checkboxes.forEach(checkbox=>{
            //listen to the checkbox
            checkbox.addEventListener('change',()=>{
                let promise = new Promise((resolve,reject)=>{
                    if (checkbox.checked){
                        resolve("checked");
                    }else{
                        reject("unchecked")
                    }
                })
                //action to be done if checked
                promise.then((value)=>{
                    console.log(value);
                    count++;
                    console.log(`checked: ${count}`)
                    return count;
                }).then(count =>{ //action to be done if 5 tasks are checked
                    if(count==5){
                        setTimeout(() => {
                            alert("Congrats. 5 Tasks have been Successfully Completed");
                        }, 500);
                    }
                })
                promise.catch((error)=>{
                    console.log(error);
                    count--;
                    console.log(`unchecked: ${count}`)
                })
            })
        })
    }
    xhttp.open("GET","https://jsonplaceholder.typicode.com/todos",true);
    xhttp.send();
}