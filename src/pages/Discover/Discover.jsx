import React, { useEffect, useRef, useState } from 'react';

const frameModules = import.meta.glob('../../cas-img-seq/ezgif-frame-*.jpg', {
  eager: true,
  import: 'default',
});

const frameMap = Object.entries(frameModules).reduce((acc, [path, url]) => {
  const match = path.match(/ezgif-frame-(\d+)\.jpg$/);
  if (match) {
    acc[Number(match[1])] = url;
  }
  return acc;
}, {});

const frameUrls = Object.keys(frameMap)
  .map(Number)
  .sort((a, b) => a - b)
  .map((num) => frameMap[num]);

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const Discover = () => {
  const sceneRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);

  const [activeFrame, setActiveFrame] = useState(0);
  const [loadedFrames, setLoadedFrames] = useState(0);

  const renderCanvasFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let drawWidth, drawHeight;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
    } else {
      drawWidth = height * imgRatio;
      drawHeight = height;
    }

    // 15% zoom factor to crop top/bottom blank areas
    const ZOOM_FACTOR = 1.15;
    drawWidth *= ZOOM_FACTOR;
    drawHeight *= ZOOM_FACTOR;

    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  useEffect(() => {
    if (frameUrls.length === 0) return;

    let loadedCount = 0;
    const loadedImages = [];

    frameUrls.forEach((url, idx) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
      img.onload = () => {
        loadedCount += 1;
        setLoadedFrames(loadedCount);
        if (idx === 0) {
          renderCanvasFrame(0);
        }
      };
      loadedImages[idx] = img;
    });

    imagesRef.current = loadedImages;
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || frameUrls.length === 0) return undefined;

    let animationFrameId;

    const handleScroll = () => {
      const bounds = scene.getBoundingClientRect();
      const scrollDistance = scene.offsetHeight - window.innerHeight;
      const progress = clamp(-bounds.top / scrollDistance, 0, 1);
      const nextFrame = Math.round(progress * (frameUrls.length - 1));

      if (nextFrame !== currentFrameRef.current) {
        currentFrameRef.current = nextFrame;

        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          renderCanvasFrame(nextFrame);
          setActiveFrame(nextFrame);
        });
      }
    };

    const handleResize = () => {
      renderCanvasFrame(currentFrameRef.current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main
      ref={sceneRef}
      className="discover-page relative isolate min-h-[500vh] bg-slate-950 text-white font-sans"
    >
      {/* Canvas Layer */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-slate-950">
        <canvas ref={canvasRef} className="h-full w-full object-cover" />

        {/* Multi-pass Overlay */}
        <div className="absolute inset-0 bg-slate-950/50 backdrop-brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-indigo-950/40 to-slate-950/80" />
        <div className="discover-grain pointer-events-none absolute inset-0 opacity-20" />
      </div>

      {/* Frame Rail */}
      <div className="pointer-events-none fixed right-3 top-1/2 z-10 hidden h-40 -translate-y-1/2 flex-col items-center gap-3 sm:flex lg:right-8">
        <span className="font-mono text-[10px] text-slate-400">01</span>
        <div className="relative h-24 w-px bg-white/20">
          <div
            className="absolute left-0 top-0 w-px bg-indigo-400 transition-[height] duration-150"
            style={{
              height: `${frameUrls.length > 1 ? (activeFrame / (frameUrls.length - 1)) * 100 : 0}%`,
            }}
          />
        </div>
        <span className="font-mono text-[10px] text-slate-400">
          {String(frameUrls.length).padStart(2, '0')}
        </span>
      </div>

      <p className="pointer-events-none fixed bottom-6 right-6 z-10 font-mono text-xs text-slate-400">
        {String(activeFrame + 1).padStart(2, '0')} / {String(frameUrls.length).padStart(2, '0')}
      </p>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex min-h-[85vh] items-end px-6 pb-16 pt-36 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-4">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-indigo-400">
              <span className="h-px w-10 bg-indigo-400" />
              Porphyra / visual index
            </p>
            <h1 className="max-w-3xl font-bold tracking-tight text-5xl leading-[0.95] sm:text-7xl lg:text-[clamp(4.5rem,10vw,8.5rem)] text-white drop-shadow-md">
              Discover the sequence.
            </h1>
            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-300 sm:text-base font-normal">
              Scroll through 84 frames and watch a single moment unfold. Every movement is held in the image, waiting for your pace.
            </p>
            <div className="pt-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              <span className="h-9 w-px bg-indigo-400" />
              Scroll to explore
            </div>
          </div>
        </section>

        {/* Section 2: Positioned on the Left Side */}
        <section className="flex min-h-screen items-center justify-start px-6 sm:px-10 lg:px-16">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-semibold">Frame study</p>
            <p className="mt-2 font-bold tracking-tight text-2xl sm:text-3xl text-white">In motion, in focus.</p>
          </div>
        </section>

        {/* Section 3: Positioned on the Right Side */}
        <section className="flex min-h-screen items-center justify-end border-t border-white/10 px-6 py-24 sm:px-10 lg:px-16">
          <div className="max-w-lg w-full p-8 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-400">Afterimage</p>
            <h2 className="font-bold tracking-tight text-3xl sm:text-5xl text-white leading-tight">A slower way to see.</h2>
            <p className="text-sm leading-7 text-slate-300 sm:text-base font-normal">
              The sequence responds directly to your scroll. Move back, linger, or rush forward; the composition follows, frame by frame.
            </p>
            <p className="pt-2 text-xs font-mono uppercase tracking-[0.2em] text-indigo-300">
              {loadedFrames} / {frameUrls.length} frames ready
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Discover;