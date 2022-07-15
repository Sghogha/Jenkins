import socketio from "socket.io-client";
import React from "react";
import { Config } from "src/helpers/context/config";
import { fetchFromStorage } from "src/helpers/context";
import { identifiers } from "src/helpers/constants/identifier";

let socketInitialize = null;
const userDetail = fetchFromStorage(identifiers.authData);

socketInitialize = socketio(Config.socketUrl, {
  jsonp: false,
  path: Config.socketPath,
  upgrade: false,
  reconnection: true,
});

export const socket = socketInitialize.connect();
console.log("socket connect", socket);
export const socketJoin =
  userDetail !== null &&
  socket.emit("JoinSocket", {
    userId: userDetail?.user_id,
  });
console.log("socketInitialize", socket);
export const SocketContext = React.createContext();
