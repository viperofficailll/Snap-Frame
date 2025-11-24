import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone,
  Code,
  LayoutTemplate,
  Layers, 
  Image as ImageIcon, 
  Palette, 
  Sparkles, 
  Download,
  Upload,
  CreditCard,
  Maximize,
  Type,
  Move3d,
  Box
} from 'lucide-react';
import { EditorConfig, PRESET_GRADIENTS, PRESET_SOLIDS, WindowTheme, AspectRatio } from '../types';

interface ControlPanelProps {
  config: EditorConfig;
  setConfig: React.Dispatch<React.SetStateAction<EditorConfig>>;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
  isDownloading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  config, 
  setConfig, 
  onImageUpload, 
  onDownload,
  isDownloading
}) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'canvas' | 'bg' | 'mockup'>('templates');

  const updateConfig = <K extends keyof EditorConfig>(key: K, value: EditorConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const applyTemplate = (template: Partial<EditorConfig>) => {
    setConfig(prev => ({ ...prev, ...template }));
  };

  return (
    <div className="w-full md:w-80 h-full bg-zinc-900 border-t md:border-t-0 md:border-r border-zinc-800 flex flex-col">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-zinc-800 flex items-center gap-2 shrink-0">
        <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Sparkles className="w-3 h-3 md:w-5 md:h-5 text-white" />
        </div>
        <h1 className="font-bold text-base md:text-lg tracking-tight text-white">ScreenGlow</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 shrink-0 bg-zinc-900 overflow-x-auto scrollbar-hide">
         <button 
          onClick={() => setActiveTab('templates')}
          className={`flex-1 p-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'templates' ? 'text-white border-b-2 border-purple-500' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <LayoutTemplate className="w-4 h-4 mx-auto mb-1" />
          <span className="hidden md:inline">Templates</span>
        </button>
        <button 
          onClick={() => setActiveTab('canvas')}
          className={`flex-1 p-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'canvas' ? 'text-white border-b-2 border-purple-500' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Box className="w-4 h-4 mx-auto mb-1" />
           <span className="hidden md:inline">Canvas</span>
        </button>
        <button 
          onClick={() => setActiveTab('mockup')}
          className={`flex-1 p-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'mockup' ? 'text-white border-b-2 border-purple-500' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Monitor className="w-4 h-4 mx-auto mb-1" />
           <span className="hidden md:inline">Mockup</span>
        </button>
        <button 
          onClick={() => setActiveTab('bg')}
          className={`flex-1 p-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'bg' ? 'text-white border-b-2 border-purple-500' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Palette className="w-4 h-4 mx-auto mb-1" />
           <span className="hidden md:inline">Bg</span>
        </button>
      </div>

      {/* Scrollable Controls Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Upload Button */}
        <div>
          <label className="flex items-center justify-center w-full h-10 md:h-12 gap-2 px-4 transition-all border border-dashed rounded-lg cursor-pointer bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 group">
            <Upload className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span className="text-sm font-medium text-zinc-400 group-hover:text-white">Upload Screenshot</span>
            <input type="file" className="hidden" accept="image/*" onChange={onImageUpload} />
          </label>
        </div>

        {activeTab === 'templates' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-200">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Quick Start</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => applyTemplate({ 
                  padding: 64, shadow: 20, rotateX: 0, rotateY: 0, scale: 1, 
                  windowTheme: 'macOS-dark', backgroundValue: PRESET_GRADIENTS[0] 
                })}
                className="p-3 text-left border rounded-lg bg-zinc-800 border-zinc-700 hover:border-purple-500 transition-all"
              >
                <div className="w-full h-12 mb-2 rounded bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-white/50" />
                </div>
                <div className="text-xs font-medium text-zinc-200">Standard</div>
              </button>

              <button 
                onClick={() => applyTemplate({ 
                  padding: 80, shadow: 50, rotateX: 20, rotateY: -20, scale: 0.9, 
                  windowTheme: 'macOS-dark', backgroundValue: PRESET_GRADIENTS[1]
                })}
                className="p-3 text-left border rounded-lg bg-zinc-800 border-zinc-700 hover:border-purple-500 transition-all"
              >
                <div className="w-full h-12 mb-2 rounded bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Move3d className="w-4 h-4 text-white/50" />
                </div>
                <div className="text-xs font-medium text-zinc-200">3D Float</div>
              </button>

              <button 
                onClick={() => applyTemplate({ 
                  padding: 40, shadow: 30, rotateX: 0, rotateY: 0, scale: 1, 
                  windowTheme: 'iphone', aspectRatio: 'instagram', backgroundValue: PRESET_GRADIENTS[2]
                })}
                className="p-3 text-left border rounded-lg bg-zinc-800 border-zinc-700 hover:border-purple-500 transition-all"
              >
                <div className="w-full h-12 mb-2 rounded bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-white/50" />
                </div>
                <div className="text-xs font-medium text-zinc-200">Phone Demo</div>
              </button>

              <button 
                onClick={() => applyTemplate({ 
                  padding: 50, shadow: 25, rotateX: 0, rotateY: 0, scale: 1, 
                  windowTheme: 'code', aspectRatio: 'auto', backgroundValue: PRESET_GRADIENTS[7]
                })}
                className="p-3 text-left border rounded-lg bg-zinc-800 border-zinc-700 hover:border-purple-500 transition-all"
              >
                <div className="w-full h-12 mb-2 rounded bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <Code className="w-4 h-4 text-white/50" />
                </div>
                <div className="text-xs font-medium text-zinc-200">Dev Code</div>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'canvas' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-200 pb-4">
            <div className="space-y-3">
              <label className="flex items-center justify-between text-xs font-medium text-zinc-400">
                <span>Padding</span>
                <span className="text-zinc-500">{config.padding}px</span>
              </label>
              <input 
                type="range" min="0" max="200" value={config.padding} 
                onChange={(e) => updateConfig('padding', Number(e.target.value))}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between text-xs font-medium text-zinc-400">
                <span>Inset</span>
                <span className="text-zinc-500">{config.inset}px</span>
              </label>
              <input 
                type="range" min="0" max="100" value={config.inset} 
                onChange={(e) => updateConfig('inset', Number(e.target.value))}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between text-xs font-medium text-zinc-400">
                <span>Image Scale</span>
                <span className="text-zinc-500">{Math.round(config.scale * 100)}%</span>
              </label>
              <input 
                type="range" min="0.5" max="1.5" step="0.01" value={config.scale} 
                onChange={(e) => updateConfig('scale', Number(e.target.value))}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

             <div className="space-y-3">
              <label className="block text-xs font-medium text-zinc-400">Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-2">
                {(['auto', '16:9', '4:3', '1:1', 'twitter', 'instagram'] as AspectRatio[]).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => updateConfig('aspectRatio', ratio)}
                    className={`px-2 py-1.5 text-xs rounded border transition-all ${
                      config.aspectRatio === ratio 
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-200' 
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    {ratio === 'twitter' ? 'Twitt' : ratio === 'instagram' ? 'IG' : ratio.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
                <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none transition-colors">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={config.showWatermark}
                            onChange={(e) => updateConfig('showWatermark', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500/50 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </div>
                    <span className="text-sm font-medium text-zinc-300">Show Watermark</span>
                </label>
            </div>
          </div>
        )}

        {activeTab === 'mockup' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-200 pb-4">
             <div className="space-y-3">
              <label className="block text-xs font-medium text-zinc-400">Window Style</label>
              <div className="grid grid-cols-2 gap-2">
                {(['macOS-dark', 'macOS-light', 'windows', 'code', 'iphone', 'none'] as WindowTheme[]).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => updateConfig('windowTheme', theme)}
                    className={`px-3 py-2 text-xs rounded border transition-all flex items-center justify-center gap-2 ${
                      config.windowTheme === theme 
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-200' 
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                     {theme === 'macOS-dark' && <Monitor className="w-3 h-3" />}
                     {theme === 'macOS-light' && <Monitor className="w-3 h-3" />}
                     {theme === 'windows' && <Maximize className="w-3 h-3" />}
                     {theme === 'iphone' && <Smartphone className="w-3 h-3" />}
                     {theme === 'code' && <Code className="w-3 h-3" />}
                     {theme.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between text-xs font-medium text-zinc-400">
                <span>Shadow Intensity</span>
                <span className="text-zinc-500">{config.shadow}</span>
              </label>
              <input 
                type="range" min="0" max="100" value={config.shadow} 
                onChange={(e) => updateConfig('shadow', Number(e.target.value))}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between text-xs font-medium text-zinc-400">
                <span>Border Radius</span>
                <span className="text-zinc-500">{config.borderRadius}px</span>
              </label>
              <input 
                type="range" min="0" max="60" value={config.borderRadius} 
                onChange={(e) => updateConfig('borderRadius', Number(e.target.value))}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-4">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <Move3d className="w-3 h-3" /> 3D Transforms
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between text-xs font-medium text-zinc-400">
                  <span>Rotate X (Tilt)</span>
                  <span className="text-zinc-500">{config.rotateX}°</span>
                </label>
                <input 
                  type="range" min="-50" max="50" value={config.rotateX} 
                  onChange={(e) => updateConfig('rotateX', Number(e.target.value))}
                  className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between text-xs font-medium text-zinc-400">
                  <span>Rotate Y (Turn)</span>
                  <span className="text-zinc-500">{config.rotateY}°</span>
                </label>
                <input 
                  type="range" min="-50" max="50" value={config.rotateY} 
                  onChange={(e) => updateConfig('rotateY', Number(e.target.value))}
                  className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bg' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-200 pb-4">
            
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-400">Gradients</label>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_GRADIENTS.map((grad, i) => (
                  <button
                    key={i}
                    onClick={() => {
                        updateConfig('backgroundType', 'gradient');
                        updateConfig('backgroundValue', grad);
                    }}
                    style={{ background: grad }}
                    className={`w-full aspect-square rounded-full border-2 transition-transform hover:scale-110 ${config.backgroundValue === grad ? 'border-white' : 'border-transparent'}`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-400">Solid Colors</label>
              <div className="grid grid-cols-5 gap-2">
                {PRESET_SOLIDS.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => {
                        updateConfig('backgroundType', 'solid');
                        updateConfig('backgroundValue', color);
                    }}
                    style={{ backgroundColor: color }}
                    className={`w-full aspect-square rounded-full border-2 transition-transform hover:scale-110 ${config.backgroundValue === color ? 'border-white' : 'border-transparent'}`}
                  />
                ))}
              </div>
            </div>
             
             <div className="pt-2">
                <label className="block text-xs font-medium text-zinc-400 mb-2">Custom Color</label>
                <div className="flex gap-2">
                    <input 
                        type="color" 
                        value={config.backgroundType === 'solid' && config.backgroundValue.startsWith('#') ? config.backgroundValue : '#000000'}
                        onChange={(e) => {
                             updateConfig('backgroundType', 'solid');
                             updateConfig('backgroundValue', e.target.value);
                        }}
                        className="h-8 w-full bg-transparent cursor-pointer rounded overflow-hidden"
                    />
                </div>
             </div>
          </div>
        )}

      </div>

      {/* Footer / Export */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-sm shrink-0">
        <button 
          onClick={onDownload}
          disabled={isDownloading}
          className="flex items-center justify-center w-full h-10 gap-2 font-medium text-white transition-all bg-white rounded-lg text-zinc-900 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
             <span className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isDownloading ? 'Exporting...' : 'Export Image'}
        </button>
        <p className="mt-2 text-[10px] text-center text-zinc-500">
           Free plan includes watermark. <span className="text-purple-400 cursor-pointer hover:underline">Upgrade $20</span>
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;