/**
 * A base message that is sent to Neuro.
 */
export interface BaseOutgoingMessage {
  command: string;
  game: string;
  data?: object;
}

/**
 * A base message that can be received from Neuro.
 */
export interface BaseIncomingMessage {
  command: string;
  data?: object;
}
