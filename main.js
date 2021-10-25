// Denna fil ska innehålla er lösning till projektuppgiften.

"use strict";

/*  Delar till ej obligatorisk funktionalitet, som kan ge poäng för högre betyg
*   Radera rader för funktioner du vill visa på webbsidan. */
document.getElementById("player").style.display = "none";      // Radera denna rad för att visa musikspelare
document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

/* Här under börjar du skriva din JavaScript-kod */


//get the api
window.onload = getChannels;
/* funkade ej let startTime = new Date(parseInt(jsonDate.substr(6)));
let endTime = new Date()
console.log(date); 
const d = new Date();
console.log(d); */
// document.getElementById("demo").innerHTML = d.getTime();

//getChannels är funktionen
function getChannels() {
    //url vi ska hämta
    fetch("https://api.sr.se/api/v2/channels/?format=json")
        //fetch("student.json")
        //fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            console.log(data);

            //presenting the data from api to html document with a forloop
            for (let i = 0; i < data.channels.length; i++) {
                //and formatting it in an unordered list
                document.getElementById("mainnavlist").innerHTML +=

                    //writing out the channels and then saving the id to use it later
                    "<li id=" + data.channels[i].id + " title =' " + data.channels[i].tagline
                    + "'>" + data.channels[i].name + "</li>";
            }

            let channelsEl = document.getElementsByTagName("li");

            //loop för varje li och en eventlyssnare
            for (let i = 0; i < channelsEl.length; i++) {
                //event listener when clicking on channel and starting loadscheduleepisode function
                channelsEl[i].addEventListener("click", function (event) {
                    loadScheduleEpisode(event);
                });
            }
        })

}
//running function to load the timetable
function loadScheduleEpisode(event) {
    console.log("hej");
    //channelId to target the id selction when clicking a channel
    let channelId = event.target.id;
    //kollar så rätt kanal kommer ut
    console.log("här kommer kanalnr ut" + channelId);
    //api fetch with the right channel id */
    fetch("https://api.sr.se/api/v2/scheduledepisodes?channelid=" + channelId + "&format=json&pagination=false")
        .then(res => res.json())
        .then(data => {
            //console.log(data);

            //emptying info between the channelclicks
            document.getElementById("info").innerHTML = "";


            /* for-loop to write the information at info from the different parameters
            in the api and formatting the text */
            for (let i = 0; i < data.schedule.length; i++) {
                //läsa ut datum och tid från tablån
                let startTime = data.schedule[i].starttimeutc;
                //ny variabel som gör om starttime 
                let startTimeEl = new Date(parseInt(startTime.substr(6)));
                //what time the program starts
                let startMillisec = parseInt(startTime.substr(6));
                //variabel som hämtar starttimmar. skriv ut som timmar:minuter. lägg på nollor
                let startTimeHours = startTimeEl.getHours();
                //skapa variabel för startminuter
                let startTimeMinutes = startTimeEl.getMinutes();
                //variabel för sluttid
                let endTime = data.schedule.endtimeutc;
                //gör om sluttid
                // let endTimeEl = new Date(parseInt(endTime.substr(6)));
                // och en till
                let endMillisec = parseInt(endTime.substr(6));
                //läs ut datum/klockslag nu
                //what time it is now
                let nowMillisec = Date.now();

                //if sats. om startdatum är högre än datum/klockslag nu continue;
                // då hoppas program över
                if (startTimeHours < nowMillisec) { continue; } {
                    console.log("programmet har redan varit");
                    //konvertera datum snyggt

                document.getElementById("info").innerHTML += "<h3>" +
                data.schedule[i].title + "</h3>" + "<p>" + startTimeHours +
            /*data.schedule[i].starttimeutc +*/ "<p>" + " - " +
                data.schedule[i].endtimeutc + "<p>" +
                data.schedule[i].description + "</p>";
                }

                

            }

        })
}


