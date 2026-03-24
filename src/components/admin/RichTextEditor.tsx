"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import { 
    Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, 
    Youtube as YoutubeIcon, Image as ImageIcon, Link as LinkIcon,
    Undo, Redo, Code, Type, AlignLeft, AlignCenter, AlignRight,
    Search, Trash2, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    className?: string;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    const [showVideoInput, setShowVideoInput] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

    if (!editor) {
        return null;
    }

    const addYoutubeVideo = () => {
        if (videoUrl) {
            editor.commands.setYoutubeVideo({
                src: videoUrl,
                width: 640,
                height: 480,
            });
            setVideoUrl("");
            setShowVideoInput(false);
        }
    };

    const addImage = () => {
        const url = prompt("Enter Image URL");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = prompt("Enter URL", previousUrl);

        if (url === null) {
            return;
        }

        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    return (
        <div className="flex flex-col border border-input rounded-t-md overflow-hidden bg-muted/5">
            <div className="p-2 flex flex-wrap gap-1 border-b border-input bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-1 pr-2 mr-2 border-r border-border/50">
                    <Button
                        variant="ghost" size="sm"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().chain().focus().undo().run()}
                        className="h-8 w-8 p-0"
                    >
                        <Undo className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost" size="sm"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().chain().focus().redo().run()}
                        className="h-8 w-8 p-0"
                    >
                        <Redo className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-1 pr-2 mr-2 border-r border-border/50">
                    <Button
                        variant="ghost" size="sm"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("bold") ? "bg-accent/10 text-accent font-bold" : "text-muted-foreground")}
                    >
                        <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost" size="sm"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("italic") ? "bg-accent/10 text-accent" : "text-muted-foreground")}
                    >
                        <Italic className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost" size="sm"
                        onClick={setLink}
                        className={cn("h-8 w-8 p-0", editor.isActive("link") ? "bg-accent/10 text-accent" : "text-muted-foreground")}
                    >
                        <LinkIcon className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-1 pr-2 mr-2 border-r border-border/50">
                    <Button
                        variant="ghost" size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("heading", { level: 2 }) ? "bg-accent/10 text-accent" : "text-muted-foreground")}
                    >
                        <Type className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost" size="sm"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("blockquote") ? "bg-accent/10 text-accent" : "text-muted-foreground")}
                    >
                        <Quote className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-1 pr-2 mr-2 border-r border-border/50">
                    <Button
                        variant="ghost" size="sm"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("bulletList") ? "bg-accent/10 text-accent" : "text-muted-foreground")}
                    >
                        <List className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost" size="sm"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("orderedList") ? "bg-accent/10 text-accent" : "text-muted-foreground")}
                    >
                        <ListOrdered className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-1 ml-auto">
                    <Button
                        variant="ghost" size="sm"
                        onClick={addImage}
                        className="h-8 px-2 flex gap-2 text-[10px] items-center uppercase font-bold text-muted-foreground hover:text-primary"
                    >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Add Media</span>
                    </Button>
                    <Button
                        variant="ghost" size="sm"
                        onClick={() => setShowVideoInput(!showVideoInput)}
                        className={cn("h-8 px-2 flex gap-2 text-[10px] items-center uppercase font-bold transition-all", 
                            showVideoInput ? "bg-accent text-primary shadow-sm" : "text-muted-foreground hover:text-primary")}
                    >
                        <YoutubeIcon className="w-3.5 h-3.5" />
                        <span>Embed Video</span>
                    </Button>
                </div>
            </div>

            {showVideoInput && (
                <div className="p-4 bg-muted/10 border-b border-input flex gap-4 items-end animate-in slide-in-from-top-2 duration-300">
                    <div className="flex-1 space-y-1.5">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Video Provider URL (YouTube/Vimeo)</Label>
                        <Input 
                            value={videoUrl} 
                            onChange={(e) => setVideoUrl(e.target.value)} 
                            placeholder="https://www.youtube.com/watch?v=..." 
                            className="h-9 bg-white"
                        />
                    </div>
                    <Button 
                        size="sm" 
                        onClick={addYoutubeVideo}
                        className="h-9 px-4 bg-accent text-primary uppercase font-bold text-[10px]"
                    >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Confirm Embed
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowVideoInput(false)}
                        className="h-9 px-4 uppercase font-bold text-[10px]"
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </div>
    );
};

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3, 4],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-accent underline underline-offset-4 cursor-pointer",
                },
            }),
            Youtube.configure({
                HTMLAttributes: {
                    class: "aspect-video w-full h-auto rounded-sm border border-border/10 shadow-2xl my-10",
                },
                addPasteHandler: true,
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-sm border border-border/10 shadow-lg my-10 grayscale hover:grayscale-0 transition-all duration-700",
                },
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: "prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[500px] p-8 md:p-12 font-sans leading-relaxed text-slate-800",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    return (
        <div className={cn("border border-input rounded-md overflow-hidden bg-card shadow-sm group", className)}>
            <MenuBar editor={editor} />
            <div className="bg-white min-h-[500px] relative">
                <EditorContent editor={editor} />
                
                {/* Visual Guide for Length/Aesthetics */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/40 bg-muted/20 px-2 py-1 rounded">
                        Expert Editor v2.0
                    </div>
                </div>
            </div>
        </div>
    );
}

