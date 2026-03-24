import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedDatabase = mutation({
  handler: async (ctx) => {
    // 1. Seed Hero Settings
    await ctx.db.insert("siteSettings", {
      key: "hero",
      value: {
        title: "Advancing Tanzania’s <br /> <span class=\"text-accent italic\">Vision</span> On The <br /> Global Stage.",
        name: "H.E. Togolani Edriss Mavura",
        description: "Official platform of the Permanent Representative of the United Republic of Tanzania to the United Nations. Dedicated to economic diplomacy, sustainable development, and amplifying Africa's voice.",
        primaryCta: { label: "Explore UN Initiatives", href: "/un-initiatives" },
        secondaryCta: { label: "Read Latest Remarks", href: "/media" },
        mandate: "United Republic of Tanzania",
        posting: "United Nations, NY"
      }
    });

    // 2. Seed Initial Quote
    await ctx.db.insert("quotes", {
      text: "Leadership is not a title to be held, but a service to be rendered. Diplomacy is the language of that service on the global stage.",
      author: "Togolani Mavura",
      source: "Ambassadorial Reflection",
      isFeatured: true,
      publishedAt: Date.now(),
    });

    // 3. Seed Milestones
    const milestones = [
      {
        year: "2026—Present",
        role: "Permanent Representative to the United Nations",
        organization: "United Republic of Tanzania | New York",
        description: "Leading Tanzania's multilateral engagements at the UN Headquarters. Focusing on global peace, sustainable development, and amplifying Africa's strategic voice.",
        highlights: ["Multilateral Governance", "Global Peace & Security"],
        order: 0
      },
      {
        year: "2021—2026",
        role: "Ambassador to the Republic of Korea",
        organization: "United Republic of Tanzania | Seoul",
        description: "Diplomatic mission centered on the Blue Economy, Energy Transition, and deepening technical cooperation with the Indo-Pacific.",
        highlights: ["Blue Economy Champion", "Industrial Cooperation"],
        order: 1
      }
    ];

    for (const m of milestones) {
      await ctx.db.insert("milestones", m);
    }

    // 4. Seed Initial Book
    await ctx.db.insert("books", {
      title: "The Architecture of Karama",
      slug: "architecture-of-karama",
      description: "A profound inquiry into the convergent forces that shape modern leadership, through the lens of African diplomacy.",
      content: "In 'The Architecture of Karama,' Ambassador Togolani Mavura explores the Swahili concept of Karama—the divine gift or talent—and how it interacts with personal effort and the currents of destiny...",
      thumbnailUrl: "/images/book-thumb.png",
      purchaseLinks: [
        { label: "Order Hardcover", url: "#" },
        { label: "International Orders", url: "#" }
      ],
      publishedAt: Date.now(),
      isFeatured: true
    });

    return "Database seeded successfully";
  }
});
