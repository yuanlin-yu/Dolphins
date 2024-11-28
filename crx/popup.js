const toggle = document.getElementById('toggleSwitch');

toggle.addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
          action: "toggle"
      }, function(response) {
          // 可以在这里处理 content script 的响应
          console.log('Received response from content script:', response);
      });
  });
})
