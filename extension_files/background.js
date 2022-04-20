function reddenPage() {
  /*
  document.body.style.backgroundColor = 'lime';
  let centerX = document.documentElement.clientWidth / 2;
  let centerY = document.documentElement.clientHeight / 2;

  let elem = document.elementFromPoint(centerX, centerY);
  elem.style.background = "red";
  */
  //document.body.style.backgroundColor = 'lime';
  let text = "Hi Lena!";
  let url = "http://127.0.0.1:8000/api/notes/?format=json";
  let response = fetch(url);
  if (response.ok) {
    text = response.text();
  } else {
    text = "bad request";
  }
  let message = document.createElement('input');
  message.setAttribute("type", "text");
  message.setAttribute("value", text);
  var sp2 = document.getElementById("profile-content");
  var main2 = document.getElementsByClassName("artdeco-card ember-view pv-top-card");
  var parent = main2[0].parentNode;
  parent.insertBefore(message, main2[0].nextSibling);
  let button = document.createElement('button');
  button.innerHTML = "Submit";
  //button. = 'yellow';
  button.onclick = function () {
    alert("Button is clicked");
  }
  parent.insertBefore(button, message);
  
}
   
chrome.action.onClicked.addListener((tab) => {
  if(!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});