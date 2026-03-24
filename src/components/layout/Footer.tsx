"use client";

import Link from "next/link";
import { Twitter, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#050B14] border-t border-white/5 pt-24 pb-12 relative overflow-hidden text-white/90">
            {/* Backdrop Decorative Text */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.02] whitespace-nowrap">
                <span className="text-[250px] font-sans font-bold uppercase tracking-tight">TOGOLANI</span>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
                    {/* Brand & Vision */}
                    <div className="max-w-md space-y-8">
                        <Link href="/" className="block">
                           <span className="text-3xl font-sans tracking-tight font-bold uppercase text-white">
                                TOGOLANI MAVURA
                           </span>
                        </Link>
                        <p className="text-xl font-cormorant italic text-white/50 leading-relaxed">
                            "The architecture of our future is built on the integrity of our thought and the courage of our actions."
                        </p>
                        <div className="flex gap-4 pt-4">
                            {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center text-white/40 hover:bg-accent hover:text-white hover:border-accent transition-all duration-500">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24 text-left">
                        <div>
                            <h3 className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] mb-8">Platform</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: "Global Home", href: "/" },
                                    { name: "Intellectual Archive", href: "/ideas" },
                                    { name: "The Book", href: "/book" },
                                    { name: "UN Initiatives", href: "/un-initiatives" }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-[11px] text-white/40 hover:text-accent transition-colors flex items-center group uppercase font-sans font-bold tracking-wider">
                                            {item.name}
                                            <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] mb-8">Mandate</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: "Togolani", href: "/togolani" },
                                    { name: "Media & Press", href: "/media" },
                                    { name: "Contact Bureau", href: "/contact" },
                                    { name: "Public Speaking", href: "/speaking" }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-[11px] text-white/40 hover:text-accent transition-colors flex items-center group uppercase font-sans font-bold tracking-wider">
                                            {item.name}
                                            <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col gap-1">
                        <p className="text-white/30 text-[9px] uppercase font-sans font-bold tracking-widest leading-none">
                            Official Platform of Ambassador Togolani Mavura
                        </p>
                        <p className="text-white/20 text-[9px] uppercase font-sans font-bold tracking-widest">
                            © {new Date().getFullYear()}. United Republic of Tanzania.
                        </p>
                    </div>
                    <div className="flex items-center gap-8 text-[9px] uppercase font-sans font-bold tracking-widest text-white/30">
                        <Link href="/privacy" className="hover:text-accent">Privacy Protocol</Link>
                        <Link href="/terms" className="hover:text-accent">Diplomatic Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

