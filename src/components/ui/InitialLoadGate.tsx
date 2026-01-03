'use client';

import { useEffect, useState } from 'react';
import EarthLoader from '@/components/EarthLoader';

type Phase = 'loading' | 'fading' | 'done';

type InitialLoadGateProps = {
  children: React.ReactNode;
  fadeMs?: number;
};

export default function InitialLoadGate({ children, fadeMs = 500 }: InitialLoadGateProps) {
  const [phase, setPhase] = useState<Phase>('loading');

  useEffect(() => {
    const finish = () => {
      setPhase('fading');
      window.setTimeout(() => setPhase('done'), fadeMs);
    };

    if (document.readyState === 'complete') {
      finish();
      return;
    }

    window.addEventListener('load', finish, { once: true });
    return () => window.removeEventListener('load', finish);
  }, [fadeMs]);

  const showOverlay = phase !== 'done';
  const showContent = phase !== 'loading';

  return (
    <div className="relative">
      <div
        className={`transition-opacity ${showContent ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDuration: `${fadeMs}ms` }}
      >
        {children}
      </div>

      {showOverlay && (
        <div
          className={`fixed inset-0 z-50 bg-background flex items-center justify-center transition-opacity ${
            phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ transitionDuration: `${fadeMs}ms` }}
        >
          <EarthLoader />
        </div>
      )}
    </div>
  );
}
