"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc } from "../../../convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Bookmark } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
                <div>
                    <h1 className="text-3xl font-montserrat tracking-tight text-foreground">Ambassador's Study</h1>
                    <p className="text-muted-foreground font-sans">Content control for the Mavura Leadership & Philosophy platform.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="font-sans text-xs uppercase">Settings</Button>
                    <Button className="font-sans text-xs uppercase bg-accent text-primary">View Global Archive</Button>
                </div>
            </div>

            <OverviewTab />
        </div>
    );
}

function OverviewTab() {
    const subscribers = useQuery(api.newsletter.getRecentSubscribers, { count: 10 }) || [];
    const ideas = useQuery(api.ideas.getPosts) || [];
    const media = useQuery(api.media.getPublished) || [];

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 font-sans">
                <StatCard title="Subscribers" value={subscribers.length} icon={<Users />} />
                <StatCard title="Reflections" value={ideas.length} icon={<FileText />} />
                <StatCard title="Media & Press" value={media.length} icon={<Bookmark />} />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 pt-4">
                <Card className="col-span-4 border border-border/50 shadow-sm bg-white">
                    <CardHeader className="border-b border-border/10 pb-4 mb-4">
                        <CardTitle className="font-montserrat text-xl">Recent Newsletter Subscribers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {subscribers.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No subscribers yet.</p>
                            ) : (
                                subscribers.slice(0, 5).map((sub: Doc<"newsletterSubscribers">) => (
                                    <div key={sub._id} className="flex items-center justify-between border-b border-border/10 pb-3 last:border-0 font-sans">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none text-slate-900">{sub.email}</p>
                                            <p className="text-xs text-muted-foreground">{sub.name || "Anonymous Constituent"}</p>
                                        </div>
                                        <Badge variant="outline" className="uppercase font-bold text-accent border-accent/30 text-[9px] tracking-widest">
                                            {sub.status}
                                        </Badge>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 border border-border/50 shadow-sm bg-slate-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <CardHeader className="relative z-10 border-b border-white/10 pb-4 mb-4">
                        <CardTitle className="font-montserrat text-xl text-white">System Integrity</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                                <p className="text-sm font-sans tracking-wide">Core Architecture Synced</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                <p className="text-sm font-sans tracking-wide">Transmission (Resend) Ready</p>
                            </div>
                            <div className="flex items-center gap-4 opacity-50">
                                <div className="h-2 w-2 rounded-full bg-slate-400" />
                                <p className="text-sm font-sans tracking-wide">Database Backup: Hourly</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <p className="text-[10px] text-white/50 uppercase tracking-widest">Platform Status: Optimal</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
    return (
        <Card className="border border-border/50 shadow-sm bg-white hover:border-accent/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-bold uppercase text-[10px] tracking-widest text-slate-500">{title}</CardTitle>
                <div className="h-4 w-4 text-accent">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-montserrat font-medium text-slate-900">{value}</div>
            </CardContent>
        </Card>
    );
}
