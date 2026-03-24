"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Thoughts", href: "/ideas" },
        { name: "Book", href: "/book" },
        { name: "Media & Influence", href: "/community" },
        { name: "Enquire", href: "/contact" },
        { name: "Togolani", href: "/togolani" },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
            <header
                className={cn(
                    "w-full transition-all duration-300 border-b",
                    isScrolled
                        ? "bg-background/98 border-border py-4 shadow-sm"
                        : "bg-background border-transparent py-6"
                )}

            >
                <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <span className="text-xl font-sans tracking-tight font-bold text-slate-950">
                            TOGOLANI MAVURA
                        </span>
                    </Link>


                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-[13px] font-semibold text-foreground/80 hover:text-accent transition-colors tracking-normal"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-background border-b shadow-xl p-8 flex flex-col space-y-6 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300 h-[calc(100vh-80px)] overflow-y-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-lg font-bold hover:text-accent transition-colors uppercase tracking-normal text-[13px] flex items-center justify-between"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </header>
        </div>
    );
}
