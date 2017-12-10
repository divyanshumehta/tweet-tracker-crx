$(function(){

    // var token="abc123"
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
    				url: "http://localhost:3000/notify/?token=ab12",
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
