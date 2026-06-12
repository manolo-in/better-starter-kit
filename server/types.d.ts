/// <reference types="@cloudflare/workers-types" />

type CloudflareBinding = {
  DATABASE: D1Database;
  // CHAT: DurableObjectNamespace
};

type WaitUntil = (p: Promise<unknown>) => void

declare global {
  namespace NodeJS {
    interface ProcessEnv extends CloudflareBindings {
      // Additional environment variables can be added here
    }
  }
}
