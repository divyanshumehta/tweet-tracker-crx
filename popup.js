$(function(){
  $( "#button" ).click(function() {

    // open in new tab
    chrome.storage.sync.get("tttoken",function(result) {
      var category = $("#dropdown").val()
      var newURL = "https://thawing-hamlet-81545.herokuapp.com//get_tweets/?token="+result.tttoken+"&category="+category;
      chrome.tabs.create({ url: newURL });
    });
  });
});
