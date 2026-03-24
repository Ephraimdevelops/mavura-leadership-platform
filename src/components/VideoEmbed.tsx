"use client";

import { Play, ExternalLink } from "lucide-react";

interface VideoEmbedProps {
    url: string;
    caption?: string;
}

export function VideoEmbed({ url, caption }: VideoEmbedProps) {
    // Basic YouTube/Vimeo ID extraction logic (simplified)
    const getEmbedUrl = (url: string) => {
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const id = url.includes("v=") ? url.split("v=")[1].split("&")[0] : url.split("/").pop();
            return `https://www.youtube.com/embed/${id}`;
        }
        if (url.includes("vimeo.com")) {
            const id = url.split("/").pop();
            return `https://player.vimeo.com/video/${id}`;
        }
        return url;
    };

    const embedUrl = getEmbedUrl(url);

    return (
        <div className="my-12 group">
            <div className="relative aspect-video bg-muted rounded-sm overflow-hidden border border-border group-hover:border-accent transition-colors">
                <iframe 
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    title={caption || "Personal reflection video"}
                />
                {/* Minimalist Overlay if not playing (conceptually) */}
            </div>
            {caption && (
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs uppercase  text-muted-foreground font-semibold">
                        {caption}
                    </p>
                    <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-accent hover:text-foreground transition-colors"
                    >
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            )}
        </div>
    );
}
