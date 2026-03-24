"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Facebook, Twitter, Linkedin, Mail, ArrowRight, Share2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Head from "next/head";

export default function MediaDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const media = useQuery(api.media.getBySlug, { slug });
    const allMedia = useQuery(api.media.getPublished) || [];

    // Loading state
    if (media === undefined) {
        return (
            <main className="min-h-screen bg-white font-sans">
                <Header />
                <div className="pt-40 pb-20 text-center">
                    <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto" />
                    <p className="text-muted-foreground mt-4">Loading coverage...</p>
                </div>
                <Footer />
            </main>
        );
    }

    // Not found state
    if (media === null) {
        return (
            <main className="min-h-screen bg-white font-sans">
                <Header />
                <div className="pt-40 pb-20 text-center max-w-lg mx-auto">
                    <h1 className="text-4xl font-cormorant font-medium text-slate-900 mb-4">Coverage Not Found</h1>
                    <p className="text-muted-foreground mb-8">This media entry may have been archived or moved.</p>
                    <Link href="/community" className="text-accent font-bold text-sm">← Back to All Media</Link>
                </div>
                <Footer />
            </main>
        );
    }

    const displayMedia = media;

    // Get 3 related items for the "IN THE HEADLINES" section
    const relatedMedia = allMedia.filter((i: any) => i._id !== displayMedia._id).slice(0, 3);

    return (
        <main className="min-h-screen bg-white selection:bg-accent selection:text-white font-sans">
            <Head>
                <title>{displayMedia.title} | Togolani Mavura</title>
                <meta name="description" content={displayMedia.description || `${displayMedia.type} coverage via ${displayMedia.outlet}. Feature on Ambassador Togolani Mavura.`} />
                <meta name="author" content="Togolani Mavura" />
                <meta property="og:title" content={displayMedia.title} />
                <meta property="og:description" content={displayMedia.description || ""} />
                <meta property="og:image" content={displayMedia.coverImage || displayMedia.thumbnailUrl || "/images/thought-thumb.png"} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Header />

            <article className="pt-32 pb-20">
                {/* HEADLINE SECTION */}
                <header className="max-w-[1000px] mx-auto px-6 mb-10">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-cormorant leading-tight text-slate-900 tracking-tight">
                            {displayMedia.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-slate-500 font-medium uppercase tracking-wider">
                            <span className="text-accent">{displayMedia.type || "Media"} Coverage</span>
                            <span>•</span>
                            <time dateTime={displayMedia.date || new Date().toISOString()}>
                                {displayMedia.date ? new Date(displayMedia.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                }) : "Recent"}
                            </time>
                            <span>•</span>
                            <span>{displayMedia.outlet || "Press"}</span>
                        </div>
                    </div>
                </header>

                {/* FEATURED IMAGE */}
                <figure className="max-w-[1200px] mx-auto px-6 mb-16">
                    <div className="aspect-[21/9] w-full bg-slate-100 overflow-hidden">
                        <img 
                            src={(displayMedia as any).coverImageUrl || displayMedia.coverImage || displayMedia.thumbnailUrl || "/images/thought-thumb.png"} 
                            alt={displayMedia.title} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    {displayMedia.coverImage && (
                        <figcaption className="mt-4 text-xs text-slate-500 border-l-2 border-accent pl-3 max-w-3xl">
                            Special coverage via {displayMedia.outlet}.
                        </figcaption>
                    )}
                </figure>

                {/* TWO-COLUMN CONTENT AREA */}
                <div className="max-w-[1000px] mx-auto px-6 flex flex-col md:flex-row gap-12">
                    {/* LEFT COLUMN: SOCIAL SHARE */}
                    <aside className="md:w-16 flex-shrink-0">
                        <div className="sticky top-32 flex flex-col gap-3">
                            <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                <Facebook className="w-5 h-5" fill="currentColor" stroke="none" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                <Twitter className="w-4 h-4" fill="currentColor" stroke="none" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                <Linkedin className="w-5 h-5" fill="currentColor" stroke="none" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                <span className="font-bold text-lg leading-none">W</span>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors">
                                <Mail className="w-4 h-4" />
                            </button>
                        </div>
                    </aside>

                    {/* MAIN CONTENT */}
                    <div className="flex-grow max-w-[700px]">
                        {/* OUTLET / AUTHOR BLOCK */}
                        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-100">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center text-accent">
                                <Share2 className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-500 mb-1">Coverage by <span className="text-slate-900 font-bold underline decoration-accent underline-offset-4">{displayMedia.outlet}</span></div>
                                <div className="text-sm font-semibold text-slate-700 capitalize">{displayMedia.type}</div>
                                {displayMedia.externalLink && (
                                    <Link href={displayMedia.externalLink} target="_blank" className="text-xs text-accent uppercase font-bold tracking-widest flex items-center mt-1">
                                        View Original Source <ArrowUpRight className="w-3 h-3 ml-1" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* ARTICLE TEXT */}
                        {displayMedia.content ? (
                            <div 
                                className="prose prose-lg prose-slate prose-headings:font-cormorant prose-a:text-accent prose-a:no-underline hover:prose-a:underline font-serif text-slate-800 leading-[1.8] tracking-[0.01em]"
                                dangerouslySetInnerHTML={{ __html: displayMedia.content }}
                            />
                        ) : (
                            <div className="prose prose-lg prose-slate font-serif text-slate-800 leading-[1.8] tracking-[0.01em]">
                                <p>{displayMedia.description}</p>
                                {displayMedia.externalLink && (
                                    <Button className="mt-8 bg-accent text-primary uppercase font-bold tracking-widest" onClick={() => window.open(displayMedia.externalLink, "_blank")}>
                                        Read Full Transcript / Article
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </article>

            {/* IN THE HEADLINES */}
            <section className="bg-slate-50 py-24 border-t border-slate-200">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2 mb-10">
                        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">In The Headlines</h2>
                        <Link href="/community" className="text-sm text-accent font-bold uppercase tracking-wider flex items-center hover:underline">
                            View All Media <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {relatedMedia.length > 0 ? relatedMedia.map((rel: any) => (
                            <Link href={`/community/${rel.slug}`} key={rel._id} className="group flex flex-col">
                                <div className="aspect-[16/10] overflow-hidden mb-4 bg-slate-200">
                                    <img 
                                        src={rel.coverImageUrl || rel.coverImage || rel.thumbnailUrl || "/images/thought-thumb.png"} 
                                        alt={rel.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>
                                <Badge variant="secondary" className="w-fit text-[10px] uppercase font-bold bg-accent/10 text-accent mb-3 rounded-none">
                                    {rel.outlet}
                                </Badge>
                                <h3 className="text-xl font-medium font-cormorant text-slate-900 group-hover:text-accent transition-colors leading-tight mb-2">
                                    {rel.title}
                                </h3>
                                <p className="text-xs text-slate-500 font-sans uppercase tracking-widest mt-auto">
                                    {rel.date || new Date().getFullYear()} • Coverage
                                </p>
                            </Link>
                        )) : (
                            <p className="text-slate-500">More press coverage and interviews will be published soon.</p>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
