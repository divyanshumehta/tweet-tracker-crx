$(function(){
  $( "#button" ).click(function() {

    // open in new tab
    chrome.storage.sync.get("tttoken",function(result) {
      var category = $("#dropdown").val()
      var newURL = "http://localhost:3000/get_tweets/?token="+result.tttoken+"&category="+category;
      chrome.tabs.create({ url: newURL });
    });
  });
});
