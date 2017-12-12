$(function(){

    var token="";
    chrome.storage.sync.get("tttoken",function(tracker) {
      console.log(tracker.tttoken);
      if (tracker.tttoken) {
        token = tracker.token;
      }
      else {
        console.log("NO TOKEN FOUND");
        // assign new token
        function makeid() {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;
        }
        token = makeid();
        console.log(token);
        chrome.storage.sync.set({"tttoken":token});

        // Send to create a client
        function register_token(){

          $.ajax({
            type: "POST",
            url: "https://thawing-hamlet-81545.herokuapp.com//new_client",
            data: {"token":token},
            success: function(result){
              console.log(result);
              if (result.status == "OK") {
                console.log("Token registered");
              }
              else {
                token = makeid();
                register_token();
              }
            },
            error: function(msg){
              console.log(msg.data);
            }
          });
        }
        register_token();
      }
    });


    var count = 1;
    minute = 10000*6*5; // notfier scheduled in 5mins
    var notifOptions = {
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Tweet Tweet',
      message: 'There is a new tweet',
      requireInteraction: false
    };

    var text = false;
    var photo = false;
    var text_and_photo = false;


    function delay_loop() {

      // start a delay
      setTimeout(function(){

          console.log("Tweet");
          var token = "";

          chrome.storage.sync.get(["tttoken","text","photo","text_and_photo"],function(read) {
            console.log(read.tttoken);
            // Make an API call to /notify?token=
            $.ajax({
              type: "GET",
              url: "https://thawing-hamlet-81545.herokuapp.com//notify/?token="+read.tttoken,
              // data: {"token":"ab12"},
              success: function(result){
                console.log(result);
                if ( (result.text && read.text) || (result.photo && read.photo) || (result.text_and_photo && read.text_and_photo) ) {
                  chrome.notifications.create('tweet',notifOptions);
                }
                else{
                  notify=false;
                }
              },
              error: function(msg){
                console.log(msg.data);
              }
            });
          });


          // recursive call
          if (count)
              delay_loop()

      }, minute);
    }

    delay_loop();
});
