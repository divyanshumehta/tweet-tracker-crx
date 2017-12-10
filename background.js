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
            url: "http://localhost:3000/new_client",
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
    minute = 60000*5;
    var notifOptions = {
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Tweet Tweet',
      message: 'There is a new tweet',
      requireInteraction: false
    };

    var text = true;
    var photo = true;
    var text_and_photo = true;

    function delay_loop() {
      // start a delay
      setTimeout(function(){

          console.log("Tweet");
          // Make an API call to /notify?token=
          $.ajax({
    				type: "GET",
    				url: "http://localhost:3000/notify/?token="+token,
            // data: {"token":"ab12"},
    				success: function(result){
              console.log(result);
    					if ( (result.text && text) || (result.photo && photo) || (result.text_and_photo && text_and_photo) ) {
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

          // recursive call
          if (count)
              delay_loop()

      }, minute);
    }

    delay_loop();
});
