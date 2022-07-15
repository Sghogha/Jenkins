import React, { useState, createContext, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "src/components/GlobalStyles";
import theme from "src/theme";
import { publicRoute, userRoutes, adminRoutes } from "src/routes";
import { useSelector } from "react-redux";
import { fetchFromStorage } from "src/helpers/context";
import messagesEn from "src/helpers/locales/en.json";
import messagesDe from "src/helpers/locales/de.json";
import "react-perfect-scrollbar/dist/css/styles.css";
import "src/assets/scss/global.scss";
import {
  initOneSignalNotification,
  addListenerForNotificationOpened,
  isPushNotificationsEnabled,
  getUserId,
  // setDefaultNotificationUrl,
} from "src/helpers/OneSignal/index";
import { EventEmitter } from "src/helpers/EventEmitter";

const Context = createContext();
initOneSignalNotification();
addListenerForNotificationOpened();
isPushNotificationsEnabled();

const App = () => {
  const reduxAuth = useSelector((state) => state?.reduxData?.authData);
  const localAuth = fetchFromStorage("authData");
  const auth = reduxAuth ? reduxAuth : localAuth;
  const isCheckAdminRoute = window.location.pathname.includes("/admin");

  const viewRoutes =
    auth?.token && isCheckAdminRoute
      ? adminRoutes
      : auth?.token
      ? userRoutes
      : publicRoute;

  const routing = useRoutes(viewRoutes);

  const menuMessages = {
    en: { ...messagesEn },
    de: { ...messagesDe },
    // fr: { ...messagesFr },
    // pt: { ...messagesPt },
  };

  const [locale, setLocale] = useState("en");
  const [messages, setMessages] = useState(menuMessages["en"]);
  const [playerId, setPlayerId] = useState("");

  const switchLanguage = (lang) => {
    setLocale(lang);
    setMessages(menuMessages[lang]);
  };

  useEffect(() => {
    EventEmitter.subscribe("handlenotificationredirect", (event) => {
      initOneSignalNotification();
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    var playerID = getUserId();
    Promise.all([playerID]).then((values) => {
      setPlayerId(values[0]);
    });
  }, []);
  console.log("playerId", playerId);
  // PLAY ONLY ONE VIDEO/AUDIO
  useEffect(() => {
    document.addEventListener(
      "play",
      function (e) {
        var videos = document.getElementsByTagName("video");
        var audio = document.getElementsByTagName("audio");
        var i = 0;
        var len = 0;
        for (i = 0, len = videos.length; i < len; i++) {
          if (videos[i] !== e.target) {
            videos[i].pause();
          }
        }
        for (i = 0, len = audio.length; i < len; i++) {
          if (audio[i] !== e.target) {
            audio[i].pause();
          }
        }
      },
      true
    );
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={{ locale, switchLanguage, messages }}>
        <GlobalStyles />
        {routing}
      </Context.Provider>
    </ThemeProvider>
  );
};

export default App;
export { Context as IntlContext };
