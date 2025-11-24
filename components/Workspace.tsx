
import React, { useRef, useEffect, useState } from 'react';
import { EditorConfig, WindowTheme } from '../types';
import { toPng } from 'html-to-image';

interface WorkspaceProps {
  image: string | null;
  config: EditorConfig;
  exportTrigger: number;
  onExportComplete: () => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ image, config, exportTrigger, onExportComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Handle Export
  useEffect(() => {
    if (exportTrigger > 0 && canvasRef.current) {
       // Small delay to ensure any layout shifts are settled
       setTimeout(() => {
           if (!canvasRef.current) return;
           toPng(canvasRef.current, { 
               cacheBust: true, 
               pixelRatio: 3, // High quality export
               skipAutoScale: true,
               fontEmbedCSS: '', // Avoid remote font CORS issues
               style: {
                 transform: 'scale(1)', // Ensure it exports at 100% scale even if zoomed out in preview
               }
           })
             .then((dataUrl) => {
               const link = document.createElement('a');
               link.download = `screenglow-${Date.now()}.png`;
               link.href = dataUrl;
               link.click();
               onExportComplete();
             })
             .catch((err) => {
               console.error('Export failed', err);
               onExportComplete();
             });
       }, 100);
    }
  }, [exportTrigger, onExportComplete]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
        if(containerRef.current) {
            setContainerSize({
                width: containerRef.current.clientWidth,
                height: containerRef.current.clientHeight
            });
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ---------------------------------------------------------------------------
  // Styles & Helpers
  // ---------------------------------------------------------------------------

  const getBackgroundStyle = () => {
     return {
        background: config.backgroundType === 'image' 
          ? `${config.backgroundValue} center/cover no-repeat` 
          : config.backgroundValue,
        padding: `${config.padding}px`,
     };
  };

  const getWrapperStyle = () => {
    // This wrapper handles the 3D transforms
    return {
        transform: `rotateX(${config.rotateX}deg) rotateY(${config.rotateY}deg) scale(${config.scale})`,
        transformStyle: 'preserve-3d' as const,
        boxShadow: config.shadow > 0 
            ? `${config.shadow}px ${config.shadow * 2}px ${config.shadow * 4}px rgba(0,0,0,${Math.min(0.6, config.shadow / 50)})` 
            : 'none',
        borderRadius: config.windowTheme === 'iphone' ? '3rem' : `${config.borderRadius}px`,
    };
  };

  // Determine Aspect Ratio
  let aspectRatioStyle: React.CSSProperties = {};
  if (config.aspectRatio !== 'auto') {
      if (config.aspectRatio === 'twitter') aspectRatioStyle = { aspectRatio: '16/9' };
      else if (config.aspectRatio === 'instagram') aspectRatioStyle = { aspectRatio: '4/5' };
      else aspectRatioStyle = { aspectRatio: config.aspectRatio.replace(':', '/') };
  } else if (!image) {
      aspectRatioStyle = { aspectRatio: '16/9' };
  }

  // ---------------------------------------------------------------------------
  // Sub-Components for Frames
  // ---------------------------------------------------------------------------

  const WindowControls = ({ theme }: { theme: WindowTheme }) => {
    if (theme === 'none' || theme === 'iphone') return null;

    if (theme === 'windows') {
      return (
        <div className="h-8 bg-[#f3f3f3] flex items-center justify-end px-3 gap-4 border-b border-black/5 shrink-0">
             <div className="w-2.5 h-[1px] bg-black"></div>
             <div className="w-2.5 h-2.5 border border-black"></div>
             <div className="w-2.5 h-2.5 relative">
                <div className="absolute inset-0 rotate-45 bg-black h-[1px] top-1/2"></div>
                <div className="absolute inset-0 -rotate-45 bg-black h-[1px] top-1/2"></div>
             </div>
        </div>
      );
    }

    if (theme === 'code') {
       return (
         <div className="h-10 bg-[#1e1e1e] flex items-center px-4 gap-4 shrink-0">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="flex-1 flex justify-center">
                <div className="bg-[#2d2d2d] px-4 py-1 rounded text-[10px] text-zinc-400 font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    index.tsx
                </div>
            </div>
            <div className="w-16"></div>
         </div>
       );
    }

    // MacOS Default
    return (
      <div className={`h-8 flex items-center px-4 gap-2 border-b shrink-0 ${theme === 'macOS-light' ? 'bg-white border-black/5' : 'bg-[#2a2a2a] border-black/20'}`}>
        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
        {(theme === 'macOS-light' || theme === 'macOS-dark') && (
            <div className={`flex-1 mx-4 h-5 rounded flex items-center justify-center text-[10px] opacity-50 ${theme === 'macOS-light' ? 'bg-black/5' : 'bg-black/20'}`}>
                mysite.com
            </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (config.windowTheme === 'iphone') {
        return (
            <div 
                className="relative bg-black h-full w-full flex flex-col overflow-hidden"
                style={{ borderRadius: '3rem', border: '12px solid #121212' }}
            >
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-[#121212] z-20 rounded-b-2xl flex justify-center items-center pointer-events-none">
                     <div className="w-16 h-1 bg-[#2a2a2a] rounded-full"></div>
                </div>
                
                {/* Status Bar Mockup */}
                <div className="h-12 w-full bg-white flex justify-between items-center px-8 pt-2 text-black text-[10px] font-bold z-10 shrink-0">
                    <span>9:41</span>
                    <div className="flex gap-1.5">
                        <div className="w-4 h-2.5 bg-black rounded-[1px]"></div>
                        <div className="w-0.5 h-2.5 bg-black/30 rounded-[1px]"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 relative overflow-hidden bg-white">
                     {image ? (
                        <img 
                            src={image} 
                            alt="Screenshot" 
                            className="w-full h-full object-cover"
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-400">
                             Preview
                        </div>
                     )}
                </div>
                 
                 {/* Home Indicator */}
                 <div className="h-6 w-full bg-white flex justify-center items-center shrink-0 z-10">
                     <div className="w-32 h-1 bg-black/20 rounded-full"></div>
                 </div>
            </div>
        );
    }

    // Standard Window Themes
    return (
        <div 
            className="flex flex-col h-full w-full overflow-hidden bg-white"
            style={{ borderRadius: `${config.borderRadius}px` }}
        >
             <WindowControls theme={config.windowTheme} />
             <div className="flex-1 relative overflow-hidden bg-zinc-100">
                {image ? (
                     <img 
                        src={image} 
                        alt="Screenshot" 
                        className="w-full h-full object-cover block"
                     />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                        Drop image here
                    </div>
                )}
             </div>
        </div>
    );
  };

  return (
    <div className="flex-1 h-full bg-zinc-950 overflow-hidden relative flex items-center justify-center p-4 md:p-8 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]">
        {/* Viewport for centering */}
        <div 
            ref={containerRef}
            className="relative flex items-center justify-center w-full h-full max-w-[90vw] max-h-[85vh]"
            style={{ perspective: '2000px' }} // Adjusted perspective for better 3D effect
        >
            {/* The Actual Capture Target */}
            <div 
                ref={canvasRef}
                id="canvas-target"
                style={{
                    ...getBackgroundStyle(),
                    ...aspectRatioStyle,
                }}
                className={`relative flex items-center justify-center transition-all duration-300 ease-out shadow-2xl ${!image ? 'w-full h-full max-w-4xl' : 'min-w-[300px]'}`}
            >
                {!image && (
                     <div className="absolute inset-0 flex items-center justify-center text-zinc-500/50 pointer-events-none">
                        <span className="text-xl font-medium tracking-widest uppercase">Canvas Area</span>
                     </div>
                )}
                
                {/* Inset Container - Handles spacing between window and edge */}
                <div 
                    className="relative w-full h-full flex items-center justify-center transition-all duration-300"
                    style={{ padding: `${config.inset}px` }}
                >
                    {/* The Window/Device Frame Wrapper (3D Transforms applied here) */}
                    <div 
                        style={getWrapperStyle()}
                        className={`relative w-full h-full transition-all duration-300 group ${config.windowTheme === 'iphone' ? 'max-w-[400px] mx-auto' : ''}`}
                    >
                        {renderContent()}
                    </div>
                </div>

                {/* Watermark */}
                {config.showWatermark && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 opacity-40 mix-blend-overlay pointer-events-none">
                        <div className="w-3 h-3 rounded-sm bg-white/50"></div>
                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">ScreenGlow</span>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default Workspace;
