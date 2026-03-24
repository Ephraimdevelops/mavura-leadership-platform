"use client";

import { PortfolioManager } from "@/components/admin/PortfolioManager";

export default function AdminMediaPage() {
    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-6">
                <h1 className="text-3xl font-montserrat tracking-tight text-foreground">Media & Influence</h1>
                <p className="text-muted-foreground font-sans">Manage press coverage, academic publications, and public appearances.</p>
            </div>
            <PortfolioManager />
        </div>
    );
}
