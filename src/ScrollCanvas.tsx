import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 300;

function getFramePath(index: number): string {
  const paddedIndex = String(index).padStart(4, "0");
  return `/frames/frame_${paddedIndex}.jpg`;
}

export function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    const cvs: HTMLCanvasElement = canvas;
    const context: CanvasRenderingContext2D = ctx;

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES + 1).fill(null);
    const isLoaded = new Uint8Array(TOTAL_FRAMES + 1);
    const inFlight = new Uint8Array(TOTAL_FRAMES + 1);

    let currentFrame = 1;
    let targetFrame = 1;
    let lastRenderedIndex = -1;
    let isCanvasDirty = true;
    let animationFrameId: number;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let isDestroyed = false;

    function getBestAvailableFrame(index: number): HTMLImageElement | null {
      if (isLoaded[index] && images[index]) {
        return images[index];
      }

      // Search outward for closest loaded frame
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = index - offset;
        if (prev >= 1 && isLoaded[prev] && images[prev]) {
          return images[prev];
        }
        const next = index + offset;
        if (next <= TOTAL_FRAMES && isLoaded[next] && images[next]) {
          return images[next];
        }
      }

      return null;
    }

    function drawFrame(index: number) {
      const img = getBestAvailableFrame(index);
      if (!img) return;

      const cw = cvs.width;
      const ch = cvs.height;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      if (!iw || !ih) return;

      // Cover scaling: fill canvas while maintaining 16:9 aspect ratio
      const scale = Math.max(cw / iw, ch / ih);
      const sw = Math.round(iw * scale);
      const sh = Math.round(ih * scale);
      const sx = Math.round((cw - sw) / 2);
      const sy = Math.round((ch - sh) / 2);

      context.drawImage(img, sx, sy, sw, sh);
    }

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      const targetWidth = Math.round(width * dpr);
      const targetHeight = Math.round(height * dpr);

      if (cvs.width !== targetWidth || cvs.height !== targetHeight) {
        cvs.width = targetWidth;
        cvs.height = targetHeight;
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        isCanvasDirty = true;
      }

      updateScrollTarget();
    }

    function loadFrame(frameNumber: number, onDone?: () => void) {
      if (frameNumber < 1 || frameNumber > TOTAL_FRAMES) return;
      if (isLoaded[frameNumber]) {
        onDone?.();
        return;
      }
      if (inFlight[frameNumber]) {
        onDone?.();
        return;
      }

      inFlight[frameNumber] = 1;
      const img = new Image();
      img.src = getFramePath(frameNumber);

      const onComplete = () => {
        if (isDestroyed) return;
        images[frameNumber] = img;
        isLoaded[frameNumber] = 1;
        inFlight[frameNumber] = 0;
        // Always mark canvas dirty so that newly loaded frame or nearby frame renders immediately!
        isCanvasDirty = true;

        if (img.decode) {
          img.decode().catch(() => {});
        }
        onDone?.();
      };

      if (img.complete && img.naturalWidth > 0) {
        onComplete();
      } else {
        img.onload = onComplete;
        img.onerror = onComplete;
      }
    }

    function preloadNearScroll(centerFrame: number) {
      // Prioritize nearby frames around current scroll direction
      const range = 15;
      for (let i = 0; i <= range; i++) {
        const next = centerFrame + i;
        if (next <= TOTAL_FRAMES) loadFrame(next);
        const prev = centerFrame - i;
        if (prev >= 1) loadFrame(prev);
      }
    }

    function updateScrollTarget() {
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        targetFrame = 1;
        setScrollPercent(0);
      } else {
        const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
        targetFrame = 1 + progress * (TOTAL_FRAMES - 1);
        setScrollPercent(Math.round(progress * 100));
      }

      preloadNearScroll(Math.round(targetFrame));
    }

    function loop() {
      const delta = targetFrame - currentFrame;

      // Ultra-smooth easing / inertia lerp
      if (Math.abs(delta) > 0.001) {
        currentFrame += delta * 0.18;
      } else {
        currentFrame = targetFrame;
      }

      const renderIndex = Math.min(Math.max(Math.round(currentFrame), 1), TOTAL_FRAMES);

      if (renderIndex !== lastRenderedIndex || isCanvasDirty) {
        drawFrame(renderIndex);
        lastRenderedIndex = renderIndex;
        isCanvasDirty = false;
      }

      animationFrameId = requestAnimationFrame(loop);
    }

    // Fast progressive background preloading
    function startIdlePreload() {
      const nav = navigator as unknown as { connection?: { saveData?: boolean } };
      if (nav.connection?.saveData) return;

      const queue: number[] = [];
      // 1. Keyframes first (every 5th frame for immediate coverage across entire scroll)
      for (let i = 5; i <= TOTAL_FRAMES; i += 5) {
        if (!isLoaded[i]) queue.push(i);
      }
      // 2. Intermediate frames
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (i % 5 !== 0 && !isLoaded[i]) queue.push(i);
      }

      let qIndex = 0;
      const CONCURRENCY = 4;

      function nextWorker() {
        if (isDestroyed || qIndex >= queue.length) return;
        const fn = queue[qIndex++];
        loadFrame(fn, () => {
          if (!isDestroyed) {
            setTimeout(nextWorker, 15);
          }
        });
      }

      for (let c = 0; c < CONCURRENCY; c++) {
        nextWorker();
      }
    }

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("scroll", updateScrollTarget, { passive: true });

    resizeCanvas();
    updateScrollTarget();

    // 1. Load initial frames immediately
    loadFrame(1);
    for (let f = 2; f <= 30; f++) {
      loadFrame(f);
    }

    // 2. Start background keyframe preload after 200ms
    idleTimer = setTimeout(() => {
      startIdlePreload();
    }, 200);

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      isDestroyed = true;
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", updateScrollTarget);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* 3D Scroll Canvas: fixed at z-0 so it is NEVER hidden behind body background */}
      <canvas
        ref={canvasRef}
        id="scroll-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{
          display: "block",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#08090d",
        }}
      />

      {/* Subtle luxury ambient vignette overlay: soft dark gradient at edges for text readability while leaving 3D animation bright */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(8, 9, 13, 0.05) 0%, rgba(8, 9, 13, 0.4) 65%, rgba(8, 9, 13, 0.8) 100%)",
        }}
      />

      {/* Floating 3D Tour Status HUD at bottom right */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-30 pointer-events-none flex items-center gap-2.5 glass-panel-gold px-3.5 py-1.5 rounded-full border border-amber-400/40 shadow-xl backdrop-blur-xl">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span className="text-[11px] font-bold text-amber-200 tracking-wider uppercase">
          3D Tour: {scrollPercent}%
        </span>
      </div>
    </>
  );
}
