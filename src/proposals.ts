/**
 * Types for packets under proposal
 */

import type { BaseIncomingMessage, BaseOutgoingMessage } from "./index.ts";

/**
 * Packet for re-registering all actions.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/PROPOSALS.md#reregister-all-actions
 */
export interface ReregisterAllActionsMessage extends BaseIncomingMessage {
  command: "actions/reregister_all";
}

/**
 * Packet for gracefully shutting down an integration.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/PROPOSALS.md#graceful-shutdown
 */
export interface GracefulShutdownMessage extends BaseIncomingMessage {
  command: "shutdown/graceful";
  data: {
    wants_shutdown: boolean;
  };
}

/**
 * Packet for immediate shutdown of an integration.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/PROPOSALS.md#immediate-shutdown
 */
export interface ImmediateShutdownMessage extends BaseIncomingMessage {
  command: "shutdown/immediate";
}

/**
 * Packet to indicate to a graceful shutdown that the game is saved and ready to quit.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/PROPOSALS.md#shutdown-ready
 */
export interface ShutdownReadyMessage extends BaseOutgoingMessage {
  command: "shutdown/ready";
}
