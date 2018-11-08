function countdown() {   
    var seconds = document.getElementById("seconds").value;  
        
    function tick() {         
        timer.innerHTML = seconds;
        if(seconds > 0) {
            seconds = seconds - 1;
            setTimeout(tick, 1000); 
        }   
        else {  
            alert("Time's up!");
        }   
        
    }     
    tick();
}