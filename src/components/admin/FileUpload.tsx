"use client";

import { useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, FileText } from "lucide-react";

interface FileUploadProps {
    value?: string;
    onChange: (storageId: string) => void;
    onRemove: () => void;
    label?: string;
    accept?: string;
    description?: string;
    className?: string;
}

export function FileUpload({ 
    value, 
    onChange, 
    onRemove, 
    label = "Upload File", 
    accept = "*",
    description = "PDF, DOCX, ZIP",
    className 
}: FileUploadProps) {
    const generateUploadUrl = useMutation(api.media.generateUploadUrl);
    const fileUrl = useQuery(api.media.getUrl, value ? { storageId: value as Id<"_storage"> } : "skip");
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const postUrl = await generateUploadUrl();

            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });

            if (!result.ok) {
                throw new Error(`Upload failed: ${result.statusText}`);
            }

            const { storageId } = await result.json();
            onChange(storageId);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload file. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={className}>
            {value ? (
                <div className="relative w-full h-24 bg-muted/30 rounded-lg border border-border flex items-center justify-between p-4 group">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-foreground truncate">File Selected</span>
                            {fileUrl ? (
                                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline truncate">View File</a>
                            ) : (
                                <span className="text-xs text-muted-foreground truncate">Resolving...</span>
                            )}
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 shrink-0"
                        onClick={onRemove}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            ) : (
                <div
                    className="w-full h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center space-y-2">
                            <Loader2 className="w-5 h-5 animate-spin text-primary" />
                            <span className="text-xs text-muted-foreground">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Upload className="w-4 h-4" /> {label}
                            </div>
                            <div className="text-[10px] text-muted-foreground/60 uppercase font-bold tracking-widest">{description}</div>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept={accept}
                        onChange={handleFileSelect}
                        disabled={isUploading}
                    />
                </div>
            )}
        </div>
    );
}
