export interface BaseOutgoingMessage {
  command: string;
  game: string;
  data?: unknown;
}

export interface BaseIncomingMessage {
  command: string;
  data?: unknown;
}
