"use client";

import { BooksManager } from "@/components/admin/BooksManager";

export default function AdminBooksPage() {
    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-6">
                <h1 className="text-3xl font-montserrat tracking-tight text-foreground">The Library</h1>
                <p className="text-muted-foreground font-sans">Manage published books, monographs and forthcoming titles.</p>
            </div>
            <BooksManager />
        </div>
    );
}
