"use client";

import { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Save, Eye, Users, FileText, Quote as QuoteIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { Id } from "../../../convex/_generated/dataModel";

export function NewsletterEditor() {
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [audience, setAudience] = useState("all");
    const [featuredEssayId, setFeaturedEssayId] = useState<Id<"ideas"> | "none">("none");
    const [selectedQuoteId, setSelectedQuoteId] = useState<Id<"quotes"> | "none">("none");
    const [isSaving, setIsSaving] = useState(false);

    const ideas = useQuery(api.ideas.getPublished);
    const quotes = useQuery(api.quotes.getAll);
    const createCampaign = useMutation(api.newsletter.createCampaign);

    const handleSave = async (status: "draft" | "sent") => {
        if (!title || !subject || !content) {
            toast.error("Please provide a title, subject, and content.");
            return;
        }

        setIsSaving(true);
        try {
            await createCampaign({
                title,
                subject,
                content,
                targetAudience: audience,
                featuredEssayId: featuredEssayId === "none" ? undefined : featuredEssayId,
                quotesIncluded: selectedQuoteId === "none" ? undefined : [selectedQuoteId],
            });
            toast.success(status === "sent" ? "Newsletter sent successfully" : "Draft saved");
        } catch (error) {
            toast.error("Failed to save newsletter");
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-border bg-card shadow-sm border-0 shadow-none">
            <CardHeader className="border-b border-border bg-muted/5 p-8">
                <div className="flex justify-between items-center">
                    <div className="space-y-1">
                        <CardTitle className="font-cormorant text-4xl italic font-medium">Compose Letter</CardTitle>
                        <p className="text-sm text-muted-foreground font-sans">Draft the next edition of The Mavura Letter</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="gap-2 h-10 px-4 font-bold   uppercase border-accent/20 hover:bg-accent/5">
                            <Eye className="w-4 h-4" /> Preview
                        </Button>
                        <Button 
                            variant="default" 
                            size="sm" 
                            className="bg-accent text-primary hover:bg-accent/90 gap-2 h-10 px-6 font-bold   uppercase shadow-lg shadow-accent/20"
                            onClick={() => handleSave("sent")}
                            disabled={isSaving}
                        >
                            <Send className="w-3 h-3" /> Send Letter
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-10 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className=" uppercase  font-bold text-accent">Internal Title</label>
                        <Input 
                            placeholder="e.g. Edition #42: Digital Sovereignty" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="h-12 border-border/50 bg-background/50 focus:ring-accent font-sans"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className=" uppercase  font-bold text-accent">Email Subject Line</label>
                        <Input 
                            placeholder="Ideas shape nations: A reflection..." 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="h-12 border-border/50 bg-background/50 focus:ring-accent font-sans"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                        <label className=" uppercase  font-bold text-accent">Audience Segments</label>
                        <Select value={audience} onValueChange={setAudience}>
                            <SelectTrigger className="h-12 border-border/50 bg-background/50">
                                <span className="flex items-center gap-2 text-sm">
                                    <Users className="w-4 h-4 text-accent" />
                                    <SelectValue placeholder="Select audience" />
                                </span>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Subscribers</SelectItem>
                                <SelectItem value="leadership">Leadership Forum</SelectItem>
                                <SelectItem value="diplomats">Diplomatic Corps</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <label className=" uppercase  font-bold text-accent">Feature an Essay</label>
                        <Select value={featuredEssayId} onValueChange={(val) => setFeaturedEssayId(val as Id<"ideas"> | "none")}>
                            <SelectTrigger className="h-12 border-border/50 bg-background/50">
                                <span className="flex items-center gap-2 text-sm">
                                    <FileText className="w-4 h-4 text-accent" />
                                    <SelectValue placeholder="Pick an Idea" />
                                </span>
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                                <SelectItem value="none">None</SelectItem>
                                {ideas?.map((idea: any) => (
                                    <SelectItem key={idea._id} value={idea._id}>{idea.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <label className=" uppercase  font-bold text-accent">Include Quotes</label>
                        <Select value={selectedQuoteId} onValueChange={(val) => setSelectedQuoteId(val as Id<"quotes"> | "none")}>
                            <SelectTrigger className="h-12 border-border/50 bg-background/50">
                                <span className="flex items-center gap-2 text-sm">
                                    <QuoteIcon className="w-4 h-4 text-accent" />
                                    <SelectValue placeholder="Pick a Quote" />
                                </span>
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                                <SelectItem value="none">None</SelectItem>
                                {quotes?.map((quote: any) => (
                                    <SelectItem key={quote._id} value={quote._id}>{quote.text.substring(0, 40)}...</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className=" uppercase  font-bold text-accent">The Letter Body</label>
                    <RichTextEditor 
                        value={content} 
                        onChange={setContent} 
                        className="min-h-[500px]"
                    />
                </div>
            </CardContent>
            <CardFooter className="border-t border-border bg-muted/5 flex justify-between p-8">
                <div className="flex items-center gap-2  uppercase  text-muted-foreground font-bold">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    Auto-archiving to Digital Study Enabled
                </div>
                <Button variant="ghost" size="sm" className="gap-2 font-bold   uppercase hover:bg-accent/5 hover:text-accent" onClick={() => handleSave("draft")} disabled={isSaving}>
                    <Save className="w-4 h-4" /> Save as Draft
                </Button>
            </CardFooter>
        </Card>
    );
}
