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
  //console.log(user_name);
  var my_name = source.match(/(publicIdentifier":")\w*(")/)[0];
  my_name = my_name.split('"')[2];
  //console.log(my_name); 


  let text = "No information";
  let url_notes = "http://127.0.0.1:8000/api/notes/?format=json";
  let url_users = "http://127.0.0.1:8000/api/users/?format=json";
  let response = await fetch(url_notes, {method: 'POSt', method: 'GET'});
  let response_users = await fetch(url_users);
  if (!(response.ok && response_users.ok)) {
    text = "bad request";
  } else {
    let all_notes_json = await response.json();
    let all_users_json = await response_users.json();
    //console.log("all is ok");
    let user_id = all_users_json.find(item => item.name == my_name); //пока живем с идеей что user точно есть в таблице
    //console.log(user_id["user_id"]);
    let data = all_notes_json.filter(item => item.author === user_id["user_id"]);
    let data2  = data.filter(item => item.to_whom === user_name); // пришлось разделить на 2, может это можно исправить
    if (Object.keys(data2).length == 0) {
      //console.log("no note");
      text = "";
      cnt = Object.keys(all_users_json).length + 1;
      all_notes_json.push({note_id: cnt, text: text, to_whom: user_name, author: user_id["user_id"]});
      console.log(all_notes_json);
    } else {
      text = data2[0]["text"];
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
    parent.insertBefore(button, message);
    button.onclick = function () {
      var note_text = button.nextElementSibling.value;
      console.log(note_text);
      data = all_notes_json.filter(item => item.author === user_id["user_id"]);
      data2  = data.filter(item => item.to_whom === user_name);
      data2[0].text = note_text;
      console.log(all_notes_json);
      //text = data2[0]["text"];
      //alert("Button is clicked");
    }
  }
}
   
chrome.action.onClicked.addListener((tab) => {
  if(!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});