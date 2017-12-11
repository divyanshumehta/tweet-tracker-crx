$(function() {

  $(document).ready(function() {

    chrome.storage.sync.get(["text","photo","text_and_photo","users"], function(result){
      $("#followed_users").val(result.users);
      if (result.text) {
        $("#text").prop('checked', true);
      }
      if (result.photo) {
        $("#photo").prop('checked', true);
      }
      if (result.text_and_photo) {
        $("#text_and_photo").prop('checked', true);
      }
    });
  });

  $("#button").click(function() {
    var users = $("#followed_users").val();
    console.log(users);
    chrome.storage.sync.set({"users":users});
    var token="";
    chrome.storage.sync.get("tttoken",function(tracker) {
      console.log(tracker.tttoken);
      // if (tracker.tttoken) {
      // }
      // token = tracker.token;
      console.log(token);
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/follow/",
        data: {"users":users,"token":tracker.tttoken},
        success: function(result){
          console.log(result);
        },
        error: function(msg){
          console.log(msg.data);
        }
      });
    });
    // console.log(token);
  });

  $("#notibutton").click(function() {
    if( $("#text").is(':checked') ) {
      chrome.storage.sync.set({"text": true});
    }
    else {
      chrome.storage.sync.set({"text": false});
    }

    if( $("#photo").is(':checked') ) {
      // photo = true
      chrome.storage.sync.set({"photo": true});
    }
    else {
      chrome.storage.sync.set({"photo": false});
    }

    if( $("#text_and_photo").is(':checked') ) {
      // text_and_photo flag = true
      chrome.storage.sync.set({"text_and_photo": true});
    }
    else {
      chrome.storage.sync.set({"text_and_photo": false});
    }
    chrome.storage.sync.get(["text","photo","text_and_photo"], function(result){
      console.log(result.text+" "+result.photo+" "+result.text_and_photo);
    });

  });
});
