notice.js
=========

A simple interface to `webkitNotification`

***It only works with Safari and Chromium-based browser***

* Specifications from Chromium
--- [http://dev.chromium.org/developers/design-documents/desktop-notifications/api-specification][1]
* Specifications from W3
--- [https://dvcs.w3.org/hg/notifications/raw-file/tip/Overview.html][2]



    ```javascript
    var ready_to_use = notice.ready();
    // returns true if everything is ready
    
    // var result = notice.check();
    //  check permission
    //    -1: not support
    //     0: allow
    //     1: need to request
    //     2: denied
    // 
    //  constants below was defined in Chrome
    //    PERMISSION_ALLOWED     = 0
    //    PERMISSION_NOT_ALLOWED = 1
    //    PERMISSION_DENIED      = 2
    
    if (result == -1) alert("Your browser doesn't support desktop notification.");
    else if (result == 1) notice.request();
    else if (result == 2) alert("You have denied permission of desktop notification.");
    
    var obj = new notice("img.png", "title text", "content text");
    obj.show();                                 // show notification without timedout
    obj.show(time);                             // show notification with timedout <time> ms
    obj.settimedout(time);                      // set timedout <time> ms for notification
    obj.cancel();                               // close notification
    obj.addEventListener("click", obj.close);   // event when you click the notification box
    obj.addEventListener("close", function () { // event when notification box closed
        alert("I knew.");
    });


  [1]: http://dev.chromium.org/developers/design-documents/desktop-notifications/api-specification
  [2]: https://dvcs.w3.org/hg/notifications/raw-file/tip/Overview.html
