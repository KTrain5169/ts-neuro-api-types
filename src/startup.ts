import type { BaseIncomingMessage, BaseOutgoingMessage } from "./index.ts";

/**
 * Packet to send to Neuro on startup.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#startup
 */
export interface StartupMessage extends BaseOutgoingMessage {
  command: "startup";
}

/**
 * Packet acknowledging an integration's startup packet.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#startup-acknowledgement
 */
export interface StartupAcknowledgementMessage extends BaseIncomingMessage {
  command: "startup";
  data: {
    session: {
      /**
       * A session ID, useful for debugging & logging.
       */
      sessionId: string;

      /**
       * The ID of the character connected.
       * @example
       * ```ts
       * ["neuro", "evil"]
       */
      characterId: string;

      /**
       * The human-readable display name of the character connected.
       * @example
       * ["Neuro-sama", "Evil Neuro"]
       */
      displayName: string;
    };
  };
}
