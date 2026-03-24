"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Facebook, Twitter, Linkedin, Mail, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Head from "next/head";

export default function IdeaDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const idea = useQuery(api.ideas.getBySlug, { slug });
    const allIdeas = useQuery(api.ideas.getPosts) || [];

    // Loading state
    if (idea === undefined) {
        return (
            <main className="min-h-screen bg-white font-sans">
                <Header />
                <div className="pt-40 pb-20 text-center">
                    <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto" />
                    <p className="text-muted-foreground mt-4">Loading reflection...</p>
                </div>
                <Footer />
            </main>
        );
    }

    // Not found state
    if (idea === null) {
        return (
            <main className="min-h-screen bg-white font-sans">
                <Header />
                <div className="pt-40 pb-20 text-center max-w-lg mx-auto">
                    <h1 className="text-4xl font-cormorant font-medium text-slate-900 mb-4">Reflection Not Found</h1>
                    <p className="text-muted-foreground mb-8">This entry may have been archived or moved.</p>
                    <Link href="/ideas" className="text-accent font-bold text-sm">← Back to All Reflections</Link>
                </div>
                <Footer />
            </main>
        );
    }

    const displayIdea = idea;

    // Get 3 related ideas for the "IN THE HEADLINES" section
    const relatedIdeas = allIdeas.filter((i: any) => i._id !== displayIdea._id).slice(0, 3);

    return (
        <main className="min-h-screen bg-white selection:bg-accent selection:text-white font-sans">
            <Head>
                <title>{displayIdea.title} | Togolani Mavura</title>
                <meta name="description" content={(displayIdea as any).seoDescription || (displayIdea as any).excerpt || `Read this essay by Ambassador Togolani Mavura on ${displayIdea.category || 'Leadership'}.`} />
                <meta name="author" content="Togolani Mavura" />
                <meta property="og:title" content={displayIdea.title} />
                <meta property="og:description" content={(displayIdea as any).excerpt || "Read this insight by Ambassador Togolani Mavura."} />
                <meta property="og:image" content={displayIdea.coverImage || "/images/thought-thumb.png"} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Header />

            <article className="pt-32 pb-20">
                {/* HEADLINE SECTION */}
                <header className="max-w-[1000px] mx-auto px-6 mb-10">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-cormorant leading-tight text-slate-900 tracking-tight">
                            {displayIdea.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-slate-500 font-medium uppercase tracking-wider">
                            <span className="text-accent">{displayIdea.category || "Statecraft"}</span>
                            <span>•</span>
                            <time dateTime={new Date(displayIdea.publishedAt || Date.now()).toISOString()}>
                                {new Date(displayIdea.publishedAt || Date.now()).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </time>
                            <span>•</span>
                            <span>5 min read</span>
                        </div>
                    </div>
                </header>

                {/* FEATURED IMAGE */}
                <figure className="max-w-[1200px] mx-auto px-6 mb-16">
                    <div className="aspect-[21/9] w-full bg-slate-100 overflow-hidden">
                        <img 
                            src={(displayIdea as any).coverImageUrl || displayIdea.coverImage || "/images/thought-thumb.png"} 
                            alt={displayIdea.title} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    {displayIdea.coverImage && (
                        <figcaption className="mt-4 text-xs text-slate-500 border-l-2 border-accent pl-3 max-w-3xl">
                            Visual documentation accompanying the intellectual reflection on {displayIdea.category}.
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
                            <button className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors">
                                <Share2 className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors">
                                <Mail className="w-4 h-4" />
                            </button>
                        </div>
                    </aside>

                    {/* MAIN CONTENT */}
                    <div className="flex-grow max-w-[700px]">
                        {/* AUTHOR BLOCK */}
                        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-100">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200">
                                <img src="/images/tm-hero-nobg.png" alt="Togolani Mavura" className="w-full h-full object-cover object-top" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'; }} />
                            </div>
                            <div>
                                <div className="text-sm text-slate-500 mb-1">By <span className="text-slate-900 font-bold underline decoration-accent underline-offset-4">Togolani Mavura</span></div>
                                <div className="text-sm font-semibold text-slate-700">Ambassador Extra Ordinary and Plenipotentiary</div>
                                <div className="text-xs text-slate-500">United Republic of Tanzania</div>
                            </div>
                        </div>

                        {/* ARTICLE TEXT */}
                        <div 
                            className="prose prose-lg prose-slate prose-headings:font-cormorant prose-a:text-accent prose-a:no-underline hover:prose-a:underline font-serif text-slate-800 leading-[1.8] tracking-[0.01em]"
                            dangerouslySetInnerHTML={{ __html: displayIdea.content || "" }}
                        />
                    </div>
                </div>
            </article>

            {/* IN THE HEADLINES */}
            <section className="bg-slate-50 py-24 border-t border-slate-200">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2 mb-10">
                        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">In The Headlines</h2>
                        <Link href="/ideas" className="text-sm text-accent font-bold uppercase tracking-wider flex items-center hover:underline">
                            View All <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {relatedIdeas.length > 0 ? relatedIdeas.map((rel: any) => (
                            <Link href={`/ideas/${rel.slug}`} key={rel._id} className="group flex flex-col">
                                <div className="aspect-[16/10] overflow-hidden mb-4 bg-slate-200">
                                    <img 
                                        src={rel.coverImageUrl || rel.coverImage || "/images/thought-thumb.png"} 
                                        alt={rel.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>
                                <Badge variant="secondary" className="w-fit text-[10px] uppercase font-bold bg-accent/10 text-accent mb-3 rounded-none">
                                    {rel.category}
                                </Badge>
                                <h3 className="text-xl font-medium font-cormorant text-slate-900 group-hover:text-accent transition-colors leading-tight mb-2">
                                    {rel.title}
                                </h3>
                                <p className="text-xs text-slate-500 font-sans uppercase tracking-widest mt-auto">
                                    {new Date(rel.publishedAt || Date.now()).toLocaleDateString()} • 3 min read
                                </p>
                            </Link>
                        )) : (
                            <p className="text-slate-500">More insights and reflections will be published soon.</p>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
