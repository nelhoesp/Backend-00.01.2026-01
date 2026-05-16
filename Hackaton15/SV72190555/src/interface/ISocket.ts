export interface ServerToClientEvents {
  message: (msg: ChatMessage) => void;
  userJoined: (user: string) => void;
  userLeft: (user: string) => void;
}

export interface ClientToServerEvents {
  sendMessage: (to: any, text: any) => void;
  setUser: (user: string) => void;
}

export interface SocketData {
  userId: string;
}

export interface ChatMessage {
  id: string;
  from: string; // Remitente
  to: string; // Destinatario
  text: string;
  timestamp: number;
}
