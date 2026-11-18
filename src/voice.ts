/**
 * Types related to the Voice Chat API
 */

import type { BaseIncomingMessage, BaseOutgoingMessage } from "./index.ts";

/**
 * All possible control packets to send to Neuro.
 */
export type AllOutgoingControlPackets =
  | VoiceStartMessage
  | VoiceStopMessage
  | RegisterSpeakersMessage
  | UnregisterSpeakersMessage;

/**
 * All potential control packets sent by Neuro.
 */
export type AllIncomingControlPackets =
  | VoiceReadyMessage
  | VoiceUnavailableMessage
  | SpeakingIndicatorMessage
  | SpeakingCancelledMessage;

/**
 * Packet to start a voice session.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/VOICE_CHAT.md#handshake
 */
export interface VoiceStartMessage extends BaseOutgoingMessage {
  command: "voice/start";
}

/**
 * Packet to stop a voice session. Disconnecting also assumes this packet was sent.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/VOICE_CHAT.md#teardown
 */
export interface VoiceStopMessage extends BaseOutgoingMessage {
  command: "voice/stop";
}

/**
 * Packet that indicates the audio sampling data for this session.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/VOICE_CHAT.md#handshake
 */
export interface VoiceReadyMessage extends BaseIncomingMessage {
  command: "voice/ready";
  data: {
    /**
     * Sample rate for the audio.
     * Currently set to 48000 but read it anyways.
     */
    // oxlint-disable-next-line typescript/no-redundant-type-constituents
    sample_rate: 48000 | number;

    /**
     * Channels for the audio (mono, both directions).
     * Currently set to 1 but read it anyways.
     */
    // oxlint-disable-next-line typescript/no-redundant-type-constituents
    channels: 1 | number;
  };
}

/**
 * Packet that indicates the server is unable to accept voice connections.
 * Rejected WebSocket upgrades should be assumed to have the same effect.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/VOICE_CHAT.md#handshake
 */
export interface VoiceUnavailableMessage extends BaseIncomingMessage {
  command: "voice/unavailable";
  data?: {
    /**
     * Optional reason why Voice Chat is unavailable.
     */
    reason?: string;
  };
}

/**
 * Packet to register a speaker in the audio session.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/VOICE_CHAT.md#registering-speakers
 */
export interface RegisterSpeakersMessage extends BaseOutgoingMessage {
  command: "voice/speakers/register";
  data: {
    /**
     * An array of speaker info.
     */
    speakers: {
      /**
       * A uint16 number that acts as the speaker's ID.
       * Must be unique per socket.
       */
      id: number;

      /**
       * The human-readable name of the speaker. **Neuro will receive this.**
       */
      name: string;
    }[];
  };
}

/**
 * Packet for unregistering speakers from the audio session.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/VOICE_CHAT.md#registering-speakers
 */
export interface UnregisterSpeakersMessage extends BaseOutgoingMessage {
  command: "voice/speakers/unregister";
  data: {
    /**
     * An array of IDs corresponding to the speakers to unregister.
     */
    ids: number[];
  };
}

/**
 * Packet that indicates if Neuro is speaking.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/VOICE_CHAT.md#control-messages-server--game
 */
export interface SpeakingIndicatorMessage extends BaseIncomingMessage {
  command: "voice/speaking";
  data: {
    /**
     * Whether or not Neuro is about to speak.
     * Useful for activating Push-to-talk, if necessary.
     */
    speaking: boolean;
  };
}

/**
 * Packet that indicates Neuro's speech was cancelled.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/VOICE_CHAT.md#control-messages-server--game
 */
export interface SpeakingCancelledMessage extends BaseIncomingMessage {
  command: "voice/cancelled";
}

/**
 * Packet that indicates that Neuro has/has not finished speaking to the integration.
 * Note that this is sent on the WebSocket connection for text, not the connection for voice.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/SPECIFICATION.md#speech-finished
 */
export interface SpeechFinishedMessage extends BaseIncomingMessage {
  command: "speech_finished";
  data: {
    /**
     * Whether or not this is the final speech_finished message.
     * Usually would be set to `true`.
     */
    isFinal: boolean;

    /**
     * Whether or not the speech was cut off.
     * Note: Cut off speech will still send a `speech_finished` command with `isFinal: true`.
     */
    cancelled?: boolean;

    /**
     * The reason for `isFinal: true`.
     * Only present if `cancelled: true`.
     */
    reason?: string;
  };
}

/**
 * Binary frames for sending audio to Neuro.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/VOICE_CHAT.md#binary-frames-game--server-speaker-audio
 */
export interface AudioToServerFrames extends ArrayBuffer {}

/**
 * Binary frames for receiving audio from Neuro.
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/VOICE_CHAT.md#binary-frames-server--game-neuros-voice
 */
export interface AudioFromServerFrames extends ArrayBuffer {}
