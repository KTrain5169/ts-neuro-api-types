# `neuro-api-types`

TypeScript types and interfaces for the [Neuro API](https://github.com/VedalAI/neuro-sdk).

## Usage

You usually don't need to use this package directly. You'll usually want to use the [Game SDK](https://github.com/AriesAlex/neuro-game-sdk) or [Server API](https://github.com/KTrain5169/neuro-game-api) packages.

If you require the types directly, then you should use this package directly:

```ts
import type { BaseIncomingMessage, BaseOutgoingMessage } from "neuro-api-types"; // Base types
import type { Action, ActionData } from "neuro-api-types/actions"; // Action types
import type { ContextMessage } from "neuro-api-types/context"; // Context-relevant types
import type { ReregisterAllActionsMessage } from "neuro-api-types/proposals"; // Types for packets under proposal
import type { StartupMessage } from "neuro-api-types/startup"; // Startup packet types
import type {
  NeuroSamaStartupAcknowledgement,
  EvilNeuroStartupAcknowledgement,
} from "neuro-api-types/server-mappings"; // Server-specific startup acknowledgement types
import type { SpeechFinishedMessage } from "neuro-api-types/voice"; // Voice chat specific types
```

## Versioning

The versioning scheme will be as follows:

- Major versions reflect breaking changes in the upstream Neuro API specification.
- Minor versions reflect new features in the upstream Neuro API specification.
- Patch versions reflect additions to existing features in the upstream Neuro API specification.
