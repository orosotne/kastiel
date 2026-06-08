import { useCallback, useState } from "react";
import { useScrollLock } from "./useScrollLock";

/**
 * Shared lightbox/modal state machine: open/close, current index, and wrap-around
 * next/prev — plus body scroll-lock while open. Replaces the open/close/next/prev
 * quartet that was copy-pasted (with modulo math) across galeria, svadby,
 * MuseumGallery, pribeh and PhoenixSection.
 *
 * @param count number of items to cycle through (re-read each render, so it may
 *              change with e.g. an active tab).
 */
export function useLightbox(count: number) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useScrollLock(isOpen);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const next = useCallback(
    () => setIndex((prev) => (prev + 1) % count),
    [count]
  );

  const prev = useCallback(
    () => setIndex((prev) => (prev - 1 + count) % count),
    [count]
  );

  return { isOpen, index, openAt, close, next, prev, setIndex };
}
