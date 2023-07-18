// Get the scrape button and output div
var scrapeButton = document.getElementById('scrapeButton');
var outputDiv = document.getElementById('output');

// Add a click event listener to the scrape button
scrapeButton.addEventListener('click', function() {
  // Send a message to the content script to scrape the <p> tags
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'scrape' }, function(response) {

      const socket = new WebSocket('ws://localhost:8080');

      socket.addEventListener('open', function(event) {
        console.log('Connected to server');
        socket.send( response.text );
      });
      
      socket.addEventListener('message', function(event) {
        console.log('Server says:', event.data);
      });
        
      // Display the scraped text in the output div
      outputDiv.innerHTML = response.text;
    });
  });
});