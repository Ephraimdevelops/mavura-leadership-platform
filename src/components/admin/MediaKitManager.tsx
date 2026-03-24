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
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/admin/FileUpload";
import { Plus, Trash2, ArrowLeft, Download, FileImage, FileText, Archive, File, Eye, EyeOff, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TYPE_ICONS: Record<string, any> = {
    portrait: FileImage,
    biography: FileText,
    speaker_profile: FileText,
    press_assets: Archive,
    other: File,
};

const TYPE_LABELS: Record<string, string> = {
    portrait: "Official Portrait",
    biography: "Formal Biography",
    speaker_profile: "Speaker Profile",
    press_assets: "Press Assets",
    other: "Other Asset",
};

export function MediaKitManager() {
    const kits = useQuery(api.mediaKits.getAll) || [];
    const addKit = useMutation(api.mediaKits.addKit);
    const deleteKit = useMutation(api.mediaKits.deleteKit);
    const updateKit = useMutation(api.mediaKits.updateKit);

    const [isComposing, setIsComposing] = useState(false);
    const [editingId, setEditingId] = useState<Id<"mediaKits"> | null>(null);
    const [label, setLabel] = useState("");
    const [type, setType] = useState<"portrait" | "biography" | "speaker_profile" | "press_assets" | "other">("portrait");
    const [format, setFormat] = useState("JPG");
    const [fileUrl, setFileUrl] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const DEFAULT_KITS = [
        { label: "Official Portrait (Format A)", type: "portrait" as const, format: "JPG" },
        { label: "Formal Academic Biography", type: "biography" as const, format: "PDF" },
        { label: "Media Speaker Profile", type: "speaker_profile" as const, format: "PDF" },
        { label: "Press Announcement Assets", type: "press_assets" as const, format: "ZIP" },
    ];

    const handleEdit = (kit: Doc<"mediaKits">) => {
        setEditingId(kit._id);
        setLabel(kit.label);
        setType(kit.type);
        setFormat(kit.format);
        setFileUrl(kit.fileUrl);
        setDescription(kit.description || "");
        setIsPublic(kit.isPublic);
        setIsComposing(true);
    };

    const handleSave = async () => {
        if (!label.trim() || !fileUrl.trim()) return alert("Label and File URL are required.");
        setIsSaving(true);
        try {
            if (editingId) {
                await updateKit({ 
                    id: editingId, 
                    label, 
                    type, 
                    format, 
                    fileUrl, 
                    description: description || undefined, 
                    isPublic 
                });
            } else {
                await addKit({ label, type, format, fileUrl, description: description || undefined, isPublic });
            }
            setIsComposing(false);
            resetForm();
        } catch (e: any) { alert(e.message); }
        finally { setIsSaving(false); }
    };

    const resetForm = () => {
        setEditingId(null);
        setLabel(""); setFileUrl(""); setDescription(""); setFormat("JPG"); setType("portrait"); setIsPublic(true);
    };

    const handlePrefill = (kit: typeof DEFAULT_KITS[0]) => {
        setLabel(kit.label);
        setType(kit.type);
        setFormat(kit.format);
        setIsComposing(true);
    };

    if (isComposing) {
        return (
            <div className="space-y-6 max-w-3xl mx-auto">
                <Button variant="ghost" className="mb-4 uppercase text-xs font-bold font-sans" onClick={() => { setIsComposing(false); resetForm(); }}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Media Kit
                </Button>
                <Card className="border-border shadow-none">
                    <CardHeader>
                        <CardTitle className="font-montserrat text-2xl">{editingId ? "Edit Press Asset" : "Add Press Asset"}</CardTitle>
                        <CardDescription>{editingId ? "Update official press download asset." : "Upload or link an official press download asset."}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 font-sans">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Label</Label>
                                <Input value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. Official Portrait (Format A)" />
                            </div>
                            <div className="space-y-1">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Type</Label>
                                <Select value={type} onValueChange={(v: any) => setType(v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="portrait">Official Portrait</SelectItem>
                                        <SelectItem value="biography">Formal Biography</SelectItem>
                                        <SelectItem value="speaker_profile">Media Speaker Profile</SelectItem>
                                        <SelectItem value="press_assets">Press Announcement Assets</SelectItem>
                                        <SelectItem value="other">Other Asset</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Format</Label>
                                <Select value={format} onValueChange={setFormat}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="JPG">JPG</SelectItem>
                                        <SelectItem value="PNG">PNG</SelectItem>
                                        <SelectItem value="PDF">PDF</SelectItem>
                                        <SelectItem value="ZIP">ZIP</SelectItem>
                                        <SelectItem value="DOCX">DOCX</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label className="uppercase text-xs font-bold text-muted-foreground">Upload Asset File</Label>
                                <FileUpload value={fileUrl} onChange={setFileUrl} onRemove={() => setFileUrl("")} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Short Description (Optional)</Label>
                            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What this asset is for..." rows={2} />
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="isPublic" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} className="w-4 h-4 accent-accent" />
                            <Label htmlFor="isPublic" className="uppercase text-xs font-bold text-muted-foreground cursor-pointer">Show on public Press Downloads page</Label>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button className="bg-accent text-primary uppercase font-bold text-xs px-8" onClick={handleSave} disabled={isSaving}>
                                {isSaving ? "Saving..." : (editingId ? "Update Asset" : "Add Asset")}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-montserrat font-bold">Media Assets</h2>
                    <p className="text-muted-foreground text-sm font-sans mt-1">Manage official press-ready downloads for journalists and event organizers.</p>
                </div>
                <Button className="bg-accent text-primary uppercase font-bold text-xs" onClick={() => setIsComposing(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Add Asset
                </Button>
            </div>

            {/* Quick-add standard kits if not yet uploaded */}
            {kits.length === 0 && (
                <Card className="border-dashed border-border shadow-none">
                    <CardHeader>
                        <CardTitle className="text-sm font-montserrat">Quick Setup — Standard Press Assets</CardTitle>
                        <CardDescription>Click any card to pre-fill the form with the standard asset type.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            {DEFAULT_KITS.map((kit) => {
                                const Icon = TYPE_ICONS[kit.type];
                                return (
                                    <button key={kit.label} onClick={() => handlePrefill(kit)} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-colors text-left group">
                                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                            <Icon className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-primary">{kit.label}</p>
                                            <Badge variant="outline" className="text-[9px] uppercase font-bold mt-1">{kit.format}</Badge>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid md:grid-cols-2 gap-4">
                {kits.map((kit: Doc<"mediaKits">) => {
                    const Icon = TYPE_ICONS[kit.type] || File;
                    return (
                        <Card key={kit._id} className="border-border/50 shadow-none group">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-6 h-6 text-accent" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-bold text-primary text-sm">{kit.label}</p>
                                            <Badge variant="outline" className="text-[9px] uppercase font-bold">{kit.format}</Badge>
                                            {!kit.isPublic && <Badge variant="secondary" className="text-[9px] uppercase font-bold opacity-50">Private</Badge>}
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{kit.description || TYPE_LABELS[kit.type]}</p>
                                        <a href={(kit as any).resolvedUrl || kit.fileUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-[10px] text-accent uppercase font-bold tracking-widest hover:underline flex items-center gap-1">
                                            <Download className="w-3 h-3" /> Download Asset
                                        </a>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/10 hover:text-accent" title="Edit Asset" onClick={() => handleEdit(kit)}>
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" title={kit.isPublic ? "Set to Private" : "Make Public"} onClick={() => updateKit({ id: kit._id, isPublic: !kit.isPublic })}>
                                            {kit.isPublic ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive" onClick={() => { if (confirm("Delete this asset?")) deleteKit({ id: kit._id }); }}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

