import type { StartupAcknowledgementMessage } from "./startup.ts";

export type OfficialServerStartupAcknowledgements =
  | NeuroSamaStartupAcknowledgement
  | EvilNeuroStartupAcknowledgement;

export type AllKnownServerStartupAcknowledgements =
  | OfficialServerStartupAcknowledgements
  | TonyStartupAcknowledgement
  | JippityStartupAcknowledgement
  | GaryStartupAcknowledgement
  | RandyStartupAcknowledgement;

export interface NeuroSamaStartupAcknowledgement extends StartupAcknowledgementMessage {
  data: {
    session: {
      sessionId: string;
      characterId: "neuro";
      displayName: "Neuro-sama";
    };
  };
}

export interface EvilNeuroStartupAcknowledgement extends StartupAcknowledgementMessage {
  data: {
    session: {
      sessionId: string;
      characterId: "evil";
      displayName: "Evil Neuro";
    };
  };
}

export interface TonyStartupAcknowledgement extends StartupAcknowledgementMessage {
  data: {
    session: {
      sessionId: string;
      characterId: "tony";
      displayName: "Tony";
    };
  };
}

export interface JippityStartupAcknowledgement extends StartupAcknowledgementMessage {
  data: {
    session: {
      sessionId: string;
      characterId: "jippity";
      displayName: "Jippity";
    };
  };
}

export interface GaryStartupAcknowledgement extends StartupAcknowledgementMessage {
  data: {
    session: {
      sessionId: string;
      characterId: "gary";
      displayName: "Gary";
    };
  };
}

/**
 * @deprecated Randy doesn't *actually* use this, and it's unlikely it ever will. Only kept in here for posterity.
 */
export interface RandyStartupAcknowledgement extends StartupAcknowledgementMessage {
  data: {
    session: {
      sessionId: string;
      characterId: "randy";
      displayName: "Randy";
    };
  };
}
