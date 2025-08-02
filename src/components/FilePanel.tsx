import { useState } from "react";
import { Upload, File, FolderOpen, Download, Trash2, CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  uploadDate: Date;
}

interface FilePanelProps {
  className?: string;
}

export function FilePanel({ className = "" }: FilePanelProps) {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "task_results.pdf",
      type: "file",
      size: "2.4 MB",
      uploadDate: new Date(Date.now() - 3600000)
    },
    {
      id: "2", 
      name: "screenshots",
      type: "folder",
      uploadDate: new Date(Date.now() - 7200000)
    }
  ]);

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      console.log("Files dropped:", e.dataTransfer.files);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getFileIcon = (item: FileItem) => {
    return item.type === 'folder' ? (
      <FolderOpen className="h-4 w-4 text-blue-500" />
    ) : (
      <File className="h-4 w-4 text-gray-500" />
    );
  };

  return (
    <div className={`bg-card flex flex-col min-h-0 ${className}`}>
      {/* File Panel Header */}
      <div className="p-4 border-b border-panel-border">
        <h3 className="text-sm font-medium text-foreground">File Management</h3>
      </div>

      {/* Drag and Drop Area - Full Height */}
      <div 
        className={`flex-1 m-4 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
          dragActive 
            ? 'border-agent-blue bg-agent-blue/5' 
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              console.log("File selected:", file);
            }
          };
          input.click();
        }}
      >
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <CloudUpload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h4 className="text-sm font-medium text-foreground mb-2">
            Upload Files
          </h4>
          <p className="text-sm text-muted-foreground">
            Drag and drop files here or click to select
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Supports single file upload
          </p>
        </div>
      </div>
    </div>
  );
}