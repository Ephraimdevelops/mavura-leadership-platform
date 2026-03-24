import { Id, Doc } from "../../../convex/_generated/dataModel";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Users, Send, FileText, Plus, ArrowUpRight, BarChart2, Loader2, ArrowLeft, Save, Edit2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

export function NewsletterManager() {
    const campaigns = useQuery(api.newsletter.getCampaigns, {});
    const stats = useQuery(api.newsletter.getSubscriberStats);
    const recentSubscribers = useQuery(api.newsletter.getRecentSubscribers, { count: 5 });

    const createCampaign = useMutation(api.newsletter.createCampaign);
    const updateCampaign = useMutation(api.newsletter.updateCampaign);
    const sendCampaignAction = useAction(api.newsletter.sendCampaign);

    const [isComposing, setIsComposing] = useState(false);
    const [editingId, setEditingId] = useState<Id<"newsletterCampaigns"> | null>(null);
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = (campaign: Doc<"newsletterCampaigns">) => {
        setEditingId(campaign._id);
        setTitle(campaign.title);
        setSubject(campaign.subject);
        setContent(campaign.content);
        setIsComposing(true);
    };

    const handleSaveDraft = async () => {
        if (!title.trim() || !subject.trim() || !content.trim()) return toast.error("All fields are required.");
        setIsSaving(true);
        try {
            if (editingId) {
                await updateCampaign({ id: editingId, title, subject, content });
            } else {
                const id = await createCampaign({ title, subject, content });
                setEditingId(id);
            }
            toast.success("Draft saved successfully");
        } catch (e: any) {
            toast.error(`Failed to save: ${e.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSend = async () => {
        if (!title.trim() || !subject.trim() || !content.trim()) return toast.error("All fields are required.");
        if (!confirm("Are you sure? This will blast the email to all active subscribers.")) return;
        
        setIsSending(true);
        try {
            let campaignId = editingId;
            // 1. Save/Update draft first
            if (campaignId) {
                await updateCampaign({ id: campaignId, title, subject, content });
            } else {
                campaignId = await createCampaign({ title, subject, content });
            }
            
            // 2. Blast it
            const result = await sendCampaignAction({ campaignId });
            toast.success(`Success! Sent to ${result.sentCount} subscribers.`);
            setIsComposing(false);
            resetForm();
        } catch (e: any) {
            console.error(e);
            toast.error(`Failed to send: ${e.message}`);
        } finally {
            setIsSending(false);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle(""); setSubject(""); setContent("");
    };

    if (isComposing) {
        return (
            <div className="space-y-6 max-w-5xl mx-auto font-sans p-8">
                <Button variant="ghost" className="mb-4 uppercase text-xs font-bold font-sans" onClick={() => { setIsComposing(false); resetForm(); }}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Button>
                
                <Card className="border-border shadow-none">
                    <CardHeader>
                        <CardTitle className="font-montserrat text-2xl">{editingId ? "Edit Edition" : "Compose Global Broadcast"}</CardTitle>
                        <CardDescription>Blast email directly to all vetted subscribers via Resend.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Internal Title</Label>
                            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Q3 Leadership Reflections" />
                        </div>
                        <div className="space-y-2">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Email Subject Line</Label>
                            <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. The Architecture of Karama" />
                        </div>
                        <div className="space-y-4 pt-4 border-t border-border">
                            <Label className="uppercase text-xs font-bold text-muted-foreground block mb-2">Letter Content</Label>
                            <div className="min-h-[500px] border border-border rounded-lg bg-card/50">
                                <RichTextEditor value={content} onChange={setContent} />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6 justify-end">
                            <Button variant="outline" className="uppercase font-bold text-xs px-8" onClick={handleSaveDraft} disabled={isSaving || isSending}>
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                Save Draft
                            </Button>
                            <Button className="bg-accent text-primary uppercase font-bold text-xs px-8" onClick={handleSend} disabled={isSending || isSaving}>
                                {isSending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                                Broadcast Immediately
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-8 max-w-6xl mx-auto font-sans">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h2 className="text-4xl font-cormorant italic font-medium">The Mavura Letter</h2>
                    <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Campaign & Audience Intelligence</p>
                </div>
                <Button className="bg-accent text-primary hover:bg-accent/90 gap-2 h-12 px-6 font-bold uppercase shadow-lg shadow-accent/20" onClick={() => setIsComposing(true)}>
                    <Plus className="w-4 h-4" /> New Edition
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border/40 bg-card/50 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Subscribers</CardTitle>
                        <Users className="w-4 h-4 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-cormorant font-bold">{stats?.active || 0}</div>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">Vetted global leaders</p>
                    </CardContent>
                </Card>
                <Card className="border-border/40 bg-card/50 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Open Rate (Avg)</CardTitle>
                        <BarChart2 className="w-4 h-4 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-cormorant font-bold">64.2%</div>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">+2.4% from last month</p>
                    </CardContent>
                </Card>
                <Card className="border-border/40 bg-card/50 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recent Activity</CardTitle>
                        <Send className="w-4 h-4 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-cormorant font-bold">12</div>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">New signups this week</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Campaigns */}
                <Card className="lg:col-span-2 border-border/40 bg-card/50 shadow-none h-fit">
                    <CardHeader className="border-b border-border/20 py-6">
                        <CardTitle className="text-xl font-cormorant italic">Recent Editions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {campaigns?.length === 0 ? (
                            <div className="p-12 text-center space-y-4">
                                <FileText className="w-12 h-12 text-muted-foreground/20 mx-auto" />
                                <p className="text-muted-foreground text-sm font-medium">No campaigns created yet</p>
                                <Button variant="outline" size="sm" className="font-bold uppercase h-10 border-accent/20 text-accent" onClick={() => setIsComposing(true)}>Compose First Letter</Button>
                            </div>
                        ) : (
                            <div className="divide-y divide-border/20">
                                {campaigns?.map((campaign: Doc<"newsletterCampaigns">) => (
                                    <div key={campaign._id} className="p-6 flex items-center justify-between hover:bg-muted/10 transition-colors group">
                                        <div className="space-y-1">
                                            <h4 className="font-sans font-bold text-sm text-primary group-hover:text-accent transition-colors">{campaign.title}</h4>
                                            <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-bold uppercase">
                                                <span>{format(campaign._creationTime, "MMM d, yyyy")}</span>
                                                <span className="w-1 h-1 rounded-full bg-border" />
                                                <span className={
                                                    campaign.status === "sent" ? "text-green-600" : 
                                                    campaign.status === "scheduled" ? "text-amber-600" : 
                                                    "text-muted-foreground"
                                                }>{campaign.status}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                             {campaign.status === "sent" && (
                                                <div className="text-right">
                                                    <div className="text-xs font-bold">64% Open</div>
                                                    <div className="text-[10px] text-muted-foreground uppercase font-bold">Rate</div>
                                                </div>
                                             )}
                                             <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {campaign.status === "draft" && (
                                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent h-8 w-8" onClick={() => handleEdit(campaign)}>
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent h-8 w-8">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </Button>
                                             </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Subscribers */}
                <Card className="border-border/40 bg-card/50 shadow-none h-fit">
                    <CardHeader className="border-b border-border/20 py-6">
                        <CardTitle className="text-xl font-cormorant italic">New Voices</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            {recentSubscribers?.map((sub) => (
                                <div key={sub._id} className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold font-sans">
                                        {sub.name ? sub.name[0].toUpperCase() : sub.email[0].toUpperCase()}
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-xs font-bold truncate max-w-[150px]">{sub.name || sub.email}</div>
                                        <div className="text-[10px] text-muted-foreground uppercase font-bold">
                                            {format(sub.joinedAt, "MMM d, h:mm a")}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {recentSubscribers?.length === 0 && (
                                <p className="text-center py-4 text-xs text-muted-foreground font-bold uppercase">Awaiting subscribers...</p>
                            )}
                            <Button variant="ghost" className="w-full text-xs font-bold uppercase text-accent hover:bg-accent/5 h-10">
                                View Full Roster
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

