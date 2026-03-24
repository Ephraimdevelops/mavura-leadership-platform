"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, FileText, Bookmark, Mail, BookOpen, Award, FolderArchive, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navigation = [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Ideas & Policy', href: '/admin/ideas', icon: FileText },
        { name: 'Media & Influence', href: '/admin/media', icon: Bookmark },
        { name: 'The Library', href: '/admin/books', icon: BookOpen },
        { name: 'Milestones', href: '/admin/milestones', icon: Award },
        { name: 'The Letter', href: '/admin/newsletter', icon: Mail },
        { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
        { name: 'Press Kit', href: '/admin/media-kit', icon: FolderArchive },
    ];


    return (
        <div className="flex h-screen bg-[#F8F9FA] text-foreground transition-colors duration-300 overflow-hidden font-sans">
            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-border bg-white flex flex-col justify-between hidden md:flex flex-shrink-0">
                <div>
                    <div className="h-20 flex items-center px-6 border-b border-border">
                        <Link href="/admin" className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg font-cormorant">
                                TM
                            </div>
                            <span className="text-xl font-medium tracking-tight font-cormorant text-slate-900">
                                Ambassador's Desk
                            </span>
                        </Link>
                    </div>

                    <nav className="p-4 space-y-1">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 mb-4 mt-4">Content Authority</div>
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link key={item.name} href={item.href}>
                                    <span className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-accent/10 text-accent' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-slate-400'}`} />
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-border bg-slate-50">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                            <img src="/images/portraits/ambassador-profile.jpg" alt="Admin User" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 leading-tight">Admin Console</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Bureau Access</span>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 text-xs font-bold uppercase tracking-widest h-10">
                        <LogOut className="w-4 h-4 mr-3" />
                        Secure Sign Out
                    </Button>
                </div>
            </aside>

            {/* Mobile Header (Fallback) */}
            <div className="md:hidden flex flex-col w-full h-full">
                <header className="border-b border-border bg-white sticky top-0 z-50">
                    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                        <Link href="/admin" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg font-cormorant">
                                TM
                            </div>
                            <span className="text-xl font-bold tracking-tight font-cormorant">
                                Ambassador's Desk
                            </span>
                        </Link>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto w-full p-4">
                    {children}
                </main>
            </div>

            {/* Main Content (Desktop) */}
            <main className="flex-1 overflow-y-auto w-full hidden md:block">
                <div className="max-w-6xl mx-auto p-8 lg:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
