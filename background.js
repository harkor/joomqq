chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    
    if(tab.url.indexOf('https://m.joomqq.com/#/taskcenter?task_id=') == 0){

      chrome.tabs.sendMessage(tabId, {text: "are_you_there_content_script?"}, function(msg) {
        msg = msg || {};
        if (msg.status != 'yes') {
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./foreground.js"]
          })
          .then(() => {
            
            chrome.scripting.insertCSS({
              target: { tabId: tabId },
              files: ["./foreground.css"]
            }).then(() => {
              console.log("CSS INJECTED");
            });

            console.log("INJECTED THE FOREGROUND SCRIPT.");

          })
          .catch(err => console.log(err));
        }
      });

    }
  }

});
