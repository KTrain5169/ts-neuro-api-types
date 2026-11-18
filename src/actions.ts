import type { BaseIncomingMessage, BaseOutgoingMessage } from "./index.ts";

/**
 * The interface of an Action
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#action
 */
export interface Action {
  /**
   * The action's name. Should be a lowercase string, with words separated by underscores or dashes.
   */
  name: string;
  /**
   * Plaintext description of the action. **Neuro will receive this.**
   */
  description: string;
  /**
   * Action schema, following the Draft-07 JSON Schema spec (with limitations). **Neuro will receive this.**
   * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#action for limitations
   */
  schema?: { type: "object"; [key: string]: unknown };
}

/**
 * Raw data of an action execution from Neuro.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#action-1
 */
export interface ActionData {
  /**
   * Action attempt ID, which will be used to return action results.
   */
  id: string;
  /**
   * Name of the action being executed.
   */
  name: string;
  /**
   * Stringified JSON data sent by Neuro. Parse before use.
   */
  data?: string;
}

/**
 * Version of {@link ActionData `ActionData`} where {@link ParsedActionData.data `data`} is parsed.
 * Allows for typing of the action data.
 */
export interface ParsedActionData<TData extends object | undefined = undefined> extends Omit<
  ActionData,
  "data"
> {
  /**
   * Parsed object with data sent by Neuro, (usually) conforming to the action's schema.
   * You should still validate the data to ensure it arrives in the expected shape.
   */
  data: TData;
}

/**
 * All potential messages sent by Neuro relating to actions
 */
export type IncomingActionMessages = ActionMessage;

/**
 * Raw packet sent from Neuro to execute an action.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#action-1
 */
export interface ActionMessage extends BaseIncomingMessage {
  command: "action";
  data: ActionData;
}

/**
 * All possible messages that can be sent to Neuro relating to actions
 */
export type OutgoingActionMessages =
  | RegisterActionMessage
  | UnregisterActionMessage
  | ForceActionMessage
  | ActionResultMessage;

/**
 * Packet for registering actions.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#register-actions
 */
export interface RegisterActionMessage extends BaseOutgoingMessage {
  command: "actions/register";
  data: {
    /**
     * An array of actions to register.
     */
    actions: Action[];
  };
}

/**
 * Packet for unregistering actions.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#unregister-actions
 */
export interface UnregisterActionMessage extends BaseOutgoingMessage {
  command: "actions/unregister";
  data: {
    /**
     * An array of IDs corresponding to actions you want to unregister.
     */
    action_names: string[];
  };
}

/**
 * Packet for forcing an action from Neuro.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#force-actions
 */
export interface ForceActionMessage extends BaseOutgoingMessage {
  command: "actions/force";
  data: {
    /**
     * The current game state relevant to the action force. **Neuro will receive this.**
     *
     * This can be in plaintext, Markdown, JSON, or any string-serializable format.
     * Markdown is recommended.
     * @example
     * ```md
     * # Pokémon battle example
     *
     * Opponent's Incineroar: 100%
     * Opponent's Rillaboom: 92% | -1 Special Defense
     * Your Calyrex-Ice: 88% (154/175 HP) | -1 Attack | +1 Special Defense
     * Your Indeedee-Female: 32% (56/177 HP) | -1 Attack | BURNED
     *
     * Psychic Terrain: 5 turns remaining
     * Harsh Sunlight: 3 turns remaining
     * Opponent's Tailwind: 2 turns remaining
     *
     * Opponent has 3 Pokémon remaining.
     * You have 3 Pokémon remaining.
     */
    state?: string;

    /**
     * A query prompt for Neuro to act upon. **Neuro will receive this.**
     *
     * @example
     * ```md
     * # Pokémon battle example
     *
     * What will Calyrex-Ice do?
     */
    query: string;

    /**
     * Whether or not the game state in this action force will be relevant for later.
     * If `true`, Neuro will not remember the `state` after this action force.
     *
     * @default false
     */
    ephemeral_context?: boolean;

    /**
     * How quickly does this action force require a response?
     *
     * - "low" - Can answer basically whenever.
     * - "medium" - Answer required soon.
     * - "high" - Answer required imminently.
     * - "critical" - Process the answer at once. (cuts off speech, use with caution)
     *
     * @default "low" // backwards comaptibility
     */
    priority?: "low" | "medium" | "high" | "critical";

    /**
     * Should Neuro talk about this action force?
     * If `true`, Neuro will stay silent during and after the action force.
     *
     * @default false // backwards compatibility
     */
    silent?: boolean;

    /**
     * An array of action names that Neuro has to pick from.
     * These must be {@link RegisterActionMessage registered} beforehand; unknown names are ignored.
     */
    action_names: string[];
  };
}

/**
 * A const enum to be used with {@link ForceActionMessage.data action force} priority.
 */
export const enum ForceActionPriorityLevels {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

/**
 * Packet for sending action results.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#action-result
 */
export interface ActionResultMessage extends BaseOutgoingMessage {
  command: "action/result";
  data: {
    /**
     * Action ID that was received from the {@link ActionData}.
     */
    id: string;

    /**
     * Whether or not the action was successful.
     * Note: If the action was unsuccessful, but the action can no longer be retried, set this to `true`.
     */
    success: boolean;

    /**
     * An optional (only on success), *short* message for Neuro regarding the action she took. **Neuro will receive this, if present.**
     * Required if `success: false`.
     */
    message?: string;
  };
}
