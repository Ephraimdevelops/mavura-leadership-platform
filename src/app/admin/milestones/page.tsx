"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id, Doc } from "../../../../convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ArrowLeft, Trophy } from "lucide-react";

export default function AdminMilestonesPage() {
    const milestones = useQuery(api.milestones.getAll) || [];
    const createMilestone = useMutation(api.milestones.create);
    const updateMilestone = useMutation(api.milestones.updateMilestone || api.milestones.create); // Fallback if update not yet generated
    const deleteMilestone = useMutation(api.milestones.deleteMilestone);
    const seedMilestones = useMutation(api.milestones.seedMilestones);


    const [isComposing, setIsComposing] = useState(false);
    const [editingId, setEditingId] = useState<Id<"milestones"> | null>(null);

    const [year, setYear] = useState("");
    const [role, setRole] = useState("");
    const [organization, setOrganization] = useState("");
    const [description, setDescription] = useState("");
    const [highlights, setHighlights] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = (m: Doc<"milestones">) => {
        setEditingId(m._id);
        setYear(m.year);
        setRole(m.role);
        setOrganization(m.organization);
        setDescription(m.description);
        setHighlights(m.highlights.join("\n"));
        setIsComposing(true);
    };

    const handleSave = async () => {
        if (!year || !role || !organization) return alert("Year, role, and organization are required.");
        setIsSaving(true);
        try {
            const milestoneData = {
                year, role, organization, description,
                highlights: highlights.split("\n").filter(Boolean),
            };

            if (editingId) {
                await updateMilestone({
                    id: editingId,
                    ...milestoneData,
                });
            } else {
                await createMilestone({
                    ...milestoneData,
                    order: milestones.length + 1
                });
            }
            setIsComposing(false);
            resetForm();
        } catch (e: any) { alert(e.message); }
        finally { setIsSaving(false); }
    };

    const resetForm = () => {
        setEditingId(null);
        setYear(""); setRole(""); setOrganization(""); setDescription(""); setHighlights("");
    };

    if (isComposing) {
        return (
            <div className="space-y-6 max-w-3xl mx-auto">
                <Button variant="ghost" className="mb-4 uppercase text-xs font-bold font-sans" onClick={() => { setIsComposing(false); resetForm(); }}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Timeline
                </Button>
                <Card className="border-border shadow-none">
                    <CardHeader>
                        <CardTitle className="font-montserrat text-2xl">{editingId ? "Edit Milestone" : "Log a Milestone"}</CardTitle>
                        <CardDescription>{editingId ? "Update this moment in the Ambassador's history." : "Add a significant moment to the Ambassador's diplomatic timeline."}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 font-sans">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Year</Label>
                                <Input value={year} onChange={e => setYear(e.target.value)} placeholder="e.g. 2019" />
                            </div>
                            <div className="space-y-1">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Role / Title</Label>
                                <Input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Ambassador to Switzerland" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Organization / Country</Label>
                            <Input value={organization} onChange={e => setOrganization(e.target.value)} placeholder="e.g. Republic of Tanzania" />
                        </div>
                        <div className="space-y-1">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Description</Label>
                            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What did this role entail..." rows={2} />
                        </div>
                        <div className="space-y-1">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Key Highlights (one per line)</Label>
                            <Textarea value={highlights} onChange={e => setHighlights(e.target.value)} placeholder={"Led WTO negotiations\nSecured bilateral agreement"} rows={4} />
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button className="bg-accent text-primary uppercase font-bold text-xs px-8" onClick={handleSave} disabled={isSaving}>
                                {isSaving ? "Saving..." : (editingId ? "Update Milestone" : "Record Milestone")}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-montserrat tracking-tight text-foreground">Diplomatic Timeline</h1>
                    <p className="text-muted-foreground font-sans">Manage career milestones shown on the homepage timeline.</p>
                </div>
                <Button className="bg-accent text-primary uppercase font-bold text-xs" onClick={() => setIsComposing(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Add Milestone
                </Button>
            </div>

            {milestones.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-border rounded-lg bg-card/30">
                    <Trophy className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm font-sans mb-6">No milestones logged yet. Begin building the diplomatic archive.</p>
                    <Button
                        variant="outline"
                        className="uppercase text-xs font-bold border-accent text-accent hover:bg-accent hover:text-primary"
                        onClick={async () => {
                            const result = await seedMilestones();
                            if ((result as any)?.seeded === false) alert("Milestones already exist in the database.");
                        }}
                    >
                        🚀 Seed Official Diplomatic Timeline
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {milestones.map((m: Doc<"milestones">) => (
                        <Card key={m._id} className="border-border/50 shadow-none group">
                            <CardContent className="flex items-start justify-between pt-6">
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl font-cormorant font-bold text-accent">{m.year}</span>
                                        <div>
                                            <p className="font-bold text-primary">{m.role}</p>
                                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{m.organization}</p>
                                        </div>
                                    </div>
                                    {m.highlights.length > 0 && (
                                        <ul className="flex flex-wrap gap-2 mt-2">
                                            {m.highlights.map((h, i) => (
                                                <li key={i} className="text-[10px] bg-accent/5 text-accent border border-accent/20 px-2 py-0.5 font-bold uppercase tracking-wide">{h}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost" size="sm" className="h-8 text-xs font-bold uppercase gap-2 hover:bg-accent/10 hover:text-accent"
                                        onClick={() => handleEdit(m)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost" size="icon"
                                        className="hover:bg-destructive/10 hover:text-destructive"
                                        onClick={() => { if (confirm("Remove this milestone?")) deleteMilestone({ id: m._id }); }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
