async function reddenPage() {
  
  // find names

  let doc_url_path = document.location.pathname; // чтобы взять потом имя и искать по нему
  var user_name = doc_url_path.split('/')[2];
  var source = document.body.innerHTML;
  //console.log(user_name);
  var my_name = source.match(/(publicIdentifier":")\w*(")/)[0];
  my_name = my_name.split('"')[2];
  //console.log(my_name); 

  // download json's

  var text = "No information";
  let url_notes = "http://127.0.0.1:8000/api/notes/?format=json";
  let url_users = "http://127.0.0.1:8000/api/users/?format=json";
  let response = await fetch(url_notes);/// разделить на 2 все-таки
  let response_users = await fetch(url_users);
  if (!(response.ok && response_users.ok)) {
    text = "bad request";
    return;
  }
  var all_notes_json = await response.json();
  var all_users_json = await response_users.json();
  var user_id = all_users_json.find(item => item.name == my_name); //пока живем с идеей что user точно есть в таблице
  var data = all_notes_json.filter(item => item.author === user_id["user_id"]);
  var data2  = data.filter(item => item.to_whom === user_name); // пришлось разделить на 2, может это можно исправить
  var cnt = 0;
  if (Object.keys(data2).length == 0) {
    console.log("no note");
    text = "";
    // добавляем в наш скачанный json - не нужно вроде
    cnt = Object.keys(all_notes_json).length + 1;
    
    let empty_note = {
      note_id: cnt,
      text: "Empty note",
      to_whom: user_name,
      author: user_id["user_id"]
    };
    let resp = await fetch(url_notes, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(empty_note)
    });
    const cont = await resp.json();
    //console.log(cont);
    //console.log(all_notes_json);
  } else {
    cnt = data2[0]["note_id"];
    text = data2[0]["text"];
  }

    // visual 

    let message = document.createElement('input');
    message.setAttribute("type", "text");
    message.setAttribute("value", text);
    var sp2 = document.getElementById("profile-content");
    var main2 = document.getElementsByClassName("artdeco-card ember-view pv-top-card");
    var parent = main2[0].parentNode;
    parent.insertBefore(message, main2[0].nextSibling);
    let button = document.createElement('button');
    button.innerHTML = "Submit";


    parent.insertBefore(button, message);
    button.onclick =  async function () {
      var note_text = button.nextElementSibling.value;
      console.log(note_text);
      let new_note = {
        note_id: cnt,
        text: note_text,
        to_whom: user_name,
        author: user_id["user_id"]
      };
      
      let new_url = "http://127.0.0.1:8000/api/notes/" + cnt + "/?format=json";
      console.log(new_url);

      let resp = await fetch(new_url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(new_note)
      });
      const cont = await resp.json();
      console.log(cont);      
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