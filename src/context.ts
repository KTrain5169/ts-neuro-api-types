import type { BaseOutgoingMessage } from "./index.ts";

export type OutgoingContextMessages = ContextMessage | SpeechStartedMessage | SpeechEndedMessage;

export interface ContextMessage extends BaseOutgoingMessage {
  command: "context";
  data: {
    message: string;
    silent: boolean;
  };
}

export interface SpeechStartedMessage extends BaseOutgoingMessage {
  command: "speech/started";
  data: {
    id: string;
    name: string;
    text?: string;
    expected_duration_ms?: number;
    reply?: "never" | "maybe" | "always"; // Defaults to `"maybe"`
    responder?: string;
  };
}

export const enum SpeechStartedReplyModes {
  NEVER = "never",
  MAYBE = "maybe",
  ALWAYS = "always",
}

export interface SpeechEndedMessage extends BaseOutgoingMessage {
  command: "speech/ended";
  data: {
    id: string;
  };
}
