"use client";

import { IdeasManager } from "@/components/admin/IdeasManager";

export default function AdminIdeasPage() {
    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-6">
                <h1 className="text-3xl font-montserrat tracking-tight text-foreground">Reflections & Ideas</h1>
                <p className="text-muted-foreground font-sans">Manage intellectual essays and thought leadership articles.</p>
            </div>
            <IdeasManager />
        </div>
    );
}
