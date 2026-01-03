'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const ButtonBack = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-4 left-2 md:top-10 md:left-6 z-40 flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-full bg-card shadow-[0_0_15px_rgba(0,0,0,0.15)] backdrop-blur-xl hover:bg-primary/10 hover:scale-110 transition-all duration-200"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4 md:w-8 md:h-8 text-foreground" />
    </button>
  );
};
