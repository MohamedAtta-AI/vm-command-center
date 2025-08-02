import { Monitor, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VNCPanelProps {
  className?: string;
}

export function VNCPanel({ className = "" }: VNCPanelProps) {
  return (
    <div className={`bg-card border-r border-panel-border flex flex-col ${className}`}>
      {/* VNC Toolbar */}
      <div className="p-3 border-b border-panel-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Monitor className="h-4 w-4" />
            Virtual Machine Connection
          </div>
          <Button variant="ghost" size="sm">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* VNC Display Area */}
      <div className="flex-1 bg-vnc-background relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white/60">
            <Monitor className="h-12 w-12 mx-auto mb-4 opacity-40" />
            <p className="text-sm">VNC Connection Active</p>
            <p className="text-xs opacity-60 mt-1">Desktop Environment Ready</p>
          </div>
        </div>

        {/* Simulated desktop taskbar */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/90 flex items-center px-2">
          <div className="text-white text-xs">Workspace 1</div>
          <div className="flex-1" />
          <div className="flex gap-1">
            {/* Simulated taskbar icons */}
            <div className="w-8 h-6 bg-green-600/80 rounded-sm"></div>
            <div className="w-8 h-6 bg-orange-600/80 rounded-sm"></div>
            <div className="w-8 h-6 bg-red-600/80 rounded-sm"></div>
            <div className="w-8 h-6 bg-blue-600/80 rounded-sm"></div>
            <div className="w-8 h-6 bg-gray-600/80 rounded-sm"></div>
            <div className="w-8 h-6 bg-purple-600/80 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}