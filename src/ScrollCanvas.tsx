import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 300;

function getFramePath(index: number): string {
  const paddedIndex = String(index).padStart(4, "0");
  return `/frames/frame_${paddedIndex}.jpg`;
}

export function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      if (isLoaded[frameNumber] || inFlight[frameNumber]) {
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

        if (Math.round(currentFrame) === frameNumber) {
          isCanvasDirty = true;
        }

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
      const range = 6;
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
      } else {
        const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
        targetFrame = 1 + progress * (TOTAL_FRAMES - 1);
      }

      preloadNearScroll(Math.round(targetFrame));
    }

    function loop() {
      const delta = targetFrame - currentFrame;

      // Ultra-smooth easing / inertia lerp
      if (Math.abs(delta) > 0.001) {
        currentFrame += delta * 0.14;
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

    // Defer non-critical background preloading until after initial page load & idle
    function startIdlePreload() {
      const nav = navigator as unknown as { connection?: { saveData?: boolean } };
      if (nav.connection?.saveData) return;

      const queue: number[] = [];
      // 1. Keyframes first (every 10th frame)
      for (let i = 10; i <= TOTAL_FRAMES; i += 10) {
        if (!isLoaded[i]) queue.push(i);
      }
      // 2. Intermediate frames
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (i % 10 !== 0 && !isLoaded[i]) queue.push(i);
      }

      let qIndex = 0;
      const CONCURRENCY = 2; // Low concurrency to prevent bandwidth choking

      function nextWorker() {
        if (isDestroyed || qIndex >= queue.length) return;
        const fn = queue[qIndex++];
        loadFrame(fn, () => {
          if (!isDestroyed) {
            setTimeout(nextWorker, 40); // Gentle spacing between frames
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

    // 1. Load initial frame immediately
    loadFrame(1);

    // 2. Start background preload after 3 seconds of idle time (ensures FCP & LCP finish unhindered)
    idleTimer = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
          startIdlePreload();
        });
      } else {
        startIdlePreload();
      }
    }, 3200);

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
    <canvas
      ref={canvasRef}
      id="scroll-canvas"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
      style={{
        display: "block",
        backgroundColor: "#0b0b0e",
      }}
    />
  );
}
