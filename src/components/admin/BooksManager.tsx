"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id, Doc } from "../../../convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { BookOpen, Plus, ArrowLeft, Trash2, Globe, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function BooksManager() {
    const books = useQuery(api.books.getAll) || [];
    const createBook = useMutation(api.books.create);
    const updateBook = useMutation(api.books.updateBook);
    const deleteBook = useMutation(api.books.deleteBook);

    const [isComposing, setIsComposing] = useState(false);
    const [editingId, setEditingId] = useState<Id<"books"> | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("Togolani Mavura");
    const [coverImage, setCoverImage] = useState("");
    const [purchaseLabel, setPurchaseLabel] = useState("");
    const [purchaseUrl, setPurchaseUrl] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = (book: Doc<"books">) => {
        setEditingId(book._id);
        setTitle(book.title);
        setDescription(book.description);
        setContent(book.content || "");
        setAuthor(book.author || "Togolani Mavura");
        setCoverImage(book.coverImage || "");
        setPurchaseLabel(book.purchaseLinks?.[0]?.label || "");
        setPurchaseUrl(book.purchaseLinks?.[0]?.url || "");
        setIsFeatured(!!book.isFeatured);
        setIsComposing(true);
    };

    const handleSave = async () => {
        if (!title.trim() || !description.trim()) return alert("Title and description are required.");
        setIsSaving(true);
        try {
            const purchaseLinks = purchaseLabel && purchaseUrl
                ? [{ label: purchaseLabel, url: purchaseUrl }]
                : [];
            
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

            if (editingId) {
                await updateBook({
                    id: editingId,
                    title,
                    slug,
                    description,
                    content: content || undefined,
                    author,
                    coverImage: coverImage || undefined,
                    purchaseLinks,
                    isFeatured,
                });
            } else {
                await createBook({
                    title,
                    slug,
                    description,
                    content: content || undefined,
                    author,
                    coverImage: coverImage || undefined,
                    purchaseLinks,
                    isFeatured,
                });
            }
            setIsComposing(false);
            resetForm();
        } catch (e: any) {
            console.error(e);
            alert(`Failed to save: ${e.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle(""); setDescription(""); setContent(""); setAuthor("Togolani Mavura"); setCoverImage("");
        setPurchaseLabel(""); setPurchaseUrl(""); setIsFeatured(false);
    };

    if (isComposing) {
        return (
            <div className="space-y-6 max-w-5xl mx-auto">
                <Button variant="ghost" className="mb-4 uppercase text-xs font-bold font-sans" onClick={() => { setIsComposing(false); resetForm(); }}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
                </Button>

                <Card className="border-border shadow-none">
                    <CardHeader>
                        <CardTitle className="font-montserrat text-2xl">{editingId ? "Edit Publication" : "Register a Publication"}</CardTitle>
                        <CardDescription>Update the Ambassador's published works.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Title</Label>
                                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. The Architecture of Karama" className="text-lg font-montserrat" />
                            </div>
                            <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Author</Label>
                                <Input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Togolani Mavura" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Cover Image</Label>
                                <ImageUpload value={coverImage} onChange={setCoverImage} onRemove={() => setCoverImage("")} />
                            </div>
                            <div className="space-y-4 flex flex-col justify-end">
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="w-4 h-4 accent-accent" />
                                    <Label htmlFor="isFeatured" className="uppercase text-xs font-bold text-muted-foreground cursor-pointer">Feature on Homepage</Label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Short Synopsis / Description</Label>
                            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="A compelling one-paragraph overview shown on the Book page..." rows={3} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 p-4 border border-dashed border-border rounded-lg">
                            <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Purchase Link Label</Label>
                                <Input value={purchaseLabel} onChange={e => setPurchaseLabel(e.target.value)} placeholder="e.g. Order on Amazon" />
                            </div>
                            <div className="space-y-2">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Purchase Link URL</Label>
                                <Input value={purchaseUrl} onChange={e => setPurchaseUrl(e.target.value)} placeholder="https://amazon.com/..." />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="w-4 h-4 accent-accent" />
                            <Label htmlFor="isFeatured" className="uppercase text-xs font-bold text-muted-foreground cursor-pointer">Feature on Homepage</Label>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-border">
                            <Label className="uppercase text-xs font-bold text-muted-foreground block mb-2">Full Book Description / Content</Label>
                            <div className="min-h-[400px] border border-border rounded-lg bg-card/50">
                                <RichTextEditor value={content} onChange={setContent} />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6 justify-end">
                            <Button className="bg-accent text-primary uppercase font-bold text-xs px-8" onClick={handleSave} disabled={isSaving}>
                                {isSaving ? "Saving..." : (editingId ? "Update Publication" : "Register Publication")}
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
                    <CardTitle className="font-montserrat text-2xl">The Library</CardTitle>
                    <CardDescription className="font-sans">Manage published books and intellectual contributions.</CardDescription>
                </div>
                <Button className="bg-accent text-primary uppercase font-bold text-xs" onClick={() => setIsComposing(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Add Book
                </Button>
            </CardHeader>
            <CardContent className="pt-6">
                {books.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-border rounded-lg bg-card/30">
                        <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <h3 className="font-montserrat text-lg font-medium text-foreground">The Library is Empty</h3>
                        <p className="text-muted-foreground text-sm font-sans max-w-sm mx-auto mt-2">Register published works, monographs, and forthcoming titles.</p>
                    </div>
                ) : (
                    <div className="space-y-4 divide-y divide-border/30">
                        {books.map((book: Doc<"books">) => (
                            <div key={book._id} className="pt-4 first:pt-0 flex items-center justify-between group font-sans">
                                <div className="flex items-center gap-4 flex-1">
                                    {book.coverImage ? (
                                        <img src={book.coverImage} alt={book.title} className="w-12 h-16 object-cover border border-border/20 shadow-sm" />
                                    ) : (
                                        <div className="w-12 h-16 bg-slate-900 flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-accent" />
                                        </div>
                                    )}
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="font-bold text-primary text-lg">{book.title}</h4>
                                            {book.isFeatured && (
                                                <Badge variant="outline" className="uppercase text-[9px] font-bold text-green-600 border-green-600/30">Featured</Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-md">{book.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="sm" className="h-8 text-xs font-bold uppercase gap-2 hover:bg-accent/10 hover:text-accent" onClick={() => handleEdit(book)}>
                                        Edit
                                    </Button>
                                    <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive" onClick={() => { if(confirm("Delete this book?")) deleteBook({ id: book._id }) }}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Link href={`/book/${book.slug}`} target="_blank">
                                        <Button variant="outline" size="sm" className="h-8 text-xs font-bold uppercase gap-2 bg-background border-border">
                                            <Globe className="w-3 h-3" /> View
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

