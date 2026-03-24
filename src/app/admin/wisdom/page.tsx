"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id, Doc } from "../../../../convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

export default function AdminWisdomPage() {
    const quotes = useQuery(api.quotes.getAll) || [];
    const addQuote = useMutation(api.quotes.addQuote);
    const updateQuote = useMutation(api.quotes.updateQuote);
    const deleteQuote = useMutation(api.quotes.deleteQuote);

    const [text, setText] = useState("");
    const [author, setAuthor] = useState("Togolani Mavura");
    const [category, setCategory] = useState("Life & Integrity");
    const [editingId, setEditingId] = useState<Id<"quotes"> | null>(null);

    const handleEdit = (q: Doc<"quotes">) => {
        setEditingId(q._id);
        setText(q.text);
        setAuthor(q.author || "Togolani Mavura");
        setCategory(q.category || "Life & Integrity");
    };

    const handleSave = async () => {
        if (!text) return;
        try {
            if (editingId) {
                await updateQuote({
                    id: editingId,
                    text,
                    author,
                    category,
                });
            } else {
                await addQuote({ 
                    text, 
                    category, 
                    isFeatured: false, 
                    publishedAt: Date.now(), 
                    author 
                });
            }
            setText("");
            setAuthor("Togolani Mavura");
            setEditingId(null);
        } catch (e) { console.error(e); }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setText("");
    };

    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-6">
                <h1 className="text-3xl font-montserrat tracking-tight text-foreground">Wisdom & Quotes</h1>
                <p className="text-muted-foreground font-sans">Curate excerpts from speeches, articles, and public remarks.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-border shadow-none">
                    <CardHeader>
                        <CardTitle className="font-montserrat text-xl">{editingId ? "Edit Wisdom" : "Curate Wisdom"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 font-sans">
                        <div className="space-y-2">
                            <Label>Wisdom Text</Label>
                            <Input 
                                value={text} 
                                onChange={e => setText(e.target.value)} 
                                placeholder="e.g., Kila Mtu kwa KARAMA yake..." 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Work Ethic & Career">Work Ethic & Career</SelectItem>
                                        <SelectItem value="Wealth & Relationships">Wealth & Relationships</SelectItem>
                                        <SelectItem value="Life & Integrity">Life & Integrity</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Author / Source</Label>
                                <Input 
                                    value={author} 
                                    onChange={e => setAuthor(e.target.value)} 
                                    placeholder="Togolani Mavura" 
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={handleSave} className="flex-1 bg-accent text-primary">
                                {editingId ? "Update Wisdom" : "Add to Sikiliza Togolani"}
                            </Button>
                            {editingId && (
                                <Button variant="ghost" onClick={cancelEdit}>Cancel</Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h3 className="font-montserrat text-xl">Current Archive</h3>
                    <div className="space-y-4">
                        {quotes.map((q: Doc<"quotes">) => (
                            <Card key={q._id} className="border-border shadow-none relative group overflow-hidden">
                                <CardContent className="pt-6">
                                    <p className="text-sm font-montserrat mb-2">&quot;{q.text}&quot;</p>
                                    <div className="flex gap-2 items-center">
                                        <Badge variant="secondary" className="text-[9px] uppercase opacity-60">
                                            {q.category}
                                        </Badge>
                                        {q.author && (
                                            <span className="text-[10px] uppercase font-bold text-accent">By {q.author}</span>
                                        )}
                                    </div>
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button 
                                            variant="ghost" size="icon" className="h-6 w-6 hover:bg-accent/10 hover:text-accent"
                                            onClick={() => handleEdit(q)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                        </Button>
                                        <Button 
                                            variant="ghost" size="icon" 
                                            className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive"
                                            onClick={() => { if(confirm("Delete this quote?")) deleteQuote({ id: q._id }) }}
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
