 function createStopWatch(element){
    // createStopWatch will create a stopwtach display as the child of the given
    // element.

    
    element.insertAdjacentHTML("afterbegin",
        "\
            <h1>Stop Watch</h1>\
            <div class=row>\
                <h2> HH:MM::SS,S</h2>\
            </div>\
            <h2 class='watchEl' id='curTimer'> 99:99:99,9 </h2>\
            <div class='row'>\
            <button id='startButton'>Start/Reset</button>\
            <button id='stopButton'>Stop</button>\
            </div>\
        "
    )

    //  https://gist.github.com/vankasteelj/74ab7793133f4b257ea3
    function sec2time(timeInSeconds) {
        var pad = function(num, size) { return ('000' + num).
                slice(size * -1); },
        time = parseFloat(timeInSeconds).toFixed(3),
        hours = Math.floor(time / 60 / 60),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60),
        milliseconds = time.slice(-3);

        return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + 
            pad(seconds, 2) + ',' + pad(milliseconds, 1);
    }

    function updateStoppedTimers (stoppedTimersList, listOfTimers){
        // add new timer to The List of Timers

        // create new list item
        var listItem = document.createElement("li");
        listItem.className = "stoppedTimer";
        var text = document.createTextNode(stoppedTimersList[0]);
        listItem.appendChild(text);
        
        // add list item to html list
        listOfTimers.prepend(listItem);

        // list items
        listItems = document.getElementsByClassName("stoppedTimer");
        
        // if the list is over 5 long remove items until it is not.
        while (listItems.length > 5) {
                listItems[5].remove();
            }
        }

    var finishedTimers = []

    var timerList = document.getElementById("stoppedTimersList")

    var mainStopWatch = {
        watchTimeText: document.getElementById("curTimer"),
        running: false
    }

    
    //add event listener to startButton
    document.getElementById("startButton").
        addEventListener("click", function (event){
            
            mainStopWatch.startDate = new Date();
            mainStopWatch.running = true;
        
        })
    
    // add event listener to stop button
    document.getElementById("stopButton").
        addEventListener("click", function (params) {
        
        stopTimer = mainStopWatch.watchTime
        mainStopWatch.running = false;
        finishedTimers.unshift(stopTimer)
        finishedTimers = finishedTimers.slice(0,4)
        updateStoppedTimers(finishedTimers, timerList)

    });



    window.setInterval(() => {

        if (mainStopWatch.running) {
            
            // if the main stopwatch is running update the timer
            var nowDate = new Date();
            diffTime = nowDate.getTime() - 
                    mainStopWatch.startDate.getTime();
            watchTime =   sec2time(diffTime / 1000);
            mainStopWatch.watchTime = watchTime
            mainStopWatch.watchTimeText.innerHTML = 
                mainStopWatch.watchTime 
        }

    }, 10);
};
