import { EventEmitter } from "src/helpers/EventEmitter";
import { Config } from "src/helpers/context/config";

window.OneSignal = window.OneSignal || [];
var OneSignal = window.OneSignal;

export const initOneSignalNotification = () => {
  console.log("initOneSignalNotification");
  OneSignal.push(function () {
    OneSignal.init({
      appId: Config?.OnesignalAppID,
      // safari_web_id: config.ONE_SIGNAL_SAFARI_WEB_ID,
      // notifyButton: {
      //   enable: true,
      // },
      notificationClickHandlerMatch: "origin",
      notificationClickHandlerAction: "focus",
    });
  });
};
export const showNativePrompt = () => {
  console.log("showNativePrompt");
  OneSignal.push(function () {
    OneSignal.showNativePrompt();
  });
};
export const getUserId = () => {
  var user_Id;
  OneSignal.push(function () {
    user_Id = OneSignal.getUserId(function (userId) {
      return userId;
    });
  });
  return user_Id;
};
export function addListenerForNotificationOpened() {
  // OneSignal.push(function () {
  //   OneSignal.on('notificationDisplay', function (event) {
  //     console.warn('OneSignal notification displayed:', event);
  //   });
  //   //This event can be listened to via the `on()` or `once()` listener
  // });

  // 29-04-22
  // OneSignal.push([
  //   "addListenerForNotificationOpened",
  //   function (data) {
  //     // url={`${Config.BaseURL}event-details/${eventId}`}
  //     console.log("Received NotificationOpened:", data);
  //     EventEmitter.dispatch("handlenotificationredirect", data);
  //     // handleNotificationRedirect();
  //   },
  // ]);

  function notifListen() {
    OneSignal.push([
      "addListenerForNotificationOpened",
      (data) => {
        console.log("Received NotificationOpened:", data);
        EventEmitter.dispatch("handlenotificationredirect", data);
        notifListen();
      },
    ]);
  }
  notifListen();

  // function notifListen() {
  //   OneSignal.push([
  //     'addListenerForNotificationOpened',
  //     notificationData => {
  //       console.log('Received NotificationOpened:', notificationData);
  //       // EventEmitter.dispatch("receivedNotificationOpened", notificationData);
  //       notifListen();
  //     },
  //   ]);
  // }
  // notifListen();
}
export function isPushNotificationsEnabled() {
  // 29-04-22
  // OneSignal.push(function () {
  //   OneSignal.isPushNotificationsEnabled().then(function (isEnabled) {
  //     if (isEnabled) console.log("Push notifications are enabled!");
  //     else console.log("Push notifications are not enabled yet.");
  //   });
  // });

  var flag;
  OneSignal.push(function () {
    flag = OneSignal.isPushNotificationsEnabled(function (isEnabled) {
      return isEnabled;
    });
  });
  return flag;
}
export function setDefaultNotificationUrl(urlValue) {
  // initOneSignalNotification();
  // // var redirectUrl =
  // //   urlValue === undefined
  // //     ? `${Config.socketUrl}`
  // //     : `${Config.socketUrl}${urlValue}`;
  // // console.log("setDefaultNotificationUrl", redirectUrl);
  // OneSignal.push(function () {
  //   // OneSignal.setDefaultNotificationUrl(redirectUrl);
  //   // OneSignal.setDefaultNotificationUrl("http://localhost:3000");
  //   OneSignal.setDefaultNotificationUrl(window.location.href);
  // });

  initOneSignalNotification();
  var redirectUrl =
    urlValue === undefined
      ? `${Config.socketUrl}`
      : `${Config.socketUrl}${urlValue}`;
  console.log("setDefaultNotificationUrl", redirectUrl);
  OneSignal.push(function () {
    OneSignal.setDefaultNotificationUrl(redirectUrl);
    // OneSignal.setDefaultNotificationUrl('http://192.168.0.130:3000');
  });
}
// END
