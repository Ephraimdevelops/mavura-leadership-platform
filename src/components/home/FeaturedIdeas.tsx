"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedIdeas({ data }: { data: any[] }) {
  if (!data) return null;

  return (
    <section className="py-20 bg-background relative border-t border-border/10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block">Intellectual Discourse</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-primary font-cormorant leading-[1.1] tracking-tight">
              Reflections & <span className="text-accent italic">Thoughts</span>
            </h2>
          </div>
          <Link href="/ideas">
            <Button variant="link" className="font-cormorant text-2xl md:text-3xl text-accent font-bold gap-3 p-0 h-auto hover:text-primary transition-colors pb-1 border-b border-accent/20 hover:border-primary rounded-none tracking-normal">
              View All Reflections <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {data.length > 0 ? (
            data.map((essay: any, i: number) => (
              <motion.div
                key={essay._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link href={`/ideas/${essay.slug}`} className="block group bg-white border border-border/10 hover:border-accent/30 transition-all duration-500 shadow-sm hover:shadow-xl">
                  <div className="aspect-[16/10] bg-secondary/5 overflow-hidden relative border-b border-border/10">
                    {(essay.coverImageUrl || essay.thumbnailUrl || essay.mainImage) ? (
                      <img 
                        src={essay.coverImageUrl || essay.thumbnailUrl || essay.mainImage} 
                        alt={essay.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-20">
                        <BookOpen className="w-12 h-12 text-accent" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm px-3 py-1 text-white shadow-lg z-10">
                      <span className="text-[9px] font-bold uppercase tracking-widest">{essay.category || "Intellectual"}</span>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-4">
                    <h3 className="text-xl md:text-2xl font-medium font-cormorant leading-tight group-hover:text-accent transition-colors min-h-[3.5rem] line-clamp-2">
                      {essay.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-sans line-clamp-2 leading-relaxed h-[2.5rem]">
                      {essay.excerpt}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-widest group-hover:text-primary transition-colors">
                        Read Reflection <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 py-20 text-center border border-dashed border-border/50">
              <p className="text-muted-foreground font-sans italic text-sm">Archival entries are being digitized. Please check back shortly.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
