let isFirst = true;
let socket = null;

let flag = false;
let count = 1;

function main(event) {
    console.log('LIMBO STARTED');

    function initializeSocket() {

        if (socket?.readyState === WebSocket.OPEN) {
            socket.close();
            console.log('Connection closed');
        }
        
        socket = new WebSocket('ws://localhost:8080');

        socket.addEventListener('open', function(event) {
            console.log('Connected to server');
        });

    }

    async function decreaseAction( element ){
        element.click();
    }

    async function getResult(){

        const betResult = document.querySelector(".rocket-number span");
        
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(betResult.textContent);
        } else {
            console.error('Socket is not open');
        }

        const betNumber = betResult.textContent;
        const betAmount = document.querySelectorAll('.button-group button');

        if ( parseFloat( betNumber ) < 2 ){
            betAmount[1].click();
            count++;
        }
        else{
            if ( count > 1 ) {
                for ( var i = 0; i < count - 1; i++){
                    await decreaseAction(betAmount[0]);
                }
                count = 1;
            }
        }

        main();

    }

    function startBet() {

        const betButton = document.getElementsByClassName('bet-button');
        betButton[0].click();

        setTimeout( async function() {
            await getResult();
        }, 3000);
    }

    initializeSocket();

    if ( isFirst ) {
        setTimeout(function() {
            startBet();
        }, 15000);

        isFirst = !isFirst;

    }
    else {
        setTimeout(function() {
            startBet();
        }, 2500);
    }
}
  
window.addEventListener('load', main, false);
console.log('LIMBO');