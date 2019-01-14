// Fanny Ståhl 2018
// Rest_api for Stäkvikens samfällighet

"use strict";

let apiURL: string = "http://localhost/wIII_rest/avlopp.php/kontroll/";
let sPath: string = window.location.pathname;
let sPage: string = sPath.substring(sPath.lastIndexOf('/') + 1)

// Event listener when dom is loaded
document.addEventListener("DOMContentLoaded", function(){ // Wait for DOM tree to get parsed

    if(sPage == "form.html") {

        // Send information - POST
        document.getElementById("add").addEventListener("click", function(ev){
            
            // Get values
            let fname: string = (<HTMLInputElement>document.getElementById("firstname")).value;
            let lname: string = (<HTMLInputElement>document.getElementById("lastname")).value;
            let cdate: string = (<HTMLInputElement>document.getElementById("control-date")).value;
            let cpoint: string = (<HTMLInputElement>document.getElementById("control-point")).value;
            let cstatus: string;
            let ccomment: string = (<HTMLInputElement>document.getElementById("control-comment")).value;

            // Check if control-status is checked, otherwise assign "" to cstatus
            if (<HTMLInputElement>document.querySelector(".control-status:checked")){
                cstatus= (<HTMLInputElement>document.querySelector(".control-status:checked")).value; 
            } else {
                cstatus = "";
            }

            if(fname == '' || lname == '' || cdate == '' || cstatus == ''){
                let formMessages: HTMLElement = document.getElementById("form-messages");
                formMessages.innerHTML = "";

                if(fname == ''){
                    formMessages.innerHTML += "<li><i class='fas fa-exclamation-triangle'></i> Du måste fylla i ditt förnamn!</li>"
                }

                if(lname == ''){
                    formMessages.innerHTML += "<li><i class='fas fa-exclamation-triangle'></i> Du måste fylla i ditt efternamn!</li>"
                }

                if(cdate == ''){
                    formMessages.innerHTML += "<li><i class='fas fa-exclamation-triangle'></i> Du måste fylla i datum!</li>"
                }

                if(cstatus == ''){
                    formMessages.innerHTML += "<li><i class='fas fa-exclamation-triangle'></i> Du måste ange status!</li>"
                }  

                window.scrollTo(0, 0);


            } else {
               
                let json = {"fname": fname, "lname": lname, "cdate": cdate, "cpoint": cpoint, "cstatus": cstatus, "ccomment": ccomment};

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", apiURL, true);
                xmlhttp.setRequestHeader('Content-Type', 'application/json');
                xmlhttp.send( JSON.stringify(json) );

                xmlhttp.onload = function() {
                    location.reload();
                }
            }

        })

    }

    if(sPage == "egenkontroll.html") {
        
        // Show reports, GET
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
            if (xmlhttp.status == 200) {

                    var jsonData = JSON.parse( xmlhttp.responseText );
                    let $statusI: string = "<i class='fas fa-times'></i>";
                    let $commentN: string = '';

                    for(var i=0; i < jsonData.length; i++){
                        
                    
                        // Checks if Status is "Y", default is other ("N")
                        if (jsonData[i].Cstatus == "Y") {
                            $statusI = "<i class='fas fa-check'></i>"
                        } else {
                            $statusI = "<i class='fas fa-times'></i>";
                        }

                        // Check if Ccomment is not null
                        if (jsonData[i].Ccomment !== null) {
                            $commentN = "<li>" + jsonData[i].Ccomment + "</li>";
                        } else {
                            $commentN = '';
                        }

                        // Write out to report list
                        document.getElementById("report-list").innerHTML +=
                            
                        "<ul class='reports'><li><span class='name'>" 
                        + jsonData[i].Lname + " " + jsonData[i].Fname + "</span><span class='date'>" + jsonData[i].Cdate + 
                        "</span></li><li class='"         
                        + jsonData[i].Cstatus + "'>" + $statusI
                        + jsonData[i].Cpoint + "</li class='r-comment'>" + $commentN + "</ul>"; 
                    
                    }
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
            }
        };

        xmlhttp.open("GET", apiURL, true);
        xmlhttp.send();
    }

}); 
