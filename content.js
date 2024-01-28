  function highlightDarkPatterns(patterns) {
    patterns.forEach(pattern => {
      // Implement your logic to highlight the detected dark pattern
      pattern.element.style.border = '2px solid red';
    });
  }
  
  // Listen for messages from popup.js
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'detectDarkPatterns') {
      const detectedPatterns = detectDarkPatterns();
      chrome.runtime.sendMessage({ action: 'highlightDarkPatterns', patterns: detectedPatterns });
    }
  });
  