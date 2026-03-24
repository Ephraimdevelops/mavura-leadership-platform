"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Newspaper, BookOpen, ExternalLink, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MediaDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    // Fetch Data
    const entry = useQuery(api.media.getBySlug, { slug: slug || "" });

    // Loading State
    if (entry === undefined) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-t-2 border-accent rounded-full animate-spin" />
            </div>
        );
    }

    // Error / Not Found State
    if (!entry) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                    <h1 className="text-4xl font-sans font-bold mb-4 uppercase tracking-tight">Archive Entry Not Found</h1>
                    <p className="text-muted-foreground mb-8 font-sans">The document you are looking for does not exist or has been restricted.</p>
                    <Button asChild className="rounded-none font-bold uppercase  ">
                        <Link href="/media">Return to Media Hub</Link>
                    </Button>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background selection:bg-accent selection:text-primary font-sans">
            <Header />
            
            <article className="pt-40 pb-32">
                {/* Hero / Header */}
                <div className="max-w-[1200px] mx-auto px-6 mb-12">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/media" className="inline-flex items-center  uppercase  text-muted-foreground hover:text-accent transition-colors mb-12 font-bold">
                            <ArrowLeft className="w-3 h-3 mr-2" /> Back to Media Hub
                        </Link>

                        <div className="flex flex-wrap items-center gap-6 mb-8">
                            <span className="px-4 py-1.5 bg-secondary text-primary  uppercase  font-bold border border-border/40">
                                {entry.type}
                            </span>
                            <div className="flex items-center gap-2 text-muted-foreground  uppercase  font-bold">
                                <Calendar className="w-3 h-3" />
                                {entry.date}
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-sans font-bold text-primary mb-8 tracking-tight leading-[1.1]">
                            {entry.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm font-medium text-accent uppercase  border-b border-border/20 pb-8 mb-12">
                            {entry.outlet}
                        </div>

                        {entry.coverImage && (
                            <div className="relative aspect-video rounded-none overflow-hidden mb-16 border border-border shadow-2xl">
                                <Image
                                    src={entry.coverImage}
                                    alt={entry.title}
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        )}

                        {/* Content Area */}
                        <div className="prose prose-lg max-w-none prose-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:uppercase">
                            {entry.content ? (
                                <div dangerouslySetInnerHTML={{ __html: entry.content }} className="text-visible whitespace-pre-line" />
                            ) : (
                                <p className="text-visible italic">
                                    {entry.description}
                                </p>
                            )}
                        </div>

                        {/* Action Bar */}
                        <div className="mt-20 pt-12 border-t border-border/40 flex flex-wrap gap-8">
                            {entry.externalLink && (
                                <Button asChild className="h-14 px-8 rounded-none bg-primary text-white hover:bg-accent hover:text-primary transition-all duration-500 font-bold   uppercase gap-3">
                                    <a href={entry.externalLink} target="_blank" rel="noopener noreferrer">
                                        View Original Source <ExternalLink className="w-4 h-4" />
                                    </a>
                                </Button>
                            )}
                            <Button variant="outline" className="h-14 px-8 rounded-none border-border/60 font-bold   uppercase gap-3">
                                Download Citation <Download className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
