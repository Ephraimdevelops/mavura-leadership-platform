"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { AchievementsTimeline } from "@/components/home/AchievementsTimeline";
import { FeaturedIdeas } from "@/components/home/FeaturedIdeas";
import { ThoughtLeadership } from "@/components/home/ThoughtLeadership";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
import NextImage from "next/image";
import { Headphones, Mic2, Instagram, Twitter, MessageCircle, Quote } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FeaturedQuote } from "@/components/home/FeaturedQuote";

function SectionSeparator() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-2">
      <div className="h-px bg-border/40 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-none bg-accent rotate-45" />
      </div>
    </div>
  );
}

export default function Home() {
  const featuredIdeas = useQuery(api.ideas.getFeatured, {});
  const featuredMedia = useQuery(api.media.getFeatured, {});
  const featuredBooks = useQuery(api.books.getFeatured);
  const featuredQuote = useQuery(api.quotes.getFeatured);
  const milestones = useQuery(api.milestones.getAll);
  const heroSettings = useQuery(api.siteSettings.getByKey, { key: "hero" });

  return (
    <main className="min-h-screen bg-background selection:bg-accent selection:text-primary">
      <Header />
      
      {/* 1. Hero Section */}
      <Hero settings={heroSettings} />
      
      {featuredQuote === undefined || milestones === undefined || featuredMedia === undefined || featuredIdeas === undefined || featuredBooks === undefined ? (
        <>
            <SectionSeparator />
            <div className="py-32 flex justify-center">
               <div className="flex flex-col items-center space-y-6">
                   <div className="w-8 h-8 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
                   <p className="text-muted-foreground animate-pulse text-[10px] uppercase font-bold tracking-[0.2em]">Synchronizing Archives...</p>
               </div>
            </div>
        </>
      ) : (
        <>
          {featuredQuote && (
            <>
                <SectionSeparator />
                <FeaturedQuote data={featuredQuote} />
            </>
          )}
          
          {milestones && milestones.length > 0 && (
            <>
                <SectionSeparator />
                <AchievementsTimeline data={milestones} />
            </>
          )}
          
          {featuredMedia && featuredMedia.length > 0 && (
            <>
              <SectionSeparator />
              <ThoughtLeadership data={featuredMedia} />
            </>
          )}
          
          {featuredIdeas && featuredIdeas.length > 0 && (
            <>
              <SectionSeparator />
              <FeaturedIdeas data={featuredIdeas} />
            </>
          )}
          
          {featuredBooks && featuredBooks.length > 0 && (
            <>
              <SectionSeparator />
              <section className="py-20 bg-secondary/5 overflow-hidden border-t border-border/10">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative aspect-[3/4] max-w-sm mx-auto shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-border/10">
                            <img 
                                src={featuredBooks[0].coverImageUrl || featuredBooks[0].thumbnailUrl || "/images/book-thumb.png"} 
                                alt={featuredBooks[0].title} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block">Featured Publication</span>
                                <h2 className="text-5xl md:text-6xl font-medium text-slate-950 font-cormorant leading-tight tracking-tight uppercase">
                                    {featuredBooks[0].title}
                                </h2>
                                <p className="text-lg text-muted-foreground font-sans leading-relaxed max-w-xl text-visible">
                                    {featuredBooks[0].description}
                                </p>
                            </div>
                            <div className="flex gap-8">
                                <Link href={`/book/${featuredBooks[0].slug}`}>
                                    <Button variant="premium">
                                        Learn More
                                    </Button>
                                </Link>
                                {featuredBooks[0].purchaseLinks?.[0] && (
                                    <Link href={featuredBooks[0].purchaseLinks[0].url}>
                                        <Button variant="outline">
                                            {featuredBooks[0].purchaseLinks[0].label}
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
              </section>
            </>
          )}
        </>
      )}

      <SectionSeparator />

      {/* 6. Newsletter Section */}
      <NewsletterBanner />

      <SectionSeparator />

      {/* 7. Sikiliza Togolani Section (Cinematic White Theme) */}
      <section className="py-32 bg-background relative overflow-hidden flex items-center justify-center border-t border-border/10">
          {/* Background Image with White Cinematic Gradient */}
          <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
                alt="Cinematic Background" 
                className="w-full h-full object-cover opacity-10 grayscale" 
              />
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background to-transparent" />
          </div>
          
          <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block mb-6">Daily Diplomatic Insights</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-slate-950 font-cormorant leading-tight mb-8">
                  Sikiliza <span className="text-accent italic">Togolani</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-sans leading-relaxed mb-12">
                  Join a massive community of followers. A daily curation of Ambassador Mavura's profound quotes, statecraft reflections, and diplomatic wisdom across all major platforms.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="premium" className="h-14 px-8 rounded-none">
                      Instagram <Instagram className="ml-3 w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="h-14 px-8 border-slate-950/20 text-slate-950 rounded-none hover:bg-slate-950 hover:text-white transition-colors">
                      X (Twitter) <Twitter className="ml-3 w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="h-14 px-8 border-slate-950/20 text-slate-950 rounded-none hover:bg-slate-950 hover:text-white transition-colors">
                      Threads <MessageCircle className="ml-3 w-4 h-4" />
                  </Button>
              </div>
          </div>
      </section>
      
      <Footer />
    </main>
  );
}
