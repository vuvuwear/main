import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hydration-safe mounting hook for React 19.
 * Returns `false` during SSR / prerender and `true` immediately on the client
 * without triggering a cascading effect re-render.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

