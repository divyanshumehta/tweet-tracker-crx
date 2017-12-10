$(function(){
  $( "#button" ).click(function() {

    // open in new tab
    var token = 'ab12'
    var category = $("#dropdown").val()
    // console.log(category);
    var newURL = "http://localhost:3000/get_tweets/?token="+token+"&category="+category;
    // console.log(newURL);
    chrome.tabs.create({ url: newURL });
  });
});
