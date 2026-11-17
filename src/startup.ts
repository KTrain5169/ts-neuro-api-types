import type { BaseIncomingMessage, BaseOutgoingMessage } from "./index.ts";

export interface StartupMessage extends BaseOutgoingMessage {
  command: "startup";
}

export interface StartupAcknowledgementMessage extends BaseIncomingMessage {
  command: "startup";
  data: {
    session: {
      sessionId: string;
      characterId: string;
      displayName: string;
    };
  };
}
