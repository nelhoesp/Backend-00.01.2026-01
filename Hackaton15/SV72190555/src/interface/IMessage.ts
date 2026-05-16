export interface IMessage {
  from: string;
  to: string;
  text: string;
  timestamp: Date;
  read?: boolean;
  edited?: boolean;
}
