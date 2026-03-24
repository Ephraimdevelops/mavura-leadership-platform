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
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FileText, Plus, ArrowLeft, Trash2, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function IdeasManager() {
    const posts = useQuery(api.ideas.getPosts) || [];
    const createPost = useMutation(api.ideas.createIdea);
    const updatePost = useMutation(api.ideas.updateIdea);
    const deletePost = useMutation(api.ideas.deleteIdea);

    const [isComposing, setIsComposing] = useState(false);
    const [editingId, setEditingId] = useState<Id<"ideas"> | null>(null);
    
    // Form State
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Leadership");
    const [coverImage, setCoverImage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = (post: Doc<"ideas">) => {
        setEditingId(post._id);
        setTitle(post.title);
        setExcerpt(post.excerpt || "");
        setContent(post.content);
        setCategory(post.category || "Leadership");
        setCoverImage(post.coverImage || "");
        setIsComposing(true);
    };

    const handleSave = async (status: "draft" | "published") => {
        if (!title.trim() || !content.trim()) return alert("Title and Content are required");
        setIsSaving(true);
        try {
            if (editingId) {
                await updatePost({
                    id: editingId,
                    title,
                    excerpt,
                    content,
                    category,
                    coverImage: coverImage || undefined,
                    status
                });
            } else {
                await createPost({
                    title,
                    excerpt,
                    content,
                    category,
                    coverImage: coverImage || undefined,
                    tags: [category],
                    isFeatured: false,
                    status
                });
            }
            setIsComposing(false);
            resetForm();
        } catch (e) {
            console.error(e);
            alert("Failed to save idea. Check console for error.");
        } finally {
            setIsSaving(false);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setExcerpt("");
        setContent("");
        setCategory("Leadership");
        setCoverImage("");
    };

    if (isComposing) {
        return (
            <div className="space-y-6 max-w-5xl mx-auto">
                <Button variant="ghost" className="mb-4 uppercase text-xs font-bold font-sans" onClick={() => { setIsComposing(false); resetForm(); }}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Archive
                </Button>
                
                <Card className="border-border shadow-none">
                    <CardHeader>
                        <CardTitle className="font-montserrat text-2xl">{editingId ? "Edit Reflection" : "Pen an Idea"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Title</Label>
                            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. The Architecture of Modern Leadership" className="text-lg font-montserrat" />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Category</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Leadership">Leadership</SelectItem>
                                        <SelectItem value="Diplomacy">Diplomacy</SelectItem>
                                        <SelectItem value="Global Reflections">Global Reflections</SelectItem>
                                        <SelectItem value="Letters">Letters</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Cover Image</Label>
                                <ImageUpload value={coverImage} onChange={setCoverImage} onRemove={() => setCoverImage("")} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Short Excerpt (Optional)</Label>
                            <Input value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="A one-sentence summary for previews..." />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-border">
                            <Label className="uppercase text-xs font-bold text-muted-foreground block mb-2">Essay Content</Label>
                            <div className="min-h-[500px] border border-border rounded-lg bg-card/50">
                                <RichTextEditor value={content} onChange={setContent} />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6 justify-end">
                            <Button variant="outline" onClick={() => handleSave("draft")} disabled={isSaving}>
                                {editingId ? "Revert to Draft" : "Save as Draft"}
                            </Button>
                            <Button className="bg-accent text-primary uppercase font-bold text-xs px-8" onClick={() => handleSave("published")} disabled={isSaving}>
                                {editingId ? "Update Published" : "Publish to World"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <Card className="border-border shadow-none max-w-6xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-border/50">
                <div>
                    <CardTitle className="font-montserrat text-2xl">Reflections Archive</CardTitle>
                    <CardDescription className="font-sans">Draft and publish intellectual contributions and diplomatic papers.</CardDescription>
                </div>
                <Button className="bg-accent text-primary uppercase font-bold text-xs" onClick={() => setIsComposing(true)}>
                    <Plus className="w-4 h-4 mr-2" /> New Entry
                </Button>
            </CardHeader>
            <CardContent className="pt-6">
                {posts.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-border rounded-lg bg-card/30">
                        <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <h3 className="font-montserrat text-lg font-medium text-foreground">The Archive is Empty</h3>
                        <p className="text-muted-foreground text-sm font-sans max-w-sm mx-auto mt-2">Begin digitizing your reflections, essays, and diplomatic treatises.</p>
                    </div>
                ) : (
                    <div className="space-y-4 divide-y divide-border/30">
                        {posts.map((post: Doc<"ideas">) => (
                            <div key={post._id} className="pt-4 first:pt-0 flex items-center justify-between group font-sans">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="font-bold text-primary text-lg">{post.title}</h4>
                                        <Badge variant="outline" className={`uppercase text-[9px] font-bold ${post.status === "published" ? "text-green-600 border-green-600/30" : "text-amber-600 border-amber-600/30"}`}>
                                            {post.status}
                                        </Badge>
                                        <Badge variant="secondary" className="uppercase text-[9px] font-bold opacity-60">
                                            {post.category || "Uncategorized"}
                                        </Badge>
                                    </div>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{new Date(post._creationTime).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="sm" className="h-8 text-xs font-bold uppercase gap-2 hover:bg-accent/10 hover:text-accent" onClick={() => handleEdit(post)}>
                                        Edit
                                    </Button>
                                    <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive" onClick={() => { if(confirm("Delete this essay?")) deletePost({ id: post._id }) }}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    {post.status === "published" && (
                                        <Button variant="outline" size="sm" className="h-8 text-xs font-bold uppercase gap-2 bg-background border-border" onClick={() => window.open(`/ideas/${post.slug}`, "_blank")}>
                                            <Globe className="w-3 h-3" /> View Live
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

