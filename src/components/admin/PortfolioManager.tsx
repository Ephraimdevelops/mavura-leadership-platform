"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id, Doc } from "../../../convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Plus, Trash2, Globe, FileText, ArrowLeft, Presentation, MapPin, Calendar, Star, StarOff, Video, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function isVideoUrl(url: string) {
    if (!url) return false;
    return /(?:youtube\.com|youtu\.be|vimeo\.com|loom\.com|wistia\.com|\.mp4|\.mov|\.webm)/i.test(url);
}

export function PortfolioManager() {
    const mediaItems = useQuery(api.media.getPublished) || [];

    const addMedia = useMutation(api.media.addMedia);
    const deleteMedia = useMutation(api.media.deleteMedia);
    const updateMedia = useMutation(api.media.updateMedia);

    const [isComposing, setIsComposing] = useState(false);
    const [editingId, setEditingId] = useState<Id<"mediaEntries"> | null>(null);
    
    // Media Form State
    const [title, setTitle] = useState("");
    const [outlet, setOutlet] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState(""); // rich text
    const [author, setAuthor] = useState("Togolani Mavura");
    const [type, setType] = useState<"interview" | "press" | "academic" | "other">("press");
    const [externalLink, setExternalLink] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);

    const handleEdit = (item: Doc<"mediaEntries">) => {
        setEditingId(item._id);
        setTitle(item.title);
        setOutlet(item.outlet);
        setDate(item.date);
        setDescription(item.description);
        setContent(item.content || "");
        setAuthor(item.author || "Togolani Mavura");
        setType(item.type);
        setExternalLink(item.externalLink || "");
        setMediaUrl(item.mediaUrl || "");
        setCoverImage(item.coverImage || "");
        setIsFeatured(!!item.isFeatured);
        setIsComposing(true);
    };

    const handleSaveMedia = async () => {
        if (!title.trim() || !outlet.trim()) return alert("Title and Outlet are required");
        
        try {
             if (editingId) {
                 await updateMedia({
                     id: editingId,
                     title,
                     outlet,
                     date: date || new Date().toISOString().split("T")[0],
                     description,
                     content,
                     author,
                     type,
                     externalLink: externalLink || undefined,
                     mediaUrl: mediaUrl || undefined,
                     coverImage: coverImage || undefined,
                     isFeatured,
                 });
             } else {
                 await addMedia({
                     title,
                     outlet,
                     date: date || new Date().toISOString().split("T")[0],
                     description,
                     author,
                     type,
                     externalLink: externalLink || undefined,
                     mediaUrl: mediaUrl || undefined,
                     coverImage: coverImage || undefined,
                     isFeatured,
                 });
             }
             setIsComposing(false);
             resetForm();
        } catch (e) { console.error(e); }
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle(""); setOutlet(""); setDate(""); setDescription(""); setAuthor("Togolani Mavura"); setExternalLink(""); setCoverImage(""); setMediaUrl(""); setContent(""); setIsFeatured(false);
    }

    if (isComposing) {
        return (
             <div className="space-y-6 max-w-5xl mx-auto">
                <Button variant="ghost" className="mb-4 uppercase text-xs font-bold font-sans" onClick={() => { setIsComposing(false); resetForm(); }}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
                </Button>
                
                <Card className="border-border shadow-none">
                    <CardHeader>
                        <CardTitle className="font-montserrat text-2xl">{editingId ? "Edit Media Entry" : "Log Media or Appearance"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Title</Label>
                                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. UN General Assembly Address" className="text-sm font-sans" />
                            </div>
                            <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Author / Principal</Label>
                                <Input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Togolani Mavura" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Type</Label>
                                <Select value={type} onValueChange={(val: any) => setType(val)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="press">Press Mention</SelectItem>
                                        <SelectItem value="interview">Interview</SelectItem>
                                        <SelectItem value="academic">Academic Paper</SelectItem>
                                        <SelectItem value="other">Other Appearance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Outlet / Venue</Label>
                                <Input value={outlet} onChange={e => setOutlet(e.target.value)} placeholder="e.g. The Economist" />
                            </div>
                            <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Date</Label>
                                <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
                            </div>
                        </div>

                         <div className="space-y-2">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Short Description (Excerpt / Caption)</Label>
                            <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Topic discussed..." />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground flex items-center gap-2">
                                    <Link2 className="w-3 h-3" /> External Link (Article / Source)
                                </Label>
                                <Input value={externalLink} onChange={e => setExternalLink(e.target.value)} placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground flex items-center gap-2">
                                    <Video className="w-3 h-3" /> Media / Video URL
                                    {isVideoUrl(mediaUrl) && <span className="text-accent text-[9px] flex items-center gap-1"><Video className="w-3 h-3" /> Video detected</span>}
                                </Label>
                                <Input value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} placeholder="YouTube, Vimeo, or .mp4 URL..." />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Cover Image</Label>
                            <ImageUpload value={coverImage} onChange={setCoverImage} onRemove={() => setCoverImage("")} />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-border">
                            <Label className="uppercase text-xs font-bold text-muted-foreground block mb-2">Full Article / Content (Optional — Rich Text)</Label>
                            <div className="min-h-[400px] border border-border rounded-lg bg-card/50">
                                <RichTextEditor value={content} onChange={setContent} />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="isFeaturedChk" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="w-4 h-4 accent-accent" />
                            <Label htmlFor="isFeaturedChk" className="uppercase text-xs font-bold text-muted-foreground cursor-pointer">Feature on Homepage (shows in Media & Influence section)</Label>
                        </div>

                        <div className="flex gap-4 pt-6 justify-end">
                            <Button className="bg-accent text-primary uppercase font-bold text-xs px-8" onClick={handleSaveMedia}>
                                {editingId ? "Update Entry" : "Record Entry"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <Card className="border-border shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-border/50">
                <div>
                     <CardTitle className="font-montserrat text-2xl">The Statesman's Portfolio</CardTitle>
                     <CardDescription className="font-sans">Manage economic advocacy items, global speeches, and media appearances. ⭐ = Featured on homepage.</CardDescription>
                </div>
                 <Button className="bg-accent text-primary uppercase font-bold text-xs" onClick={() => setIsComposing(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Log Appearance
                </Button>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-6">
                    {mediaItems.length === 0 ? (
                         <div className="text-center py-20 border border-dashed border-border rounded-lg bg-card/30">
                            <Presentation className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                            <p className="text-muted-foreground text-sm font-sans max-w-sm mx-auto mt-2">No public appearances currently logged.</p>
                        </div>
                    ) : (
                         <div className="space-y-4 divide-y divide-border/30">
                            {mediaItems.map((item: Doc<"mediaEntries">) => (
                                <div key={item._id} className="pt-4 first:pt-0 flex items-center justify-between group font-sans">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            {isVideoUrl(item.mediaUrl || item.externalLink || "") && (
                                                <span title="Video content">
                                                    <Video className="w-4 h-4 text-accent flex-shrink-0" />
                                                </span>
                                            )}
                                            <h4 className="font-bold text-primary text-lg">{item.title}</h4>
                                            <Badge variant="secondary" className="uppercase text-[9px] font-bold opacity-60">{item.type}</Badge>
                                            {item.isFeatured && <Badge variant="outline" className="text-[9px] uppercase font-bold text-accent border-accent/30">Featured</Badge>}
                                        </div>
                                        <div className="flex gap-4 text-xs text-muted-foreground uppercase tracking-wider font-bold">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.outlet}</span>
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="sm" className="h-8 text-xs font-bold uppercase gap-2 hover:bg-accent/10 hover:text-accent" onClick={() => handleEdit(item)}>
                                            Edit
                                        </Button>
                                        <Button variant="ghost" size="icon" title={item.isFeatured ? "Remove from featured" : "Feature on homepage"} onClick={() => updateMedia({ id: item._id, isFeatured: !item.isFeatured })}>
                                            {item.isFeatured ? <Star className="w-4 h-4 text-accent fill-accent" /> : <StarOff className="w-4 h-4 text-muted-foreground" />}
                                        </Button>
                                        <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive" onClick={() => { if(confirm("Delete this entry?")) deleteMedia({ id: item._id }) }}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}


