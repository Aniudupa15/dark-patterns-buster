chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'highlightDarkPatterns') {
      chrome.tabs.sendMessage(sender.tab.id, { action: 'highlightDarkPatterns', patterns: request.patterns });
    }
  });
  