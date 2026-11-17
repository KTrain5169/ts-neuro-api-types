import type { BaseIncomingMessage, BaseOutgoingMessage } from "./index.ts";

export interface Action {
  name: string;
  description: string;
  schema: unknown;
}

export interface ActionData<TData = unknown> {
  id: string;
  name: string;
  params: TData;
}

export type IncomingActionMessages = ActionMessage;

export interface ActionMessage<TData = unknown> extends BaseIncomingMessage {
  command: "action";
  data: ActionData<TData>;
}

export type OutgoingActionMessages =
  | RegisterActionMessage
  | UnregisterActionMessage
  | ForceActionMessage
  | ActionResultMessage;

export interface RegisterActionMessage extends BaseOutgoingMessage {
  command: "actions/register";
  data: {
    actions: Action[];
  };
}

export interface UnregisterActionMessage extends BaseOutgoingMessage {
  command: "actions/unregister";
  data: {
    action_ids: string[];
  };
}

export interface ForceActionMessage extends BaseOutgoingMessage {
  command: "actions/force";
  data: {
    state?: string;
    query: string;
    ephemeral_context?: boolean; // Defaults to `false`
    priority?: "low" | "medium" | "high" | "critical"; // Defaults to `"low"` for backwards compatibility
    silent?: boolean; // Defaults to `false` for backwards compatibility
    action_names: string[];
  };
}

export const enum ForceActionPriorityLevels {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export interface ActionResultMessage extends BaseOutgoingMessage {
  command: "action/result";
  data: {
    id: string;
    success: boolean;
    message?: string;
  };
}
