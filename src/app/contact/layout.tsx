import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Pay-R Support & Sales",
    description: "Get in touch with the Pay-R team. Book a demo, request support, or visit our offices. We are here to help you transform your HR.",
    openGraph: {
        title: "Contact Pay-R | Let's Talk HR",
        description: "Ready to streamline your payroll? Our team is ready to help you get started.",
        images: ["/images/social-share.png"]
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
