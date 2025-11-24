export type BackgroundType = 'solid' | 'gradient' | 'image';
export type WindowTheme = 'macOS-dark' | 'macOS-light' | 'windows' | 'iphone' | 'code' | 'none';
export type AspectRatio = 'auto' | '16:9' | '4:3' | '1:1' | 'twitter' | 'instagram';

export interface EditorConfig {
  padding: number;
  inset: number;
  shadow: number;
  borderRadius: number;
  windowTheme: WindowTheme;
  backgroundType: BackgroundType;
  backgroundValue: string;
  aspectRatio: AspectRatio;
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  showWatermark: boolean;
}

export const PRESET_GRADIENTS = [
  'linear-gradient(to right, #ff80b5, #9089fc)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
  'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
  'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
  'linear-gradient(to right, #243949 0%, #517fa4 100%)',
];

export const PRESET_SOLIDS = [
  '#18181b', // Zinc 900
  '#ffffff', // White
  '#ef4444', // Red 500
  '#f97316', // Orange 500
  '#eab308', // Yellow 500
  '#22c55e', // Green 500
  '#3b82f6', // Blue 500
  '#a855f7', // Purple 500
  '#ec4899', // Pink 500
];