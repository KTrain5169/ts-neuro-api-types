import type { BaseIncomingMessage, BaseOutgoingMessage } from "./index.ts";

export interface ReregisterAllActionsMessage extends BaseIncomingMessage {
  command: "actions/reregister_all";
}

export interface GracefulShutdownMessage extends BaseIncomingMessage {
  command: "shutdown/graceful";
  data: {
    wants_shutdown: boolean;
  };
}

export interface ImmediateShutdownMessage extends BaseIncomingMessage {
  command: "shutdown/immediate";
}

export interface ShutdownReadyMessage extends BaseOutgoingMessage {
  command: "shutdown/ready";
}
