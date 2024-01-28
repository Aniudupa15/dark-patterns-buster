document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('scanButton').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      chrome.tabs.executeScript(currentTab.id, { code: 'document.documentElement.outerHTML' }, function (result) {
        var sourceCode = result[0];
        detectDarkPatterns(sourceCode);
      });
    });
  });

  function detectDarkPatterns(sourceCode) {
    // Read dark patterns from the dataset.txt file
    fetch('dataset.txt')
      .then(response => response.text())
      .then(patternsTxt => {
        var darkPatterns = patternsTxt.split('\n').map(pattern => pattern.trim()).filter(pattern => pattern !== '');

        var foundPatterns = darkPatterns.filter(function (pattern) {
          return sourceCode.includes(pattern);
        });

        displayResult(foundPatterns);
      })
      .catch(error => console.error('Error fetching dataset:', error));
  }

  function displayResult(foundPatterns) {
    var resultDiv = document.getElementById('result');
    if (foundPatterns.length > 0) {
      resultDiv.innerHTML = '<strong>Dark Patterns Detected:</strong><br>' + foundPatterns.join('<br>');
    } else {
      resultDiv.innerHTML = '<strong>No Dark Patterns Detected</strong>';
    }
  }
});
