'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useMemo } from 'react';

const INTERNAL_STACK_KEY = 'internal_nav_stack_v1';
const MAX_STACK = 50;

export const ButtonBack = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPath = useMemo(() => {
    const qs = searchParams?.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.sessionStorage.getItem(INTERNAL_STACK_KEY);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      const stack = Array.isArray(parsed) ? (parsed.filter((v) => typeof v === 'string') as string[]) : [];
      if (stack[stack.length - 1] !== currentPath) {
        stack.push(currentPath);
      }
      window.sessionStorage.setItem(INTERNAL_STACK_KEY, JSON.stringify(stack.slice(-MAX_STACK)));
    } catch {
      // ignore
    }
  }, [currentPath]);

  const handleBack = () => {
    if (typeof window === 'undefined') {
      router.push('/');
      return;
    }

    try {
      const raw = window.sessionStorage.getItem(INTERNAL_STACK_KEY);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      const stack = Array.isArray(parsed) ? (parsed.filter((v) => typeof v === 'string') as string[]) : [];

      // Remove current route(s) from the end.
      while (stack.length && stack[stack.length - 1] === currentPath) {
        stack.pop();
      }

      const prev = stack.pop();
      window.sessionStorage.setItem(INTERNAL_STACK_KEY, JSON.stringify(stack.slice(-MAX_STACK)));

      if (typeof prev === 'string' && prev.startsWith('/')) {
        router.push(prev);
        return;
      }
    } catch {
      // ignore
    }

    // If we don't have an internal previous route, always go home.
    router.push('/');
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-4 left-2 md:top-10 md:left-6 z-40 flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-full bg-card shadow-[0_0_15px_rgba(0,0,0,0.15)] backdrop-blur-xl hover:bg-primary/10 hover:scale-110 transition-all duration-200"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4 md:w-8 md:h-8 text-foreground" />
    </button>
  );
};
