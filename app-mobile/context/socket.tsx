import { io } from "socket.io-client";
import React from "react";
import useAuth from "../hooks/useAuth";
import Constants from "expo-constants";

type IOnlineUser = {
  userId: string;
  socketId: string;
};

const wsUrl = Constants.expoConfig?.extra?.wsUrl;

export const socket = io(wsUrl);

export const socketContext = React.createContext({
  socket,
  onlineUsers: [] as IOnlineUser[],
});

export const useSocket = () => {
  return React.useContext(socketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = React.useState<IOnlineUser[]>([]);

  React.useEffect(() => {
    if (user) socket.emit("addUser", user._id);

    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  const value = {
    socket,
    onlineUsers,
  };

  return (
    <socketContext.Provider value={value}>{children}</socketContext.Provider>
  );
};
