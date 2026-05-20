export interface ChatMessage {
  id: string;
  from: string;
  to: string;
  text: string;
  timestamp: number;
}

export interface ServerToClientEvents {
  message: (msg: ChatMessage) => void;
  userJoined: (userId: string) => void;
  userLeft: (userId: string) => void;
  "payment:update": (payload: any) => void;
}

export interface ClientToServerEvents {
  setUser: (userId: string) => void;
  sendMessage: (to: string, text: string) => void;
  "payment:join": (paymentId: string) => void;
}

export interface SocketData {
  userId?: string;
}
