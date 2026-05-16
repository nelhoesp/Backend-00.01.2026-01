import { model, Schema } from "mongoose";
import type { IMessage } from "../interface/IMessage.ts";

const messageSchema = new Schema<IMessage>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  edited: { type: Boolean, default: false },
});

export default model<IMessage>("Message", messageSchema);
