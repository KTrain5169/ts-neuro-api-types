import type { BaseIncomingMessage, BaseOutgoingMessage } from "./index.ts";

export interface VoiceStartMessage extends BaseOutgoingMessage {
  command: "voice/start";
}

export interface VoiceStopMessage extends BaseOutgoingMessage {
  command: "voice/stop";
}

export interface VoiceReadyMessage extends BaseIncomingMessage {
  command: "voice/ready";
  data: {
    // oxlint-disable-next-line typescript/no-redundant-type-constituents
    sample_rate: 48000 | number;
    // oxlint-disable-next-line typescript/no-redundant-type-constituents
    channels: 1 | number;
  };
}

export interface VoiceUnavailableMessage extends BaseIncomingMessage {
  command: "voice/unavailable";
  data?: {
    reason?: string;
  };
}

export interface RegisterSpeakersMessage extends BaseOutgoingMessage {
  command: "voice/speakers/register";
  data: {
    speakers: {
      id: number;
      name: string;
    }[];
  };
}

export interface UnregisterSpeakersMessage extends BaseOutgoingMessage {
  command: "voice/speakers/unregister";
  data: {
    ids: number[];
  };
}

export interface SpeakingIndicatorMessage extends BaseIncomingMessage {
  command: "voice/speaking";
  data: {
    speaking: boolean;
  };
}

export interface SpeakingCancelledMessage extends BaseIncomingMessage {
  command: "voice/cancelled";
}

/**
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/VOICE_CHAT.md#binary-frames-game--server-speaker-audio
 */
export interface AudioToServerFrames extends ArrayBuffer {}

/**
 * @see https://github.com/VedalAI/neuro-sdk/blob/main/API/VOICE_CHAT.md#binary-frames-server--game-neuros-voice
 */
export interface AudioFromServerFrames extends ArrayBuffer {}
