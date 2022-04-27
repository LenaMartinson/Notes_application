async function reddenPage() {
  /*
  document.body.style.backgroundColor = 'lime';
  let centerX = document.documentElement.clientWidth / 2;
  let centerY = document.documentElement.clientHeight / 2;

  let elem = document.elementFromPoint(centerX, centerY);
  elem.style.background = "red";
  */
  //document.body.style.backgroundColor = 'lime';
  let doc_url_path = document.location.pathname; // чтобы взять потом имя и искать по нему
  user_name = doc_url_path.split('/')[2];
  var source = document.body.innerHTML;
  console.log(user_name);
  var my_name = source.match(/(publicIdentifier":")\w*(")/)[0];
  my_name = my_name.split('"')[2];
  console.log(my_name); 


  let text = "No information";
  let url_notes = "http://127.0.0.1:8000/api/notes/?format=json";
  let url_users = "http://127.0.0.1:8000/api/users/?format=json";
  let response = await fetch(url_notes);
  let response_users = await fetch(url_users);
  if (response.ok && response_users.ok) {
    let all_notes_json = await response.json();
    let all_users_json = await response_users.json();
    console.log("all is ok");
    let user_id = all_users_json.find(item => item.name == my_name); //пока живем с идеей что user точно есть в таблице
    console.log(user_id["user_id"]);
    let data = all_notes_json.filter(item => item.author === user_id["user_id"]);
    let data2  = data.filter(item => item.to_whom === user_name); // пришлось разделить на 2, может это можно исправить
    console.log(data2[0]);
    //console.log(data2);
    text = data2[0]["text"];
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