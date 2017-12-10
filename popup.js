$(function(){
  $( "#button" ).click(function() {

    // open in new tab
    var token = ""
    chrome.storage.sync.get("tttoken",function(tracker) {
      console.log(tracker.tttoken);
      if (tracker.tttoken) {
        token = tracker.token;
      }
    });
    var category = $("#dropdown").val()
    // console.log(category);
    var newURL = "http://localhost:3000/get_tweets/?token="+token+"&category="+category;
    // console.log(newURL);
    chrome.tabs.create({ url: newURL });
  });
});
