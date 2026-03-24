import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pay-R Insights | HR & Payroll Blog",
    description: "Expert advice on payroll, compliance, and building better workplaces. Stay updated with the latest HR trends and Pay-R product news.",
    openGraph: {
        title: "Pay-R Blog | Insights for Modern HR Leaders",
        description: "Read the latest articles on payroll compliance, remote work, and company culture.",
        images: ["/images/social-share.png"]
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
