export interface IUser {
  _id: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: string;
  createdAt: string;
}

export interface IChat {
  _id: string;
  chatName: string;
  chatImage: string;
  lastMessage?: {
    _id: string;
    text: string;
    createdAt: string;
    sender: {
      _id: string;
      displayName: string;
    };
  };
  createdAt: string;
}

export interface IMessage {
  _id: string;
  text: string;
  chat: string;
  sender: {
    _id: string;
    displayName: string;
  };
  createdAt: string;
}
