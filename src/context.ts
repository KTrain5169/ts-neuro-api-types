import type { BaseOutgoingMessage } from "./index.ts";

/**
 * All possible messages that can be sent to Neuro relating to context/yapping
 */
export type OutgoingContextMessages = ContextMessage | SpeechStartedMessage | SpeechEndedMessage;

/**
 * Packet for adding a message to Neuro's context.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#context
 */
export interface ContextMessage extends BaseOutgoingMessage {
  command: "context";
  data: {
    /**
     * The message to send to Neuro.
     */
    message: string;

    /**
     * Whether or not Neuro should comment about this context.
     * Note that this is just a suggestion, depending on the context and whether or not Neuro is busy, she may talk about it anyways.
     */
    silent: boolean;
  };
}

/**
 * Packet for indicating that in-game speech is being played.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#speech-started
 */
export interface SpeechStartedMessage extends BaseOutgoingMessage {
  command: "speech/started";
  data: {
    /**
     * An ID of the speaker.
     * Multiple speech/started messages of the same ID without ending them first will be ignored.
     */
    id: string;

    /**
     * Human-readable name of the character doing the voicing. **Neuro will receive this.**
     */
    speaker: string;

    /**
     * Text that the character is saying. **Neuro will receive this.**
     * Note that text sent here should not also be sent via {@link ContextMessage context}, otherwise it will double up in her context window.
     */
    text?: string;

    /**
     * The expected duration of the dialogue.
     * The dialogue will be considered to have been fully spoken shortly after this amount of milliseconds, or 30 seconds if omitted and no `speech/ended` is sent.
     * This is meant as a fallback for if `speech/ended` never arrives.
     */
    expected_duration_ms?: number;

    /**
     * How Neuro should reply to this dialogue.
     *
     * - "never" - Do not respond to this dialogue; treated as background speech.
     * - "maybe" - Possibly comment on the dialogue; similar to a non-silent {@link ContextMessage context message}.
     * - "always" - Will respond directly to the dialogue; use when Neuro is being directly talked to.
     *
     * Note: If another line starts right after one ends, they count as one stretch of dialogue and only the `reply` of the last line is used.
     *
     * @default "maybe"
     */
    reply?: "never" | "maybe" | "always";

    /**
     * The character ID corresponding to the character who should respond to the dialogue. If omitted, will be randomly picked between connected characters.
     * @example
     * ```ts
     * ["neuro", "evil"]
     */
    responder?: string;
  };
}

/**
 * A const enum to be used with setting {@link SpeechStartedMessage.data reply modes}.
 */
export const enum SpeechStartedReplyModes {
  NEVER = "never",
  MAYBE = "maybe",
  ALWAYS = "always",
}

/**
 * Packet for manually indicating that in-game speech has ended.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#speech-ended
 */
export interface SpeechEndedMessage extends BaseOutgoingMessage {
  command: "speech/ended";
  data: {
    /**
     * The ID of the character that finished speaking, as sent from {@link SpeechStartedMessage}.
     */
    id: string;
  };
}
