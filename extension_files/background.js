function reddenPage() {
  /*
  document.body.style.backgroundColor = 'lime';
  let centerX = document.documentElement.clientWidth / 2;
  let centerY = document.documentElement.clientHeight / 2;

  let elem = document.elementFromPoint(centerX, centerY);

  elem.style.background = "red";
  */
  let message = document.createElement('input');
  message.setAttribute("type", "text");
  message.setAttribute("value", "Hi Lena!");
  var sp2 = document.getElementById("profile-content");
  var main2 = document.getElementsByClassName("artdeco-card ember-view pv-top-card");
  var parent = main2[0].parentNode;
  parent.insertBefore(message, main2[0].nextSibling);
    
}
   
chrome.action.onClicked.addListener((tab) => {
  if(!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});