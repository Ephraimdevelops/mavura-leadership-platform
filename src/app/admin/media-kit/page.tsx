"use client";

import { MediaKitManager } from "@/components/admin/MediaKitManager";

export default function AdminMediaKitPage() {
    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-6">
                <h1 className="text-3xl font-montserrat tracking-tight text-foreground">Press & Media Kit</h1>
                <p className="text-muted-foreground font-sans">Manage official downloadable assets for press, media, and event organizers.</p>
            </div>
            <MediaKitManager />
        </div>
    );
}
