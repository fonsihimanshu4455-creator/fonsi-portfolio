import {
  Megaphone,
  TrendingUp,
  Palette,
  Film,
  Sparkles,
  Target,
  Zap,
  Camera,
  PenTool,
  BarChart3,
  Rocket,
  MessageSquare,
} from "lucide-react";

export const ICONS = {
  megaphone: Megaphone,
  trending: TrendingUp,
  palette: Palette,
  film: Film,
  sparkles: Sparkles,
  target: Target,
  zap: Zap,
  camera: Camera,
  pen: PenTool,
  chart: BarChart3,
  rocket: Rocket,
  message: MessageSquare,
};

export const ICON_KEYS = Object.keys(ICONS);

export function getIcon(name) {
  return ICONS[name] || Megaphone;
}
