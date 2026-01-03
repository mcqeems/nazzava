'use client';

import { useEffect, useRef } from 'react';

type LayerDef = {
  ref: React.RefObject<SVGSVGElement | null>;
  initialOffset: { x: number; y: number };
  maxOffset: number;
  reverse?: boolean;
};

function CuteBot() {
  const containerRef = useRef<HTMLDivElement>(null);

  const hairRef = useRef<SVGSVGElement>(null);
  const headRef = useRef<SVGSVGElement>(null);
  const faceRef = useRef<SVGSVGElement>(null);
  const expressionRef = useRef<SVGSVGElement>(null);

  const leftEyeRef = useRef<SVGPathElement>(null);
  const rightEyeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const layers: LayerDef[] = [
      {
        ref: hairRef,
        initialOffset: { x: 0, y: -18 },
        maxOffset: 4,
        reverse: true,
      },
      {
        ref: headRef,
        initialOffset: { x: 0, y: 4 },
        maxOffset: 4,
      },
      {
        ref: faceRef,
        initialOffset: { x: 0, y: 7 },
        maxOffset: 8,
      },
      {
        ref: expressionRef,
        initialOffset: { x: 0, y: 7 },
        maxOffset: 12,
      },
    ];

    let containerRect: DOMRect = container.getBoundingClientRect();
    let maxDistance = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const setLayerOffset = (el: SVGSVGElement, x: number, y: number) => {
      el.style.setProperty('--offset-x', `${x}px`);
      el.style.setProperty('--offset-y', `${y}px`);
    };

    // initialize offsets
    layers.forEach((layer) => {
      const el = layer.ref.current;
      if (!el) return;
      setLayerOffset(el, layer.initialOffset.x, layer.initialOffset.y);
    });

    const updateParallax = () => {
      const centerX = containerRect.left + containerRect.width / 2;
      const centerY = containerRect.top + containerRect.height / 2;

      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance === 0) return;

      const influence = Math.min(distance / maxDistance, 1);
      const dirX = dx / distance;
      const dirY = dy / distance;

      layers.forEach((layer) => {
        const el = layer.ref.current;
        if (!el) return;

        const factor = layer.reverse ? -1 : 1;
        const offsetX = dirX * layer.maxOffset * influence * factor;
        const offsetY = dirY * layer.maxOffset * influence * factor;
        setLayerOffset(el, layer.initialOffset.x + offsetX, layer.initialOffset.y + offsetY);
      });
    };

    let rafId = 0;
    const animate = () => {
      updateParallax();
      rafId = window.requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onResize = () => {
      containerRect = container.getBoundingClientRect();
      maxDistance = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2;
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    rafId = window.requestAnimationFrame(animate);

    const blinkConfig = {
      minInterval: 5000,
      maxInterval: 10000,
      closeSpeed: 100,
      closedDuration: 150,
      openSpeed: 150,
    };

    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;

    let blinkTimeoutId: number | undefined;

    const blink = () => {
      if (!leftEye || !rightEye) return;

      const leftBox = leftEye.getBBox();
      const rightBox = rightEye.getBBox();
      const leftCenterY = leftBox.y + leftBox.height / 2;
      const rightCenterY = rightBox.y + rightBox.height / 2;

      leftEye.style.transformOrigin = `${leftBox.x + leftBox.width / 2}px ${leftCenterY}px`;
      rightEye.style.transformOrigin = `${rightBox.x + rightBox.width / 2}px ${rightCenterY}px`;

      leftEye.style.transition = `transform ${blinkConfig.closeSpeed}ms ease-out`;
      rightEye.style.transition = `transform ${blinkConfig.closeSpeed}ms ease-out`;
      leftEye.style.transform = 'scaleY(0.1)';
      rightEye.style.transform = 'scaleY(0.1)';

      window.setTimeout(() => {
        if (!leftEye || !rightEye) return;
        leftEye.style.transition = `transform ${blinkConfig.openSpeed}ms ease-out`;
        rightEye.style.transition = `transform ${blinkConfig.openSpeed}ms ease-out`;
        leftEye.style.transform = 'scaleY(1)';
        rightEye.style.transform = 'scaleY(1)';
      }, blinkConfig.closeSpeed + blinkConfig.closedDuration);
    };

    const scheduleBlink = () => {
      const randomDelay = Math.random() * (blinkConfig.maxInterval - blinkConfig.minInterval) + blinkConfig.minInterval;
      blinkTimeoutId = window.setTimeout(() => {
        blink();
        scheduleBlink();
      }, randomDelay);
    };

    scheduleBlink();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
      if (blinkTimeoutId) window.clearTimeout(blinkTimeoutId);
    };
  }, []);

  return (
    <div id="chatbot" ref={containerRef}>
      <svg
        id="hair"
        className="robot-layer"
        ref={hairRef}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M29.9988 24.148L5.8512 0L-5.0344e-05 5.85133L24.1476 29.9993L29.9988 24.148Z" fill="#0E75B4" />
        <path d="M24.1487 0.00046199L0.00109863 24.1484L5.85235 29.9998L30 5.8518L24.1487 0.00046199Z" fill="#0E75B4" />
      </svg>
      <svg
        id="head"
        className="robot-layer"
        ref={headRef}
        width="52"
        height="50"
        viewBox="0 0 52 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26,0c20.24,0,26,5.49,26,26.47,0,23.84-10.75,23.53-26,23.53S0,50.31,0,26.47C0,5.49,5.76,0,26,0Z"
          fill="url(#head-color)"
        />
        <defs>
          <linearGradient id="head-color" x1="26" y1="0" x2="26" y2="50" gradientUnits="userSpaceOnUse">
            <stop stop-color="#69D7FF" />
            <stop offset="1" stop-color="#00B4F5" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        id="face"
        className="robot-layer"
        ref={faceRef}
        width="44"
        height="36"
        viewBox="0 0 44 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22,36c15.09,0,20.52-.87,21.83-16.94S39.44,0,22,0-1.1,3.45.17,19.06c1.3,16.07,6.74,16.94,21.83,16.94Z"
          fill="url(#face-color)"
        />
        <defs>
          <linearGradient id="face-color" x1="22" y1="0" x2="22" y2="36" gradientUnits="userSpaceOnUse">
            <stop stop-color="#005284" />
            <stop offset="1" stop-color="#0076BE" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        id="expression"
        className="robot-layer"
        ref={expressionRef}
        width="30"
        height="15"
        viewBox="0 0 32 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="eye-l"
          ref={leftEyeRef}
          d="M3.78,12c3.45,0,3.78-2.7,3.78-6S7.56,0,3.78,0,0,2.7,0,6s.33,6,3.78,6Z"
          fill="white"
        />
        <path
          id="mouth"
          d="M13.05,12.76c-1.13-.45-.82,2.24,2.99,2.24,4.21,0,4.24-3.55,3.01-4.13-1.35-.64-1.75,3.6-5.99,1.89Z"
          fill="white"
        />
        <path
          id="eye-r"
          ref={rightEyeRef}
          d="M26.22,12c3.45,0,3.78-2.7,3.78-6s0-6-3.78-6-3.78,2.7-3.78,6,.33,6,3.78,6Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default CuteBot;
