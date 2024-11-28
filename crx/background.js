var notesData = '';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "download") {
      chrome.downloads.download({
        url: request.url,
        filename: 'photos/'+request.filename
      }, function(downloadId) {
        if (chrome.runtime.lastError) {
          console.log("Download failed: " + chrome.runtime.lastError);
        } else {
          console.log("Download started: " + downloadId);
        }
      });
    }

    if (request.action === "downloadDocx") {
      chrome.downloads.download({
        url: request.url,
        filename: `notes-${new Date().getTime()}.docx`
      }, function(downloadId) {
        if (chrome.runtime.lastError) {
          console.log("Download failed: " + chrome.runtime.lastError);
        } else {
          console.log("Download started: " + downloadId);
        }
      });
    }

    if (request.action === "notes-save") {
      notesData = request.data
    }
    if (request.action === "notes-read") {
      var response = { data: notesData };
      sendResponse(response);
    }
});
