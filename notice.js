// notice.js  by Inndy
// only works on webkit-based browser

/*
  var ready_to_use = notice.ready(); // check if it's ready
  
  var result = notice.check(); // check state (-1: not support, 0: allow, 1: need to request, 2: denied)
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
*/

window.notice = (function () {
  var notice = function (img, title, content) {
    if (!notice.ready()) return null;
    // private variables
    var timer = null;
    var self = this;
    var obj = window.webkitNotifications.createNotification(img, title, content);
    obj.addEventListener("close", function () {
      if (timer) clearTimeout(timer);
      self.alive = false;
    }, false);
    // members
    this.alive = true;
    // methods
    this.show = function (time) {
      if (!this.alive) return false;
      obj.show();
      if (typeof(time) == "number") this.settimedout(time);
      return true;
    };
    this.settimedout = function (time) {
      if (!this.alive) return false;
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        obj.cancel();
      }, time);
      return true;
    };
    this.cancel = function () {
      if (!this.alive) return false;
      if (timer) clearTimeout(timer);
      obj.cancel();
    };
    this.addEventListener = function (evt, func) {
      if (!this.alive) return false;
      var self = this;
      obj.addEventListener(evt, function () {
        func.call(self);
      }, false);
    };
    return this;
  };
  
  notice.ready = function () {
    return window.webkitNotifications && (window.webkitNotifications.checkPermission() == 0);
  };
  
  notice.check = function () {
    return window.webkitNotifications ? window.webkitNotifications.checkPermission() : -1;
  };
  
  notice.request = function () {
    webkitNotifications.requestPermission();
  };
  
  return notice;
})();
