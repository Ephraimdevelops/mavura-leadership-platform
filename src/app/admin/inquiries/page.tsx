"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id, Doc } from "../../../../convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, CheckCircle, Archive, Mail, Clock } from "lucide-react";

export default function AdminInquiriesPage() {
    const inquiries = useQuery(api.inquiries.getAll) || [];
    const markRead = useMutation(api.inquiries.markRead);
    const archiveInquiry = useMutation(api.inquiries.archive);
    const deleteInquiry = useMutation(api.inquiries.deleteInquiry);

    const [filter, setFilter] = useState<"all" | "new" | "read" | "archived">("all");

    const filtered = filter === "all" 
        ? inquiries 
        : inquiries.filter((inq: any) => inq.status === filter);

    const newCount = inquiries.filter((inq: any) => inq.status === "new").length;

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
                <div>
                    <h1 className="text-3xl font-montserrat tracking-tight text-foreground">Inquiries</h1>
                    <p className="text-muted-foreground font-sans">
                        Contact form submissions from visitors.
                        {newCount > 0 && <span className="text-accent font-bold ml-2">{newCount} new</span>}
                    </p>
                </div>
                <div className="flex gap-2">
                    {(["all", "new", "read", "archived"] as const).map((f) => (
                        <Button 
                            key={f} 
                            variant={filter === f ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setFilter(f)}
                            className="capitalize text-xs font-bold"
                        >
                            {f}
                        </Button>
                    ))}
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-border/50">
                    <Mail className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground font-sans">No {filter === "all" ? "" : filter} inquiries yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((inq: any) => (
                        <Card key={inq._id} className={`border shadow-sm transition-colors ${inq.status === "new" ? "border-accent/30 bg-accent/5" : "border-border/50 bg-white"}`}>
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="text-lg font-bold text-slate-900">{inq.name}</h3>
                                            <Badge 
                                                variant={inq.status === "new" ? "default" : "secondary"}
                                                className={`text-[10px] font-bold uppercase ${inq.status === "new" ? "bg-accent text-white" : ""}`}
                                            >
                                                {inq.status}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(inq.createdAt).toLocaleDateString('en-US', { 
                                                    month: 'short', day: 'numeric', year: 'numeric', 
                                                    hour: '2-digit', minute: '2-digit' 
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span>{inq.email}</span>
                                            {inq.organization && <span>• {inq.organization}</span>}
                                            <span>• {inq.subject}</span>
                                        </div>
                                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap border-l-2 border-accent/20 pl-4 mt-3">
                                            {inq.details}
                                        </p>
                                    </div>
                                    <div className="flex lg:flex-col gap-2 shrink-0">
                                        {inq.status === "new" && (
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => markRead({ id: inq._id })}
                                                className="text-xs font-bold gap-2"
                                            >
                                                <CheckCircle className="w-3.5 h-3.5" /> Mark Read
                                            </Button>
                                        )}
                                        {inq.status !== "archived" && (
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => archiveInquiry({ id: inq._id })}
                                                className="text-xs font-bold gap-2"
                                            >
                                                <Archive className="w-3.5 h-3.5" /> Archive
                                            </Button>
                                        )}
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={() => { if (confirm("Delete this inquiry?")) deleteInquiry({ id: inq._id }); }}
                                            className="text-xs font-bold gap-2 text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" /> Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
