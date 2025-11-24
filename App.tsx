import React, { useState, useCallback } from 'react';
import ControlPanel from './components/ControlPanel';
import Workspace from './components/Workspace';
import { EditorConfig, PRESET_GRADIENTS } from './types';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [exportTrigger, setExportTrigger] = useState(0);

  const [config, setConfig] = useState<EditorConfig>({
    padding: 64,
    inset: 0,
    shadow: 20,
    borderRadius: 12,
    windowTheme: 'macOS-dark',
    backgroundType: 'gradient',
    backgroundValue: PRESET_GRADIENTS[0],
    aspectRatio: 'auto',
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    showWatermark: true,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                setImage(event.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    }
  }, []);

  const handleDownload = () => {
    if (!image) return;
    setIsDownloading(true);
    setExportTrigger(prev => prev + 1);
  };

  const handleExportComplete = () => {
    setIsDownloading(false);
  };

  return (
    <div 
        className="flex flex-col md:flex-row h-screen w-screen bg-black text-white overflow-hidden font-sans"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
    >
      {/* Workspace Area - Top on Mobile, Right on Desktop */}
      <div className="order-1 md:order-2 h-[45vh] md:h-full flex-1 relative z-10 bg-zinc-950 min-h-0">
        <Workspace 
            image={image} 
            config={config} 
            exportTrigger={exportTrigger}
            onExportComplete={handleExportComplete}
        />
      </div>

      {/* Control Panel - Bottom on Mobile, Left on Desktop */}
      <div className="order-2 md:order-1 h-[55vh] md:h-full w-full md:w-auto relative z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] md:shadow-none">
        <ControlPanel 
            config={config} 
            setConfig={setConfig} 
            onImageUpload={handleImageUpload} 
            onDownload={handleDownload}
            isDownloading={isDownloading}
        />
      </div>
    </div>
  );
};

export default App;