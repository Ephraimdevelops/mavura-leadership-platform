"use client";

import { NewsletterManager } from "@/components/admin/NewsletterManager";

export default function AdminNewsletterPage() {
    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-6">
                <h1 className="text-3xl font-montserrat tracking-tight text-foreground">The Letter</h1>
                <p className="text-muted-foreground font-sans">Manage subscribers and deploy sophisticated newsletter campaigns.</p>
            </div>
            <NewsletterManager />
        </div>
    );
}
