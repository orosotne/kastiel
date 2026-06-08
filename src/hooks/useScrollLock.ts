import { useEffect } from "react";

/**
 * Locks body scroll while `locked` is true and restores the previous value on
 * unlock/unmount. Replaces the ad-hoc `document.body.style.overflow` toggling
 * that was duplicated (and drifted between "auto"/"unset"/missing) across the
 * header menu and every lightbox.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
