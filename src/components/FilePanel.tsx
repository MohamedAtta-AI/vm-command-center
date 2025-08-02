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
    <div className={`bg-card flex flex-col ${className}`}>
      {/* File Panel Header */}
      <div className="p-4 border-b border-panel-border">
        <h3 className="text-sm font-medium text-foreground mb-3">File Management</h3>
        <Button variant="outline" size="sm" className="w-full">
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Drag and Drop Area */}
      <div 
        className={`m-4 border-2 border-dashed rounded-lg transition-colors ${
          dragActive 
            ? 'border-agent-blue bg-agent-blue/5' 
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="p-6 text-center">
          <CloudUpload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drag and drop a single file here or click to select a file
          </p>
        </div>
      </div>

      {/* Files List */}
      <div className="flex-1 flex flex-col">
        <div className="px-4 pb-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Recent Files
          </h4>
        </div>
        
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2 pb-4">
            {files.map((file) => (
              <Card key={file.id} className="p-3 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  {getFileIcon(file)}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {file.size && `${file.size} • `}{formatDate(file.uploadDate)}
                    </p>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}