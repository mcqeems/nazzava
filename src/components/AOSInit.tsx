/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useEffect } from 'react';

export default function AOSInit() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mod = await import('aos');
        const AOS = (mod as any).default ?? mod;
        if (cancelled) return;
        if (AOS && typeof AOS.init === 'function') {
          AOS.init({
            once: true,
            duration: 800,
          });
          if (typeof AOS.refresh === 'function') AOS.refresh();
        }
      } catch {
        // If AOS can't load, don't break rendering.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
