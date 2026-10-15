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

    let currentFrame = 1;
    let targetFrame = 1;
    let lastRenderedIndex = -1;
    let isCanvasDirty = true;
    let animationFrameId: number;

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

    function updateScrollTarget() {
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        targetFrame = 1;
      } else {
        const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
        targetFrame = 1 + progress * (TOTAL_FRAMES - 1);
      }
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

    // Preload system
    function preloadFrames() {
      // 1. Immediately request Frame 1
      const firstImg = new Image();
      firstImg.src = getFramePath(1);

      const onFirstLoad = () => {
        images[1] = firstImg;
        isLoaded[1] = 1;
        isCanvasDirty = true;
        if (firstImg.decode) {
          firstImg.decode().catch(() => {});
        }
      };

      if (firstImg.complete && firstImg.naturalWidth > 0) {
        onFirstLoad();
      } else {
        firstImg.onload = onFirstLoad;
      }

      // 2. Load keyframes then remaining in parallel
      const queue: number[] = [];
      for (let i = 10; i <= TOTAL_FRAMES; i += 10) {
        queue.push(i);
      }
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (i % 10 !== 0) queue.push(i);
      }

      const CONCURRENCY = 12;
      let queueIndex = 0;

      function worker() {
        if (queueIndex >= queue.length) return;
        const frameNumber = queue[queueIndex++];
        const img = new Image();
        img.src = getFramePath(frameNumber);

        const onComplete = () => {
          images[frameNumber] = img;
          isLoaded[frameNumber] = 1;

          if (Math.round(currentFrame) === frameNumber) {
            isCanvasDirty = true;
          }

          if (img.decode) {
            img.decode().catch(() => {});
          }

          worker();
        };

        if (img.complete && img.naturalWidth > 0) {
          onComplete();
        } else {
          img.onload = onComplete;
          img.onerror = onComplete;
        }
      }

      for (let c = 0; c < CONCURRENCY; c++) {
        worker();
      }
    }

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("scroll", updateScrollTarget, { passive: true });

    resizeCanvas();
    updateScrollTarget();
    preloadFrames();
    animationFrameId = requestAnimationFrame(loop);

    return () => {
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
