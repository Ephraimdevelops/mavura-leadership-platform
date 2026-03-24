import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";

import { ThemeProvider } from "@/components/theme-provider";
import { NewsletterPopup } from "@/components/home/NewsletterPopup";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL('https://togolanimavura.com'),
  title: {
    default: "Togolani Mavura | Diplomacy, Leadership & Ideas",
    template: "%s | Togolani Mavura",
  },
  description: "Official platform of H.E. Togolani Edriss Mavura — Permanent Representative of the United Republic of Tanzania to the United Nations. Reflections on leadership, diplomacy, economic statecraft, and amplifying Africa's voice on the global stage.",
  keywords: ["Togolani Mavura", "Tanzania Ambassador", "United Nations", "Diplomacy", "Leadership", "Economic Diplomacy", "Africa", "Statecraft", "Global South", "Tanzania UN Representative"],
  authors: [{ name: "H.E. Togolani Edriss Mavura" }],
  creator: "Togolani Mavura",
  publisher: "Office of the Permanent Representative of Tanzania to the UN",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "H.E. Togolani Mavura | Official Platform",
    description: "Permanent Representative of Tanzania to the United Nations. Reflections on leadership, diplomacy, and Africa's future.",
    url: "https://togolanimavura.com",
    siteName: "Togolani Mavura",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/images/social-share.png",
      width: 1200,
      height: 630,
      alt: "H.E. Togolani Edriss Mavura — Official Platform",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "H.E. Togolani Mavura | Official Platform",
    description: "Permanent Representative of Tanzania to the United Nations. Reflections on leadership, diplomacy, and Africa's future.",
    images: ["/images/social-share.png"],
  },
  alternates: {
    canonical: "https://togolanimavura.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Togolani Edriss Mavura",
              "honorificPrefix": "H.E.",
              "jobTitle": "Permanent Representative of the United Republic of Tanzania to the United Nations",
              "worksFor": {
                "@type": "Organization",
                "name": "United Nations"
              },
              "nationality": "Tanzanian",
              "url": "https://togolanimavura.com",
              "sameAs": [
                "https://www.instagram.com/sikilizatogolani",
                "https://twitter.com/sikilizatogolani",
                "https://www.threads.net/@sikilizatogolani"
              ],
              "image": "https://togolanimavura.com/images/social-share.png",
              "description": "Career diplomat, strategic advisor, and Permanent Representative of Tanzania to the UN."
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} ${montserrat.variable} ${jetbrains.variable} antialiased font-sans`}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            <NewsletterPopup />
            <Toaster position="top-center" richColors />
            {children}
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
