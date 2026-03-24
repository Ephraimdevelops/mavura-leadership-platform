"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, ExternalLink, ShoppingCart, Info } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Head from "next/head";


export default function BookDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const bookQuery = useQuery(api.books.getBySlug, { slug });

    const displayBook = bookQuery || {
        _id: "preview",
        title: "The Architecture of Karama",
        description: "A comprehensive thesis on the nature of African diplomacy and economic statecraft.",
        content: `
            <p><strong>Prologue</strong></p>
            <p>At the center of any great endeavor lies 'Karama' - the inherent dignity, calling, and unique capability endowed upon an individual. In this seminal work, Ambassador Togolani Mavura explores how understanding and aligning with one's Karama forms the bedrock of not just personal success, but geopolitical stability and national advancement.</p>
            <p>From the bustling halls of the United Nations to the strategic negotiations in Dar es Salaam, <em>The Architecture of Karama</em> unpacks the invisible frameworks that drive decision-making. It is a clarion call for a new generation of leaders to engineer their paths with intention, integrity, and an unwavering commitment to public service.</p>
            <p>Through deeply moving anecdotes and sharp international relations analysis, this manuscript aims to redefine how the Global South projects soft power, builds resilience, and architects a future that honors its rich heritage.</p>
        `,
        coverImage: "/images/book.png",
        publishedAt: 1710921600000,
        purchaseLinks: [
            { label: "Amazon (Hardcover)", url: "#" },
            { label: "Barnes & Noble", url: "#" }
        ]
    };

    return (
        <main className="min-h-screen bg-secondary/5 font-sans flex flex-col pt-32">
            <Head>
                <title>{displayBook.title} | Togolani Mavura</title>
                <meta name="description" content={displayBook.description || `A publication by Ambassador Togolani Mavura`} />
                <meta name="author" content="Togolani Mavura" />
                <meta property="og:title" content={displayBook.title} />
                <meta property="og:description" content={displayBook.description || ""} />
                <meta property="og:image" content={displayBook.coverImage || "/images/book.png"} />
                <meta property="og:type" content="book" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Header />

            <article className="flex-grow max-w-[1200px] mx-auto w-full px-6 py-12 md:py-24">
                <Link 
                    href="/book" 
                    className="inline-flex items-center gap-2 text-accent uppercase font-bold text-[10px] tracking-widest hover:gap-4 transition-all mb-12"
                >
                    <ArrowLeft className="w-3 h-3" /> Back to Books
                </Link>

                <div className="grid md:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
                    {/* LEFT COLUMN: BOOK COVER & CTA */}
                    <div className="space-y-8 sticky top-32">
                        <div className="aspect-[3/4] w-full max-w-sm mx-auto shadow-2xl bg-white p-2">
                            <img 
                                src={displayBook.coverImage || "/images/book.png"} 
                                alt={displayBook.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="bg-white p-8 space-y-6 border border-border/50 text-center">
                            <h3 className="font-montserrat text-lg font-bold">Acquire a Copy</h3>
                            
                            {displayBook.purchaseLinks && displayBook.purchaseLinks.length > 0 ? (
                                <div className="space-y-3">
                                    {displayBook.purchaseLinks.map((link: any, i: number) => (
                                        <Button key={i} className="w-full bg-slate-900 text-white font-bold uppercase tracking-widest text-xs h-12" onClick={() => window.open(link.url, "_blank")}>
                                            <ShoppingCart className="w-4 h-4 mr-2" /> {link.label}
                                        </Button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 font-sans italic">Currently available exclusively at official speaking engagements.</p>
                            )}

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
                                <Info className="w-4 h-4" /> Worldwide Shipping
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: BOOK DETAILS */}
                    <div className="space-y-12">
                        <header className="space-y-6 border-b border-border/10 pb-12">
                            <h1 className="text-5xl lg:text-7xl font-cormorant font-medium text-slate-900 leading-tight">
                                {displayBook.title}
                            </h1>
                            <div className="text-xl text-slate-600 font-serif leading-relaxed">
                                {displayBook.description}
                            </div>
                            
                            <div className="flex items-center gap-6 pt-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                                <span>Author: Togolani Mavura</span>
                                <span>•</span>
                                <span>Published: {new Date(displayBook.publishedAt || Date.now()).getFullYear()}</span>
                            </div>
                        </header>

                        <div>
                            <h2 className="text-2xl font-montserrat font-bold text-slate-900 mb-8 uppercase tracking-wide">About The Book</h2>
                            <div 
                                className="prose prose-xl prose-slate font-serif text-slate-800 leading-[1.9] tracking-[0.01em]"
                                dangerouslySetInnerHTML={{ __html: displayBook.content || "" }}
                            />
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
